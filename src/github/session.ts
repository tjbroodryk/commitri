import { GithubConnector } from "./connector";
import { Tree } from "./types";

export class GithubSessionFactory {
  constructor(private readonly context: {  
    owner: string,
    repo: string, 
  }, private readonly connector: GithubConnector) {

  }
  create({ sourceBranch, outputBranch }: { sourceBranch: string, outputBranch: string}): GithubSession {
    return new GithubSession({
      ...this.context,
      branch: sourceBranch,
      outputBranch
    }, this.connector)
  }
}

export class GithubSession {
  constructor(
    private readonly context: {
      owner: string,
      repo: string,
      branch: string
      outputBranch: string
    },
    private readonly connector: GithubConnector
  ) {

  }

  async getFile(path: string): Promise<{ data: string; sha: string }> {
    const { data, sha } = await this.connector.getFile({
      owner: this.context.owner,
      repo: this.context.repo,
      path,
      branch: `heads/${this.context.branch}`,
    });

    return {
      data, sha
    }
  }

  async createTree(tree: Tree[]): Promise<
  {
    sha: string;
    url: string;
    truncated: boolean;
    tree: {
        path?: string | undefined;
        mode?: string | undefined;
        type?: string | undefined;
        sha?: string | undefined;
        size?: number | undefined;
        url?: string | undefined;
    }[];
}> {
    const currentCommit = await this.getCurrentCommit()
    const data = await this.connector.createTree({
      owner: this.context.owner,
      repo: this.context.repo,
      tree,
      parentTreeSha: currentCommit.treeSha,
    })

    return data
  }

  async createBlob(content: string): Promise<{ url: string; sha: string; }> {
    return await this.connector.createBlob({
      org: this.context.owner,
      repo: this.context.repo,
      content
    })
  }

  async getCurrentCommit() {
    return this.connector.getCurrentCommit({
      org: this.context.owner,
      repo: this.context.repo,
      branch: this.context.branch
    })
  }

  async commit(message: string, _parentCommitSha: string, newTreeSha: string) {
    let parentCommitSha = _parentCommitSha
    const doesBranchExist = await this.connector.doesBranchExist({ org: this.context.owner,
      repo: this.context.repo,
      branch: this.context.outputBranch })
    
    if(!doesBranchExist) {
      const result = await this.connector.createBranch({
        currentCommitSha: parentCommitSha,
        org: this.context.owner,
        repo: this.context.repo,
        branch: this.context.outputBranch
      })
      parentCommitSha = result.sha
    }

    const commit = await this.connector.commit({
      owner: this.context.owner,
      repo: this.context.repo,
      message,
      newTreeSha,
      currentCommitSha: parentCommitSha,
    })

    return await this.connector.updateRef({
      org: this.context.owner,
      repo: this.context.repo,
      branch: this.context.outputBranch,
      commitSha: commit.sha
    })
  }
}