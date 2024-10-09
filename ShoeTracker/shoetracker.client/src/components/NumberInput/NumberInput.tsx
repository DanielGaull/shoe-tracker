import classNames from 'classnames';
import React from 'react';

interface NumberInputProps {
    value: string;
    onChange: (value: string) => any;
    allowFloats?: boolean;
    small?: boolean;
}

const NumberInput = ({ value, onChange, allowFloats = false, small = false, ...rest }: NumberInputProps) => (
    <input
        className={classNames({
            'thin-input': true,
            'small-input': small,
        })}
        value={value}
        onChange={(e) => {
            if (allowFloats) {
                const sanitizedValue = e.target.value.replace(/[^0-9\.]/,'');
                // Only allow change if the value has only one decimal point
                if (sanitizedValue.indexOf('.') === sanitizedValue.lastIndexOf('.')) {
                    onChange(sanitizedValue);
                }
            } else {
                onChange(e.target.value.replace(/[^0-9]/,''));
            }
        }}
        {...rest}
    />
);

export default NumberInput;
