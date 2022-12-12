import { OperationRunner } from "./operation.runner";
import { createMock } from "@golevelup/ts-jest";
import { GithubSessionFactory, GithubSession } from "../github/session";
import { before } from "lodash";
import * as YAML from 'yaml';
import { Change } from "./change.dto";

describe(OperationRunner.name, () => {
  describe("given no changes", () => {
    it("should finish early", async () => {
      const mockGithubFactory = jest.fn();

      await new OperationRunner(
        createMock<GithubSessionFactory>({
          create: mockGithubFactory,
        }),
        { build: jest.fn(() => ({ source: "", output: "", changes: [] })) }
      ).commit("test");

      expect(mockGithubFactory).not.toHaveBeenCalled();
    });
  });

  describe("given changes", () => {
    const getFile = jest.fn(() =>
      Promise.resolve({ data: YAML.stringify({ "foo": { "bar": "baz" }}), sha: "foo" })
    )
    const createBlob = jest.fn((content) => Promise.resolve({ url: "test.url", sha: `blob_sha-${content}` }))
    const getCurrentCommit = jest.fn(() => Promise.resolve({ commitSha: "current_commit_sha", treeSha: "some_tree_sha" }))
    const createTree = jest.fn(() => Promise.resolve({
      sha: "new_tree_sha"
    } as any))
    const commit = jest.fn(() => Promise.resolve({ url: "sme_commit_url" } as any))

    beforeAll(async () => {
      await new OperationRunner(
        createMock<GithubSessionFactory>({
          create: () =>
            createMock<GithubSession>({
              getFile,
              createBlob,
              getCurrentCommit,
              createTree,
              commit
            }),
        }),
        {
          build: () =>({
            source: "main",
            output: "main",
            changes: [
              new Change(
                [
                  (_data) => "foo:bar"
                ], 
                "test.yml", 
                "output.yml"
              ),
              new Change(
                [
                  (_data) => "data:2"
                ], 
                "test.yml", 
                "output2.yml"
              )
            ]
          })
        }
      ).commit("bla");
    });

    it("should create a blob containing all changes", () => {
      expect(createBlob).toHaveBeenCalledWith("foo:bar")
      expect(createBlob).toHaveBeenCalledWith("data:2")

      expect(createTree).toHaveBeenCalledWith([
        {
          mode: '100644',
          type: 'blob',
          sha: 'blob_sha-foo:bar',
          path: "output.yml"
        },
        {
          mode: '100644',
          type: 'blob',
          sha: 'blob_sha-data:2',
          path: "output2.yml"
        },
      ])
    });

    it("should commit result to github", () => {
      expect(commit).toHaveBeenCalledWith("bla", "current_commit_sha", "new_tree_sha")
    });
  });
});
