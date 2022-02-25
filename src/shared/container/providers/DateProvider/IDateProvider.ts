export interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date);
  dateNow(): Date;
  addDays(days: number): Date;
}
