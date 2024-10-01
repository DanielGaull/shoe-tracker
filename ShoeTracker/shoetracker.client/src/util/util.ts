import { DistanceUnit, Time } from "../types/activity";
import { GradientSection, Color, DateModel, TextColor } from "../types/shoes";

const colorToRgbaString = (c: Color): string => {
    return `rgba(${c.r},${c.g},${c.b},1)`;
}

const gradientToCssEntry = (gradientSection: GradientSection, totalPoints: number, prevTotal: number) => {
    return `${colorToRgbaString(gradientSection.color)} ${Math.round((prevTotal + gradientSection.points) / totalPoints * 100)}%`;
};

const calculateBackground = (gradient: GradientSection[]): string => {
    if (gradient.length === 1) {
        return colorToRgbaString(gradient[0].color);
    }

    const totalPoints = gradient.reduce((prev, cur) => prev + cur.points, 0);
    const gradStrs: string[] = [];
    let currentPoints = 0;
    for (let section of gradient) {
        gradStrs.push(gradientToCssEntry(section, totalPoints, currentPoints));
        currentPoints += section.points;
    }

    return `linear-gradient(90deg, ${gradStrs.join(', ')})`;
};

const calculateTextColor = (c: TextColor): string => {
    if (c === 'Light') {
        return '#dedede';
    } else {
        return '#1a1a1a';
    }
}

const stringDateToDateModel = (date: string): DateModel => {
    const firstDash = date.indexOf('-');
    const lastDash = date.lastIndexOf('-');
    const year = parseInt(date.substring(0, firstDash));
    const month = parseInt(date.substring(firstDash + 1, lastDash));
    const day = parseInt(date.substring(lastDash + 1));
    return {
        month,
        year,
        day,
    };
};

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const distanceUnitToAbbreviation = (unit: DistanceUnit): string => {
    if (unit === 'Kilometers') {
        return 'km';
    } else if (unit === 'Meters') {
        return 'm';
    } else {
        return 'mi';
    }
};

const timeToString = (time: Time): string => {
    const base: string = `${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
    if (time.hours > 0) {
        return `${time.hours.toString().padStart(2, '0')}:${base}`;
    } else {
        return base;
    }
};

const distanceAsMiles = (dist: number, units: DistanceUnit): number => {
    switch (units) {
        case 'Kilometers':
            return dist * 1000 / 1609;
        case 'Meters':
            return dist / 1609;
        case 'Miles':
            return dist;
    }
};

const roundTo = (v: number, d: number): number => Math.round(v * Math.pow(10, d)) / Math.pow(10, d);

export { 
    calculateBackground,
    calculateTextColor,
    weekdays,
    months,
    stringDateToDateModel,
    distanceUnitToAbbreviation,
    timeToString,
    distanceAsMiles,
    roundTo,
};
