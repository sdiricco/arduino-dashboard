export enum PinMode {
  In = 0x00,
  Out = 0x01
}

export enum PinValue {
  Low = 0x00,
  High = 0x01
}

export interface IPin {
  supportedModes: Array<PinMode>;
  value: PinValue;
  report: number;
  analogChannel: number;
}

export interface IBoard {
  versionReceived: boolean;
  isReady: boolean;
  path: string;
  pins: Array<IPin>;
}

/* PIN MODE - INTERFACES */
/* PIN MODE - PARAMS */
export interface IPinModeParams {
  pin: number;
  mode: number;
}

/* DIGITAL WRITE - INTERFACES */
/* DIGITAL WRITE - PARAMS */
export interface IDigitalWriteParams{
  pin: number;
  value: number;
}

/* DIGITAL WRITE - RETURN VALUE */
export interface IDisconnectReturnValue {
  reason: string | null,
  success: boolean,
}