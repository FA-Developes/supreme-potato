Date.prototype.addMilliseconds = function(milliseconds: number): Date {
    if (!milliseconds) return this;
    let date = this;
    date.setMilliseconds(date.getMilliseconds() + milliseconds);

    return date;
};

Date.prototype.addSeconds = function(seconds: number): Date {
    if (!seconds) return this;
    let date = this;
    date.setSeconds(date.getSeconds() + seconds);

    return date;
};

Date.prototype.addMinutes = function(minutes: number): Date {
    if (!minutes) return this;
    let date = this;
    date.setMinutes(date.getMinutes() + minutes);

    return date;
};

Date.prototype.addHours = function(hours: number): Date {
    if (!hours) return this;
    let date = this;
    date.setHours(date.getHours() + hours);

    return date;
};

Date.prototype.addDays = function(days: number): Date {
    if (!days) return this;
    let date = this;
    date.setDate(date.getDate() + days);

    return date;
};

Date.prototype.addMonths = function(months: number): Date {
    if (!months) return this;
    let date = this;
    date.setMonth(date.getMonth() + months);

    return date;
};

Date.prototype.addYears = function(years: number): Date {
    if (!years) return this;
    let date = this;
    date.setFullYear(date.getFullYear() + years);

    return date;
};

Date.prototype.clearTime = function(utc: boolean): Date {
    let d: Date = this;
    if (utc) {
        d.setUTCHours(0);
        d.setUTCMinutes(0);
        d.setUTCSeconds(0);
        d.setUTCMilliseconds(0);
    } else {
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
    }
    return this;
};

Date.prototype.isToday = function(): boolean {
    let today = new Date();
    return this.isSameDate(today);
};

Date.prototype.clone = function(): Date {
    return new Date(+this);
};

Date.prototype.isWeekend = function(): boolean {
    return this.getDay() === 0 || this.getDay() === 6;
};

Date.prototype.isSameDate = function(date: Date): boolean {
    return (
        date &&
        this.getFullYear() === date.getFullYear() &&
        this.getMonth() === date.getMonth() &&
        this.getDate() === date.getDate()
    );
};  