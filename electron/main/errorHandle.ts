import { IElectronError, IElectronIPC } from "../types";

export async function errorHandle(fn: Function, error: IElectronError): Promise<IElectronIPC> {
  const result: IElectronIPC = {
    error: {
      details: null,
    },
    data: null,
  };
  try {
    result.data = await fn();
    JSON.parse("ciao{]");
  } catch (e) {
    result.error.details = e.message;
    result.error = { ...result.error, ...error };
  }
  return result;
}
