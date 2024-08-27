import express, { Request, Response } from 'express'
import 'reflect-metadata'
import { validateUpload } from './middlewares/validationMiddlewares'
import { ApiDB } from './data-base'
import Reading from './entity/Reading'
import { Between } from 'typeorm'

const api = express()
const port = 3000

api.use(express.json())

ApiDB.initialize()
  .then(() => {
    console.log('Banco de dados iniciado.')
  })
  .catch(e => console.log('Erro ao iniciar o DB'))

api.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

api.post('/upload', validateUpload, async (req, res) => {
  const { image, customer_code, measure_type, measure_datetime } = req.body

  const existingReading = await ApiDB.getRepository(Reading).findOne({
    where: {
      image,
      customer_code,
      measure_type,
      measure_datetime: Between(
        new Date(new Date(measure_datetime).getFullYear(), new Date(measure_datetime).getMonth(), 1),
        new Date(new Date(measure_datetime).getFullYear(), new Date(measure_datetime).getMonth() + 1, 0)
      )
    }
  })

  if (existingReading) {
    return res.status(409).json({
      error_code: 'DOUBLE_REPORT',
      error_description: 'Leitura do mês já realizada'
    })
  } else {
    const repository = ApiDB.getRepository(Reading)

    const reading = new Reading()
    reading.image = image
    reading.customer_code = customer_code
    reading.measure_type = measure_type
    reading.measure_datetime = new Date(measure_datetime)

    repository.save(reading)
  }
  res.send("Dados válidos. Continuando...")
})

api.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
