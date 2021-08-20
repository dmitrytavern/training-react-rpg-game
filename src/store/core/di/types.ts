export type Class<T> = new (...args: Class<T>[]) => T
