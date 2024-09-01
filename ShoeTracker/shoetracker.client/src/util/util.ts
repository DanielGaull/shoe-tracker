import { GradientSection } from "../types/shoes";

const gradientToCssEntry = (gradientSection: GradientSection, totalPoints: number, prevTotal: number) => {
    return `rgba(${gradientSection.color.r},${gradientSection.color.g},${gradientSection.color.b},1) ` + 
        `${Math.round((prevTotal + gradientSection.points) / totalPoints * 100)}%`;
};

const calculateBackground = (gradient: GradientSection[]): string => {
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
