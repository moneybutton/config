export default class Config {
  constructor (values) {
    this.keyDefined = (key) => key in values
    this.getValue = (key) => values[key]
  }

  get (key) {
    if (this.keyDefined(key)) {
      return this.getValue(key)
    } else {
      throw new Error(`Unknown configuration: ${key}`)
    }
  }
}
