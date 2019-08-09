interface Date {
    addMilliseconds(milliseconds: number): Date;
    addSeconds(seconds: number): Date;
    addMinutes(seconds: number): Date;
    addHours(seconds: number): Date;
    addDays(seconds: number): Date;
    addMonths(seconds: number): Date;
    addYears(seconds: number): Date;

    clearTime(utc?: boolean): Date;
    isToday(): boolean;
    clone(): Date;
    isSameDate(date: Date): boolean;
    isWeekend(): boolean;
}