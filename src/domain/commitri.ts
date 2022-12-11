import { Octokit } from "@octokit/rest"
import { GithubConnector } from "../github/connector"
import { GithubSessionFactory } from "../github/session"
import { OperationBuilder } from "./operation.builder"
import { OperationRunner } from "./operation.runner"

export class Commitri {
  private _repo!: string
  private _owner!: string

  constructor(private readonly githubToken: string) {

  }

  repo(repo: string): Omit<this, 'owner' | 'repo'> {
    this._repo = repo
    return this
  }

  owner(owner: string): Omit<this, 'operation' | 'owner'> {
    this._owner = owner
    return this
  }

  operation(operation: OperationBuilder) {
    const connector = new GithubConnector(new Octokit({ auth: this.githubToken }))

    return new OperationRunner(new GithubSessionFactory({
      owner: this._owner,
      repo: this._repo,
    }, connector), operation)
  }
}