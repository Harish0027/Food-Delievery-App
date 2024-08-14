import React, { useState, useEffect } from 'react';
import "./Lists.css";
import axios from "axios";
import { toast } from 'react-toastify';

const Lists = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:3004/api/food/list");
                if (res.data.success) {
                    setList(res.data.data);
                } else {
                    toast.error(res.data.message);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const onRemoveItem = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3004/api/food/remove/${id}`);
            if (res.data.success) {
                toast.success(res.data.message);
                // Filter out the removed item from the list
                setList(list.filter(item => item._id !== id));
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Error removing item:", error);
            toast.error("Error removing item");
        }
    };

    return (
        <div className='list'>
            <div className='foodList'>
                {list.length === 0 ? (
                    <h2>No added yet !!</h2>
                ) : (
                    <>
                        <div className='head'>Food List</div>
                        <div className='list-table-format title'>
                            <b className='img'>Item</b>
                            <b className='name'>Name</b>
                            <b className='category'>Category</b>
                            <b className='price'>Price</b>
                            <b>Action</b>
                        </div>
                        {list.map((item, index) => (
                            <div key={index} className='list-table-format'>
                                <img className='img' src={`http://localhost:3004/images/${item.image}`} alt="item"/>
                                <p className='name'>{item.name}</p>
                                <p className='category'>{item.category}</p>
                                <p className='price'>{item.price}</p>
                                <p onClick={() => { onRemoveItem(item._id) }} className='remove'>X</p>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Lists;
