export async function errorHandle(fn: Function) {
  try {
    const response = await fn();
    if (response.error) {
      throw new ElectronError(response.error);
    }
    return response.data;
  } catch (e: any) {
    throw new ElectronError(e);
  }
}

export class ElectronError extends Error {
  name: string;
  details: string;
  type: string;
  code: number;

  constructor({ message = '', details = "", type = "", code = 0 } = {}) {
    super(message);
    this.name = "ElectronError";
    this.details = details;
    this.type = type;
    this.code = code;
  }
}
