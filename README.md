# Commitri

Small tool to commit changes to a file (or files) in github.

## Motivations

This tool was created as part of a gitops toolchain. It covers the requirement to commit an image tag (or other value) into the github repo during a CI run.

It is able to commit to multiple files at once.

Developed for an initial use case of having to change a value in a `Pulumi.prod.yaml` file and `Pulumi.dev.yaml` file in one commit.

## Usage

See the `/examples` dir.

## Limitations

- At the moment, it is only capable of directly committing to a branch. Automatic PR creation functionality is not yet available.

- Only yaml transforms are currently available be default. Although you are able to write your own via the `transform` api

```typescript
ChangeBuilder.forSourceFile("example/other-test.yml").transform(
  (value: string) => {
    const json = JSON.parse(value);

    //do stuff

    return JSON.stringify(json);
  }
);
```

## Development

```bash
npm i

npm run test
```

To test the library is able to commit to a git repo, change the repo in the `example/index.ts`, and set your `GITHUB_TOKEN` env var

and then run

```bash
ts-node src/example/index.ts
```
