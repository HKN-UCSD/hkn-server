export interface Availabilities {
  [date: string]: [TimeRange];
}

interface TimeRange {
  start: string;
  end: string;
}
