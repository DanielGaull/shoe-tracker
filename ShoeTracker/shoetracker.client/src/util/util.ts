import { GradientSection, Color } from "../types/shoes";

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

export { 
    calculateBackground,
};
