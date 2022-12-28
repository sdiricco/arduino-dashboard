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

export interface IPinMode {
  pin: number;
  mode: number;
}

export interface IDigitalWrite{
  pin: number;
  value: number;
}