import React, { useMemo } from "react";
import { Shoe } from "../../types/shoes";
import { calculateBackground } from "../../util/util";
import { useNavigate } from "react-router";

interface ShoeEntryProps {
    shoe: Shoe;
    displayOnly?: boolean;

    onDeleteClicked?: () => void;
}

const ShoeEntry = ({ shoe, displayOnly, onDeleteClicked = () => {} }: ShoeEntryProps) => {
    const navigate = useNavigate();

    const backgroundValue = useMemo(() => {
        return calculateBackground(shoe.gradient);
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
            {!displayOnly && (
                <div className="shoe-action-icons">
                    <button
                        className="i-button"
                        onClick={() => navigate(`/edit-shoe/${shoe.id}`)}
                    >
                        E
                    </button>
                    <button
                        className="i-button"
                        onClick={() => onDeleteClicked()}
                    >
                        X
                    </button>
                </div>
            )}
            <div className="title">{shoe.shoeName}</div>
            <div className="subtitle">{shoe.brand} {shoe.model} {shoe.modelVersion}</div>
            <div>Start Date: {new Date(shoe.startDate).toLocaleDateString()}</div>
            <div>Mileage: {shoe.miles} mi (warning at {shoe.warnAtMileage} mi)</div>
            <div className="description">{shoe.description}</div>
        </div>
    );
};

export default ShoeEntry;
