export type SupportedEvents = 'create' | 'delete';
export type DataType = Record<string, unknown>;

export type IncomingMessage = {
  event: SupportedEvents;
  data: DataType;
};

export type EventHandler = (data: DataType) => Promise<void> | void;
