import { flow } from "lodash"
import { GithubSessionFactory } from "../github/session"
import { Tree } from "../github/types"
import { Operation } from "./operation.dto"

export class OperationRunner {
  private readonly _operation: Operation
  constructor(private readonly gitubSessionFactory: GithubSessionFactory, operationBuilder: { build: () => Operation }) {
    this._operation = operationBuilder.build()
  }

  async commit(message: string): Promise<any> {
    if(!this._operation.changes.length) {
      return
    }
    
    const { source: sourceBranch, output: outputBranch, changes } = this._operation
    
    const githubSession = this.gitubSessionFactory.create({
      sourceBranch,
      outputBranch
    })

    const tree: Tree[] = []

    for(const change of changes) {
      const { data } = await githubSession.getFile(change.sourcePath)

      const newData: string = flow(change.transforms)(data)

      const blob = await githubSession.createBlob(newData)

      tree.push({
        mode: `100644`,
        type: `blob`,
        sha: blob.sha,
        path: change.outputPath
      })
    }

    const parentCommit = await githubSession.getCurrentCommit()

    const githubTree = await githubSession.createTree(tree)

    const { url } = await githubSession.commit(message, parentCommit.commitSha, githubTree.sha)

    return {
      url
    }
  }
}