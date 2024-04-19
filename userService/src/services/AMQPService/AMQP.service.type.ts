export type SupportedEvents = 'create' | 'delete';
export type DataType = Record<string, unknown>;

export type OutgoingMessage = {
  event: SupportedEvents;
  data: DataType;
};
