export interface PromisifyArgs<SuccessArg, FailArg> {
  success?: (args: SuccessArg) => void;
  fail?: (args: FailArg) => void;
}

export function promisify<Arg extends Record<string, any> = Record<string, never>, SuccessArg = any, FailArg = any>(
  api: (arg: Arg & PromisifyArgs<SuccessArg, FailArg>) => void
) {
  return (arg: Partial<Arg> & Partial<PromisifyArgs<SuccessArg, FailArg>> = {} as Partial<Arg>) => {
    return new Promise<SuccessArg>((resolve, reject) => {
      const promisifyArg: any = arg;

      api({
        ...promisifyArg,
        success: (res: SuccessArg) => {
          if (promisifyArg && typeof promisifyArg.success === 'function') {
            promisifyArg.success(res);
          }
          resolve(res);
        },
        fail: (res: FailArg) => {
          if (promisifyArg && typeof promisifyArg.fail === 'function') {
            promisifyArg.fail(res);
          }
          reject(res);
        },
      });
    });
  };
}
