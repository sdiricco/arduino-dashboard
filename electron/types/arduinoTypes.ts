export interface IPort {
  matching_boards?: Array<{
    name: string;
    fqba: string;
  }>;
  port: {
    address: string;
    label: string;
    protocol: string;
    protocol_label: string;
    properties: any;
  };
}
