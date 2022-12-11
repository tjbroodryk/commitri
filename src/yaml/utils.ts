export const makePath =(path: string) =>{
  return path
    .split(/(?<!\\):/g)
    .map((x) => (x.includes("\\:") ? x.replace("\\:", ":") : x));
}