declare module 'calendar-dates' {
  export interface CalendarDatesResult {
    date: number;
    type: 'previous' | 'current' | 'next';
    iso: string;
  }
  class CalendarDates {
    getDates(yearMonth: Date): Promise<CalendarDatesResult[]>;
  }

  export = CalendarDates;
}
