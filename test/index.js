import should from 'should'
import MoneyButtonConfigBuilder from '..'

describe('MoneyButtonConfigBuilder', () => {
  let builder
  beforeEach(() => {
    builder = new MoneyButtonConfigBuilder()
  })

  describe('#addValue', () => {
    describe('when you a defined property is added', () => {
      beforeEach(() => {
        builder.addValue('KEY', 'value')
      })

      it('taht property its defined with tat value', () => {
        const config = builder.build()
        should.equal(config.get('KEY'), 'value')
      })

      it('raises an error for another property', () => {
        const config = builder.build()
        try {
          config.get('UNKNOWN_KEY')
          should.fail('The property is not present, it should fail')
        } catch (err) {
          should.equal(err.message, 'Unknown configuration: UNKNOWN_KEY')
        }
      })
    })

    it('when an undefined value is added', () => {
      try {
        builder.addValue('KEY', undefined)
        should.fail('Should raise when an undefined property is try to be created')
      } catch (err) {
        should.equal(err.message, 'Failed to add "KEY" property. The value cannot be undefined')
        const config = builder.build()
        should.throws(() => config.get('KEY'))
      }
    })

    describe('when multiple properties were added', () => {
      beforeEach(() => {
        builder
          .addValue('ONE', '1')
          .addValue('TWO', '2')
          .addValue('THREE', '3')
      })

      it('defines all those properties', () => {
        const config = builder.build()
        should.equal(config.get('ONE'), '1')
        should.equal(config.get('TWO'), '2')
        should.equal(config.get('THREE'), '3')
      })

      it('and one of the values is redefined it raises an error and the state is not modified', () => {
        try {
          builder.addValue('ONE', 'new_value')
          should.fail('Should fail: ONE is already defined')
        } catch (err) {
          should.equal(err.message, '"ONE" already has a value defined.')
          const config = builder.build()
          should.equal(config.get('ONE'), '1')
        }
      })

      it('and an undefined value is added, the old states keeps the same', () => {
        should.throws(() => builder.addValue('FOUR', undefined))
        const config = builder.build()
        should.equal(config.get('ONE'), '1')
        should.equal(config.get('TWO'), '2')
        should.equal(config.get('THREE'), '3')
      })
    })
  })

  describe('#addValueWithDefault', () => {
    it('fails if the default value is undefined', () => {
      try {
        builder.addValueWithDefault('KEY', 'some value', undefined)
        should.fail('Should throw because default value is undefined')
      } catch (err) {
        should.equal(err.message, 'Failed to add "KEY" property. Default value cannot be undefined')
      }
    })

    it('craetes a config ifnoring defualt value when value us not undefined', () => {
      builder.addValueWithDefault('KEY', undefined, 'default value')
      const config = builder.build()
      should.equal(config.get('KEY'), 'default value')
    })

    it('craetes a config using default value when value is undefined', () => {
      builder.addValueWithDefault('KEY', 'regular value', 'default value')
      const config = builder.build()
      should.equal(config.get('KEY'), 'regular value')
    })
  })
})
