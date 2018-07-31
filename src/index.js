import Config from './config'

export default class MoneyButtonConfigBuilder {
  constructor () {
    this.variables = {}
  }

  build () {
    return new Config(this.variables)
  }

  addValue (key, value) {
    if (value === undefined) {
      throw new Error(`Failed to add "${key}" property. The value cannot be undefined`)
    }
    if (key in this.variables) {
      throw new Error(`"${key}" already has a value defined.`)
    }
    this.variables[key] = value
    return this
  }

  addValueWithDefault (key, value, defaultValue) {
    if (defaultValue === undefined) {
      throw new Error(`Failed to add "${key}" property. Default value cannot be undefined`)
    }
    return this.addValue(key, value === undefined ? defaultValue : value)
  }
}
