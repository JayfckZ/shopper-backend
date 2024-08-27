import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export default class Reading {
  @PrimaryGeneratedColumn('uuid')
  measure_id!: string

  @Column()
  image!: string

  @Column()
  customer_code!: string

  @Column()
  measure_datetime!: Date

  @Column()
  measure_type!: "WATER" | "GAS"

  @Column('int')
  measure_value!: number
}
