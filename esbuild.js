const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    outdir: "lib",
    bundle: true,
    sourcemap: true,
    minify: true,
    format: "cjs",
    target: ["es2015"],
  })
  .catch(() => process.exit(1));
