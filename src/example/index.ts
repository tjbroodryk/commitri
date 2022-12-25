import {
  ChangeBuilder,
  Commitri,
  OperationBuilder,
  YamlTransformationBuilder,
} from "../";

// Example with single quotes
const transform = new YamlTransformationBuilder()
  .withQuoteStyle("QUOTE_SINGLE") // Use single quotes instead of double quotes
  .set({
    path: "test:foo",
    value: "bla",
  })
  .build();

const change =
  ChangeBuilder.forSourceFile("example/test.yml").transformations(transform);

// Example with double quotes (default)
const change2 = ChangeBuilder.forSourceFile(
  "example/other-test.yml"
).transformations(
  new YamlTransformationBuilder()
    .withQuoteStyle("QUOTE_DOUBLE") // Explicitly use double quotes
    .set({
      path: "test_2:foo",
      value: "bla",
    })
    .build()
);

// Example with plain style (no quotes when possible)
const change3 = ChangeBuilder.forSourceFile(
  "example/plain-test.yml"
).transformations(
  new YamlTransformationBuilder()
    .withQuoteStyle("PLAIN") // Use no quotes when possible
    .set({
      path: "test_3:foo",
      value: "bla",
    })
    .build()
);

const operation = OperationBuilder.forBranch("main")
  .addChange(change)
  .addChange(change2)
  .addChange(change3);

new Commitri((process.env as any).GITHUB_TOKEN)
  .owner("tjbroodryk")
  .repo("commitri")
  .operation(operation)
  .commit("commitri: test commit with quote style configuration");
