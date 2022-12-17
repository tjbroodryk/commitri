import { RemoveItemTransform } from './remove-item';
import * as YAML from 'yaml';

describe(RemoveItemTransform.name, () => {
  describe('given valid yaml', () => {
    describe('given array does exist', () => {
      it('should remove item from array', () => {
        const yaml = YAML.stringify({foo: { bar: ["test", "2"]}})
        const result = new RemoveItemTransform({ path: "foo:bar", value: "test" }).transform(yaml)

        expect(YAML.parse(result)).toEqual({
          foo: {
            bar: ['2']
          }
        })
      })
    })
    describe('given array does not exist', () => {
      it('should leave value unchanged', () => {
        const yaml = YAML.stringify({foo: { }})
        const result = new RemoveItemTransform({ path: "foo:bar", value: "test" }).transform(yaml)

        expect(YAML.parse(result)).toEqual({
          foo: {
            
          }
        })
      })
    })
  })

  describe('given invalid yaml', () => {
    it('should leave value untouched', () => {
      const result = YAML.parse(new RemoveItemTransform({ path: "foo:bar", value: "fudge" }).transform('bla'))

      expect(result).toBe("bla")
    })
  })
})