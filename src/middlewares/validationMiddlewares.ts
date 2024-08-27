import { Request, Response, NextFunction } from "express"

export const validateUpload = (req: Request, res: Response, next: NextFunction) => {
  const { image, customer_code, measure_datetime, measure_type } = req.body

  if (typeof image !== 'string' || !image.startsWith('data:image/')) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Formato de imagem inválido.'
    })
  }

  if (typeof customer_code !== 'string') {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Formato de código de cliente inválido.'
    })
  }

  if (isNaN(Date.parse(measure_datetime))) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Formato de data da medida inválido.'
    })
  }

  if (!['WATER', 'GAS'].includes(measure_type)) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'Tipo de medida inválido.'
      })
    }

  next()
}
