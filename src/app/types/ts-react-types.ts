export interface IMatch<P> {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
}
