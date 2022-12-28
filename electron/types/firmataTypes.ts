export interface IPin {
  supportedModes: Array<number>;
  value: number;
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