import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/Style.css';

const EditBook = () => {
    const { id } = useParams();
    const [data, setData] = useState({
        title: "",
        author: "",
        price: ""
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/view/${id}`)
            .then(response => {
                setData(response.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8080/edit/${id}`, {
            title: data.title,
            author: data.author,
            price: data.price
        })
            .then(res => {
                console.log(res.data);
                
                window.location.href="http://localhost:3000/";
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='form-edit'>
                <h2>EDIT BOOK</h2>
                <input
                    type="text"
                    name="name"
                    value={data.title}
                    onChange={(e) => setData({ ...data, title: e.target.value })}
                    placeholder="Enter Book Name" required
                />
                <br />
                <input
                    type="text"
                    name="author"
                    value={data.author}
                    onChange={(e) => setData({ ...data, author: e.target.value })}
                    placeholder="Enter Author" required
                />
                <br />
                <input
                    type="text"
                    name="price"
                    value={data.price}
                    onChange={(e) => setData({ ...data, price: e.target.value })}
                    placeholder="Enter Price" required
                />
                <br />
                <button type="submit">UPDATE</button>
            </form>
        </>
    );
};

export default EditBook;
