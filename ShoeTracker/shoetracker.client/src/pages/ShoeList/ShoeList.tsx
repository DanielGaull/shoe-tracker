import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import ShoeEntry from './ShoeEntry';
import { Shoe } from '../../types/shoes';

import './ShoeList.css';
import Modal from '../../components/Modal/Modal';

const ShoeList = () => {
    const [shoes, setShoes] = useState<Shoe[]>([]);

    const [shoeToDelete, setShoeToDelete] = useState<string | undefined>();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        async function load() {
            const response = await axios.get('/api/shoes');
            setShoes(response.data);
        }

        load();
    }, []);

    return (
        <>
            <div className="header">
                <h1>Shoes</h1>
                <button
                    onClick={() => {
                        navigate('/create-shoe');
                    }}
                >
                    + Add New Shoe
                </button>
            </div>
            {shoes.length > 0 && (
                <div className="shoe-list">
                    {shoes.map(shoe => 
                        <ShoeEntry
                            shoe={shoe}
                            onDeleteClicked={() => {
                                setDeleteModalOpen(true);
                                setShoeToDelete(shoe.id);
                            }} 
                        />
                    )}
                </div>
            )}
            {shoes.length <= 0 && <h3>No shoes to display</h3>}

            <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
                test dialog
            </Modal>
        </>
    );
};

export default ShoeList;
