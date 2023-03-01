declare module 'seedrandom' {
  function Seedrandom(seed: string): any {
    return (): number => 1;
  }

  export default Seedrandom;
}
