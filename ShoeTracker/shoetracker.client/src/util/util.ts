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

const stringDateToDateModel = (date: string): DateModel => ({
    month: new Date(date).getMonth() + 1,
    day: new Date(date).getDate() + 1,
    year: new Date(date).getFullYear(),
});

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
}

export { 
    calculateBackground,
    calculateTextColor,
    weekdays,
    months,
    stringDateToDateModel,
    distanceUnitToAbbreviation,
    timeToString,
};
