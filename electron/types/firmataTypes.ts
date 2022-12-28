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
/* PIN MODE - PARAMAS */
export interface IPinMode {
  pin: number;
  mode: number;
}
/* PIN MODE - RETURN VALUE */
export interface IPinModeReturnValue extends IPin {}

export interface IDigitalWrite{
  pin: number;
  value: number;
}

export interface IDisconnectReturnValue {
  reason: string | null,
  success: boolean,
}