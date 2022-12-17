const esbuild = require("esbuild");

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
  })
  .catch(() => process.exit(1));
