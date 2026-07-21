import { promisify } from '@rsmax/framework-shared';

declare const wx: Record<string, any> | undefined;
declare const my: Record<string, any> | undefined;
declare const tt: Record<string, any> | undefined;

function getPlatformAPI(): Record<string, any> {
  if (typeof wx !== 'undefined') {
    return wx;
  }
  if (typeof my !== 'undefined') {
    return my;
  }
  if (typeof tt !== 'undefined') {
    return tt;
  }
  return {};
}

function createAPIProxy(): any {
  return new Proxy(
    {},
    {
      get(_target: any, prop: string): any {
        const platformAPI = getPlatformAPI();

        if (typeof platformAPI[prop] === 'function') {
          return (...args: any[]) => {
            return new Promise((resolve, reject) => {
              try {
                platformAPI[prop](...args, (res: any) => {
                  if (res?.errMsg) {
                    reject(new Error(res.errMsg));
                  } else {
                    resolve(res);
                  }
                });
              } catch (error) {
                reject(error);
              }
            });
          };
        }

        if (typeof platformAPI[prop] === 'object' && platformAPI[prop] !== null) {
          return createAPIProxyForNamespace(platformAPI[prop]);
        }

        return platformAPI[prop];
      },
    }
  );
}

function createAPIProxyForNamespace(namespace: any): any {
  return new Proxy(
    {},
    {
      get(_target: any, prop: string): any {
        if (typeof namespace[prop] === 'function') {
          return (...args: any[]) => {
            return new Promise((resolve, reject) => {
              try {
                namespace[prop](...args, (res: any) => {
                  if (res?.errMsg) {
                    reject(new Error(res.errMsg));
                  } else {
                    resolve(res);
                  }
                });
              } catch (error) {
                reject(error);
              }
            });
          };
        }

        return namespace[prop];
      },
    }
  );
}

export const api = createAPIProxy();

export function callAPI(method: string, ...args: any[]): Promise<any> {
  const platformAPI = getPlatformAPI();

  const methodParts = method.split('.');
  let current: any = platformAPI;

  for (const part of methodParts) {
    if (!current) {
      throw new Error(`API method not found: ${method}`);
    }
    current = current[part];
  }

  if (typeof current !== 'function') {
    throw new Error(`API method is not a function: ${method}`);
  }

  return new Promise((resolve, reject) => {
    try {
      current(...args, (res: any) => {
        if (res?.errMsg) {
          reject(new Error(res.errMsg));
        } else {
          resolve(res);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

export { promisify };
getPlatformAPI();
