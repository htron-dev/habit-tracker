import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class HabitSequence extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.date()
  public date: DateTime

  @column()
  public done: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}