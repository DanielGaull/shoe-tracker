import React from 'react';

interface NumberInputProps {
    value: string;
    onChange: (value: string) => any;
    allowFloats?: boolean;
}

const NumberInput = ({ value, onChange, allowFloats = false, ...rest }: NumberInputProps) => (
    <input
        className="thin-input"
        value={value}
        onChange={(e) => {
            if (allowFloats) {
                onChange(e.target.value.replace(/[^0-9\.]/,''));
            } else {
                onChange(e.target.value.replace(/[^0-9]/,''));
            }
        }}
        {...rest}
    />
);

export default NumberInput;
