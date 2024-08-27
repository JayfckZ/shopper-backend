import { DataSource } from 'typeorm'
import Reading from './entity/Reading'

export const ApiDB = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  logging: true,
  entities: [Reading],
})
