import { Items, ItemsTypes } from '../../../../types/Items'

export type ItemTypes = ItemsTypes

export namespace ItemType {
  export type Meta<T extends ItemsTypes> = Items[T]['Meta']
  export type Categories<T extends ItemsTypes> = Items[T]['Categories']
  export type Settings<T extends ItemsTypes> = Items[T]['Settings']
  export type Parameters<T extends ItemsTypes> = Items[T]['Parameters']
}

export interface ItemProps<T extends ItemsTypes> {
  readonly id: number
  readonly type: T
  readonly meta: ItemType.Meta<T>
  readonly category: ItemType.Categories<T>
  readonly parameters: ItemType.Parameters<T>
  readonly settings: ItemType.Settings<T>
}

type ItemKeys<T extends ItemsTypes, U extends 'Settings' | 'Parameters'> = keyof Items[T][U]

export type ItemSettingArg<T extends ItemsTypes> = ItemKeys<T, 'Settings'>
export type ItemSettingValue<
  T extends ItemsTypes,
  U extends ItemKeys<T, 'Settings'>
> = Items[T]['Settings'][U]

export type ItemParameterArg<T extends ItemsTypes> = ItemKeys<T, 'Parameters'>
export type ItemParameterValue<
  T extends ItemsTypes,
  U extends ItemKeys<T, 'Parameters'>
> = Items[T]['Parameters'][U]
