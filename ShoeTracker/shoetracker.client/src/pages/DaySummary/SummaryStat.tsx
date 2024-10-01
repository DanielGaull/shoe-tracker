import React from 'react';

interface SummaryStatProps {
    className?: string;
    title: string;
    value: string | number;
    units?: string;
}

const SummaryStat = ({ className = '', title, value, units = '' }: SummaryStatProps) => {
    return (
        <div className={`summary-stat ${className}`}>
            <div className="summary-stat-title">{title}</div>
            <div className="summary-stat-value">{value} {units}</div>
        </div>
    );
};

export default SummaryStat;
