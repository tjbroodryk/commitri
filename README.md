## Usage

## Motivations

## Limitations

## Development
const changeDev = new Change()
  .sourcePath(`iac/applications/Pulumi.prod.yaml`)
  .outputPath(`iac/applications/Pulumi.prod.yaml`)
  .set(`config:applications\\:api:image:tag`, tag)

const changeProd = new Change()
  .sourcePath(`iac/applications/Pulumi.prod.yaml`)
  .outputPath(`iac/applications/Pulumi.prod.yaml`)
  .set(`config:applications\\:api:image:tag`, tag)
  
new Octommit(GITHUB_TOKEN)
  .update()
  .org("coterahq")
  .repository('cotera')
  .sourceBranch('main')
  .outputBranch('main')
  .change(changeProd)
  .change(changeDev)
  .commit()
  .run()
  .then(() => {
    console.log(`Commited docker image ${tag} to infra repo`);
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });