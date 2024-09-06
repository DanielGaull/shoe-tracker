import React from 'react';

interface NumberInputProps {
    value: string;
    onChange: (value: string) => any;
}

const NumberInput = ({ value, onChange, ...rest }: NumberInputProps) => (
    <input
        className="thin-input"
        value={value}
        onChange={(e) => {
            onChange(e.target.value.replace(/\D/,''));
        }}
        {...rest}
    />
);

export default NumberInput;
