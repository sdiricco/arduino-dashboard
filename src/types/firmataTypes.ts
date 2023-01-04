export enum PinMode {
  INPUT = 0x00,
  OUTPUT = 0x01,
  ANALOG = 0x02,
  PWM = 0x03,
  SERVO = 0x04,
  SHIFT = 0x05,
  I2C = 0x06,
  ONEWIRE = 0x07,
  STEPPER = 0x08,
  SERIAL = 0x0A,
  PULLUP = 0x0B,
  IGNORE = 0x7F,
  UNKOWN = 0x10
}

export enum PinValue {
  LOW = 0x00,
  HIGH = 0x01
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