export type ErrorType = {
  type: string,
  code: number,
  msg: string | {[key: string]: any};
};

export type actionType<P> = (data?: P) => never;
