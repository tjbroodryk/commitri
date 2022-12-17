import { SetTransform } from './set';
import * as YAML from 'yaml';

describe(SetTransform.name, () => {
  describe('given valid yaml', () => {
    describe('given new value', () => {
      it('should set value', () => {
        const yaml = YAML.stringify({ })
        const result = YAML.parse(new SetTransform({ path: "foo:bar", value: "baz" }).transform(yaml))

        expect(result).toEqual({
          foo: {
            bar: 'baz'
          }
        })
      })
    })
    describe('given existing value', () => {
      it('should update value', () => {
        const yaml = YAML.stringify({ foo: { bar: 'other' }})
        const result = YAML.parse(new SetTransform({ path: "foo:bar", value: "baz" }).transform(yaml))

        expect(result).toEqual({
          foo: {
            bar: 'baz'
          }
        })
      })
    })
  })
  describe('given invalid yaml', () => {
    it('should leave value untouched', () => {
      const result = YAML.parse(new SetTransform({ path: "foo:bar", value: "baz" }).transform('bla'))

      expect(result).toBe("bla")
    })
  })
})