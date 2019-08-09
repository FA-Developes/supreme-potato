"use strict";
Date.prototype.addMilliseconds = function (milliseconds) {
    if (!milliseconds)
        return this;
    var date = this;
    date.setMilliseconds(date.getMilliseconds() + milliseconds);
    return date;
};
Date.prototype.addSeconds = function (seconds) {
    if (!seconds)
        return this;
    var date = this;
    date.setSeconds(date.getSeconds() + seconds);
    return date;
};
Date.prototype.addMinutes = function (minutes) {
    if (!minutes)
        return this;
    var date = this;
    date.setMinutes(date.getMinutes() + minutes);
    return date;
};
Date.prototype.addHours = function (hours) {
    if (!hours)
        return this;
    var date = this;
    date.setHours(date.getHours() + hours);
    return date;
};
Date.prototype.addDays = function (days) {
    if (!days)
        return this;
    var date = this;
    date.setDate(date.getDate() + days);
    return date;
};
Date.prototype.addMonths = function (months) {
    if (!months)
        return this;
    var date = this;
    date.setMonth(date.getMonth() + months);
    return date;
};
Date.prototype.addYears = function (years) {
    if (!years)
        return this;
    var date = this;
    date.setFullYear(date.getFullYear() + years);
    return date;
};
Date.prototype.clearTime = function (utc) {
    var d = this;
    if (utc) {
        d.setUTCHours(0);
        d.setUTCMinutes(0);
        d.setUTCSeconds(0);
        d.setUTCMilliseconds(0);
    }
    else {
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
    }
    return this;
};
Date.prototype.isToday = function () {
    var today = new Date();
    return this.isSameDate(today);
};
Date.prototype.clone = function () {
    return new Date(+this);
};
Date.prototype.isWeekend = function () {
    return this.getDay() === 0 || this.getDay() === 6;
};
Date.prototype.isSameDate = function (date) {
    return (date &&
        this.getFullYear() === date.getFullYear() &&
        this.getMonth() === date.getMonth() &&
        this.getDate() === date.getDate());
};
