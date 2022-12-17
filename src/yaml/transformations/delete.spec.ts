import { DeleteValueTransform } from './delete';
import * as YAML from 'yaml';

describe(DeleteValueTransform.name, () => {
  describe('given valid yaml', () => {
    const yaml = YAML.stringify({
      foo: {
        bar:" fudge"
      },
      other: "prop"
    })
    it('should delete value', () => {
      const result = new DeleteValueTransform({ path: "foo:bar" }).transform(yaml)
      expect(YAML.parse(result)).toEqual({
        other: "prop",
        foo: {}
      })
    })
  })

  describe('given invalid yaml', () => {
    it('should not modify value', () => {
      const result = YAML.parse(new DeleteValueTransform({ path: "foo:bar" }).transform('bla'))

      expect(result).toBe("bla")
    })
  })
})