import { Octokit } from '@octokit/rest';
import { WrappedError } from '../utils/wrapped-error';
import { Tree } from './types';

export class GithubConnector {
  constructor(private readonly octokit: Octokit) {

  }

  async commit({
    owner,
    repo,
    message,
    newTreeSha,
    currentCommitSha
  }: {
    owner: string, 
    repo: string,
    message: string,
    newTreeSha: string,
    currentCommitSha: string
  }) {
    try {
      const result = await this.octokit.git.createCommit({
        owner,
        repo,
        message,
        tree: newTreeSha,
        parents: [currentCommitSha],
      })

      return {
        sha: result.data.sha,
        tree: result.data.tree
      }
    }
    catch(e) {
      throw new GithubError(`Unable to commit changes`, e)
    }
  }

  async getFile({
    owner,
    repo,
    path,
    branch
  }: { 
    owner: string, 
    repo: string,
    path: string,
    branch: string
  }): Promise<{ data: string; sha: string }> {
    try {
      const { data } = await this.octokit.repos.getContent({
        owner,
        repo,
        path,
        ref: `${branch}`,
      });

      return {
        data: Buffer.from((data as any).content, "base64").toString(),
        sha: (data as any).sha,
      };
    } catch (e) {
      throw new GithubError(`Unable to get file at: ${path}`, e);
    }
  }

  async createTree({
    owner,
    repo,
    parentTreeSha,
    tree
  }: {
    owner: string,
    repo: string,
    parentTreeSha: string,
    tree: Tree[]
  }) {
    try {
      const { data } = await this.octokit.git.createTree({
        owner,
        repo,
        tree,
        base_tree: parentTreeSha,
      })
  
      return data
    }
    catch(e) {
      throw new GithubError('Unable to create new tree', e)
    }
  }

  async createBlob({
    org,
    repo,
    content
  }: {
    org: string,
    repo: string,
    content: string
  }) {
    try {
      const blobData = await this.octokit.git.createBlob({
        owner: org,
        repo,
        content,
        encoding: 'utf-8',
      })
      return blobData.data
    }
    catch(e) {
      throw new GithubError('Unable to create blob', e)
    }
  }

  async getCurrentCommit({
    org,
    repo,
    branch
  }: {
    org: string,
    repo: string,
    branch: string
  }) {
    try {
      const { data: refData } = await this.octokit.git.getRef({
        owner: org,
        repo,
        ref: `heads/${branch}`,
      })
      const commitSha = refData.object.sha
      const { data: commitData } = await this.octokit.git.getCommit({
        owner: org,
        repo,
        commit_sha: commitSha,
      })
      return {
        commitSha,
        treeSha: commitData.tree.sha,
      }
    }
    catch(e) {
      throw new GithubError('Unable to get current commit', e)
    }
  }

  async doesBranchExist({
    org,
    repo,
    branch
  }: {
    org: string,
    repo: string,
    branch: string
  }) {
    try {
      await this.octokit.git.getRef({
        owner: org,
        repo,
        ref: `heads/${branch}`,
      }) 
      return true
    }
    catch(e) {
      //TODO be more fine-grained about this
      return false
    }
  }

  async createBranch({
    org,
    repo,
    branch,
    currentCommitSha
  }: {
    org: string,
    repo: string,
    branch: string,
    currentCommitSha: string
  }) {
    try {
      const { data } = await this.octokit.git.createRef({
        owner: org,
        repo,
        ref: `refs/heads/${branch}`,
        sha: currentCommitSha,
      });
  
      return data.object
    }
    catch(e) {
      throw new GithubError('Unable to create branch', e)
    }
  }

  async updateRef({
    org,
    repo,
    branch,
    commitSha
  }: {
    org: string,
    repo: string,
    branch: string,
    commitSha: string
  }) {
    try {
      return this.octokit.git.updateRef({
        owner: org,
        repo,
        ref: `heads/${branch}`,
        sha: commitSha,
      })
    }
    catch(e) {
      throw new GithubError(`Unable to update ref heads/${branch}`, e)
    }
  }
}

export class GithubError extends WrappedError {
  constructor(message: string, error: any) {
    super(`GithubConnector: ${message}`, error)
  }
}