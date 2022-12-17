import { PushTransform } from './push';
import * as YAML from 'yaml';

describe(PushTransform.name, () => {
  describe('given valid yaml', () => {
    it('should add value to array', () => {
      const yaml = YAML.stringify({ foo: { baz: ['firstVal' ]}})
      const result = new PushTransform({ path: "foo:baz", value: "test" }).transform(yaml)

      expect(YAML.parse(result)).toEqual({
        foo: {
          baz: ['firstVal', 'test']
        }
      })
    })
    it('should create array', () => {
      const yaml = YAML.stringify({ foo: { }})
      const result = new PushTransform({ path: "foo:baz", value: "test" }).transform(yaml)

      expect(YAML.parse(result)).toEqual({
        foo: {
          baz: ['test']
        }
      })
    })
  })
  describe('given invalid yaml', () => {
    it('should nnot modify value', () => {
      const result = new PushTransform({ path: "foo:baz", value: "test" }).transform("bar")
      expect(YAML.parse(result)).toBe("bar")
    })
  })
})