import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShoeEntry from './ShoeEntry';

import './ShoeList.css';

const ShoeList = () => {
    const [shoes, setShoes] = useState<Shoe[]>([]);

    useEffect(() => {
        async function load() {
            const response = await axios.get('/api/shoes');
            setShoes(response.data);
        }

        load();
    }, []);

    return (
        <>
            <h1>Shoes</h1>
            {shoes.length > 0 && (
                <div className="shoe-list">
                    {shoes.map(shoe => <ShoeEntry shoe={shoe} />)}
                </div>
            )}
            {shoes.length <= 0 && <h3>No shoes to display</h3>}
        </>
    );
};

export default ShoeList;
