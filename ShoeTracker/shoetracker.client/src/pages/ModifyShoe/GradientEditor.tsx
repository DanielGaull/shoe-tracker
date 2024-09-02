import React, { useState } from 'react';
import { Color, GradientSection } from '../../types/shoes';

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex: string): Color | null {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}
function componentToHex(c: number) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
} 
function rgbToHex(c: Color) {
    return "#" + componentToHex(c.r) + componentToHex(c.g) + componentToHex(c.b);
}

const defaultColor: Color = {
    r: 255,
    g: 255,
    b: 255,
};

const defaultSection: GradientSection = {
    color: defaultColor,
    points: 5,
};

const MAX_SECTIONS = 5;

interface GradientSectionEditorProps {
    value: GradientSection;
    onChange: (value: GradientSection) => void;
    onDelete: () => void;
    canDelete: boolean;
}

const GradientSectionEditor = ({ value, onChange, onDelete, canDelete }: GradientSectionEditorProps) => {
    return (
        <div className="gradient-section">
            <button
                className="gradient-x-button i-button"
                onClick={onDelete}
                disabled={!canDelete}
            >
                X
            </button>
            <div>Section</div>
            <div className="gradient-field">
                <label>Color:</label>
                <input
                    type="color"
                    value={rgbToHex(value.color)}
                    onChange={(e) => onChange({
                        color: hexToRgb(e.target.value) ?? defaultColor,
                        points: value.points,
                    })}
                />
            </div>
            <div className="gradient-field">
                <label>Size:</label>
                <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={value.points}
                    onChange={(e) => onChange({
                        color: value.color,
                        points: parseInt(e.target.value),
                    })}
                />
            </div>
        </div>
    );
};

interface GradientEditorProps {
    value: GradientSection[];
    onChange: (v: GradientSection[]) => void;
}

// TODO: Allow reordering gradient sections
const GradientEditor = ({ value, onChange }: GradientEditorProps) => {
    return (
        <>
            {value.map((s, ix) => 
                <GradientSectionEditor
                    key={ix}
                    value={s}
                    onChange={(section) => {
                        const newSections = [...value];
                        newSections[ix] = section;
                        onChange(newSections);
                    }}
                    onDelete={() => {
                        const newSections = [...value];
                        newSections.splice(ix, 1);
                        onChange(newSections);
                    }}
                    canDelete={value.length > 1}
                />
            )}
            <button
                className="small mt-s"
                onClick={() => {
                    const newSections = [...value];
                    newSections.push(defaultSection);
                    onChange(newSections);
                }}
                disabled={value.length >= MAX_SECTIONS}
            >
                + Add Gradient Section
            </button>
        </>
    );
};

export default GradientEditor;
