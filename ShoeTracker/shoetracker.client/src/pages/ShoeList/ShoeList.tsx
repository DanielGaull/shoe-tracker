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
        <div className="shoe-list">
            {shoes.map(shoe => <ShoeEntry shoe={shoe} />)}
        </div>
    );
};

export default ShoeList;
