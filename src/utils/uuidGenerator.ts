type GeneratorParams = [key: string, value: string | number]

export function uuidGenerator(params: GeneratorParams[]): string {
  let uuid = ''

  for (let i = 0; i < params.length; i++) {
    const [key, value] = params[i]

    if (i !== 0) uuid += '-'

    uuid += `${key}${value}`
  }

  return uuid
}
