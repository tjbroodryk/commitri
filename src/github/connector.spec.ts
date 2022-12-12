import { GithubConnector, GithubError } from './connector';
import { createMock } from '@golevelup/ts-jest';
import { Octokit, RestEndpointMethodTypes } from '@octokit/rest';

describe(GithubConnector.name, () => {
  describe('the commit method', () => {
    describe('given successful commit', () => {
      const response = createMock<RestEndpointMethodTypes["git"]["createCommit"]["response"]>({
        data: {
          sha: "test_sha",
          tree: { 
            sha: "tree_sha",
            url: "some.url"
          }
        }
      })
      const mock = createMock<Octokit>({
        git: {
          createCommit: jest.fn(() => Promise.resolve(response)) as any
        }
      })
      const connector = new GithubConnector(mock)
      let result: { sha: string, tree: { sha: string, url: string }}

      beforeAll(async () => {
        result = await connector.commit({
          owner: "test",
          repo: "foo",
          message: "bla",
          newTreeSha: "yoo",
          currentCommitSha: "someSha"
        })
      })

      it('should call github api', () => {
        expect(mock.git.createCommit).toHaveBeenCalledWith({
          owner: "test",
          repo: "foo",
          message: "bla",
          tree: "yoo",
          parents: ["someSha"]
        })
      })

      it('should return commit sha and tree', () => {
        expect(result).toEqual({
          sha: "test_sha",
          tree: { 
            sha: "tree_sha",
            url: "some.url"
          }
        })
      })
    })

    describe('given failed request', () => {
      const mock = createMock<Octokit>({
        git: {
          createCommit: jest.fn(() => Promise.reject("some error")) as any
        }
      })
      const connector = new GithubConnector(mock)

      it(`should throw ${GithubError.name}`, async () => {
        await expect(async () => connector.commit({} as any)).rejects.toThrow(GithubError)
      })
    })
  })

  describe('the getFile method', () => {

  })
})