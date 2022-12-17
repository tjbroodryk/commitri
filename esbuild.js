const esbuild = require("esbuild");
const { nodeExternalsPlugin } = require("esbuild-node-externals");

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    outdir: "lib",
    bundle: true,
    platform: "node",
    sourcemap: true,
    minify: true,
    format: "cjs",
    target: ["node14"],
    plugins: [nodeExternalsPlugin()],
  })
  .catch(() => process.exit(1));
