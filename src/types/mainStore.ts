export interface IPort {
  address: string;
  label: string;
  protocol: string;
  protocol_label: string;
  properties: any;
}

export interface IMatchingBoards {
  name: string;
  fqba: string;
}

export interface IBoard {
  matching_boards: Array<IMatchingBoards>;
  port: IPort;
}

export interface IState {
  availableBoards: Array<IBoard>;
  selectedPort: IBoard | null;
  isConnecting: boolean;
  isFetchingPort: boolean;
  board: {
    versionReceived: boolean;
    isReady: boolean;
    path: string;
    pins: Array<any>;
  };
}
