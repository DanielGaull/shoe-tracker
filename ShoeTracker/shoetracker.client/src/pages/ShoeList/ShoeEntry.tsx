import React, { useCallback, useMemo } from "react";
import { GradientSection, Shoe } from "../../types/shoes";

interface ShoeEntryProps {
    shoe: Shoe;
}

const ShoeEntry = ({ shoe }: ShoeEntryProps) => {
    const gradientToCssEntry = useCallback((gradientSection: GradientSection, totalPoints: number, prevTotal: number) => {
        return `rgba(${gradientSection.color.r},${gradientSection.color.g},${gradientSection.color.b},1) ` + 
            `${Math.round((prevTotal + gradientSection.points) / totalPoints * 100)}%`;
    }, []);

    const constructBackground = useCallback((gradient: GradientSection[]) => {
        const totalPoints = gradient.reduce((prev, cur) => prev + cur.points, 0);
        const gradStrs: string[] = [];
        let currentPoints = 0;
        for (let section of gradient) {
            gradStrs.push(gradientToCssEntry(section, totalPoints, currentPoints));
            currentPoints += section.points;
        }

        return `linear-gradient(90deg, ${gradStrs.join(', ')})`;
    }, []);

    const backgroundValue = useMemo(() => {
        return constructBackground(shoe.gradient);
    }, [shoe.gradient]);

    const textValue = useMemo(() => {
        if (shoe.textColor === 'Light') {
            return '#dedede';
        } else {
            return '#1a1a1a';
        }
    }, [shoe.textColor]);

    return (
        <div className="shoe-entry-container" style={{ background: backgroundValue, color: textValue }}>
            <div className="title">{shoe.shoeName}</div>
            <div className="subtitle">{shoe.brand} {shoe.model} {shoe.modelVersion}</div>
            <div>Start Date: {new Date(shoe.startDate).toLocaleDateString()}</div>
            <div>Mileage: {shoe.miles} mi (warning at {shoe.warnAtMileage} mi)</div>
            <div className="description">{shoe.description}</div>
        </div>
    );
};

export default ShoeEntry;
