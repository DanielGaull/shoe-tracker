import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import ShoeEntry from './ShoeEntry';
import { Shoe } from '../../types/shoes';
import Modal from '../../components/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';

import './ShoeList.css';

const ShoeList = () => {
    const [shoes, setShoes] = useState<Shoe[]>([]);
    const [loading, setLoading] = useState(false);
    const [shoeToDelete, setShoeToDelete] = useState<Shoe | undefined>();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const navigate = useNavigate();

    async function load() {
        setLoading(true);
        const response = await axios.get('/api/shoes');
        setShoes(response.data);
        setLoading(false);
    }

    useEffect(() => {
        load();
    }, []);

    const deleteShoe = useCallback((shoe: Shoe) => {
        async function doDelete() {
            await axios.delete(`/api/shoes/${shoe.id}`);
            await load();
            setDeleteModalOpen(false);
            setShoeToDelete(undefined);
        }

        doDelete();
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

            {!loading && (
                <>
                    {shoes.length > 0 && (
                        <div className="shoe-list">
                            {shoes.map(shoe => 
                                <ShoeEntry
                                    shoe={shoe}
                                    onDeleteClicked={() => {
                                        setDeleteModalOpen(true);
                                        setShoeToDelete(shoe);
                                    }} 
                                />
                            )}
                        </div>
                    )}
                    {shoes.length <= 0 && <h3>No shoes to display</h3>}
                </>
            )}
            {loading && <Spinner />}

            <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
                <h3>Are you sure?</h3>
                Are you sure you want to delete "{shoeToDelete?.shoeName ?? '[Missing name]'}"?
                <div className="button-row mt">
                    <button
                        className="mr-s"
                        onClick={() => setDeleteModalOpen(false)}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => deleteShoe(shoeToDelete!)}
                    >
                        Confirm
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default ShoeList;
