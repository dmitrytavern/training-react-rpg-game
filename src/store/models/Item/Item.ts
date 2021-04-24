import { makeAutoObservable } from 'mobx'
import {
  ItemType,
  ItemTypes,
  ItemProps,
  ItemSettingArg,
  ItemSettingValue,
  ItemParameterArg,
  ItemParameterValue,
} from './types'
import { v4 as uuid } from 'uuid'

class Item<T extends ItemTypes> {
  public readonly id: number
  public readonly uuid: string
  public readonly type: T
  public readonly category: ItemType.Categories<T>
  public readonly meta: ItemType.Meta<T>

  private readonly settings: ItemType.Settings<T>
  private readonly parameters: ItemType.Parameters<T>

  constructor(props: ItemProps<T>) {
    this.id = props.id
    this.uuid = uuid()
    this.type = props.type
    this.category = props.category
    this.meta = props.meta
    this.settings = props.settings || {}
    this.parameters = props.parameters || {}

    makeAutoObservable(this)
  }

  public getSetting<U extends ItemSettingArg<T>>(name: U): ItemSettingValue<T, U> {
    if (!this.settings.hasOwnProperty(name)) {
      throw new Error('Item setting not fount: ' + name)
    }

    return this.settings[name]
  }

  public setSetting<U extends ItemSettingArg<T>>(name: U, value: ItemSettingValue<T, U>): void {
    if (!this.settings.hasOwnProperty(name)) {
      throw new Error('Item parameter not fount: ' + name)
    }

    this.settings[name] = value
  }

  public getParameter<U extends ItemParameterArg<T>>(name: U): ItemParameterValue<T, U> {
    if (!this.parameters.hasOwnProperty(name)) {
      throw new Error('Item parameter not fount: ' + name)
    }

    return this.parameters[name]
  }

  public setParameter<U extends ItemParameterArg<T>>(
    name: U,
    value: ItemParameterValue<T, U>
  ): void {
    if (!this.parameters.hasOwnProperty(name)) {
      throw new Error('Item parameter not fount: ' + name)
    }

    this.parameters[name] = value
  }
}

export default Item
