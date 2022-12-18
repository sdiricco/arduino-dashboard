import { IElectronError, IElectronIPC } from "../types";

export async function errorHandle(fn: Function, error: IElectronError): Promise<IElectronIPC> {
  const result: IElectronIPC = {};
  try {
    result.data = await fn();
  } catch (e) {
    result.error.details = e.message;
    result.error = { ...result.error, ...error };
  }
  return result;
}
