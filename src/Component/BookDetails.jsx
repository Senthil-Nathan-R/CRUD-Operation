import React, { useEffect, useState  } from 'react';
import axios from 'axios';
import {Link , Outlet} from 'react-router-dom';


import '../css/Style.css';

function BookDetails() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/view")
            .then(response => {
                console.log(response.data); // Check the structure here
                setData(response.data);
            })
            .catch(err => console.log(err));
    }, []);  // Empty dependency array

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/delete/${id}`)
            .then(response => {
                console.log(response.data);
                setData(data.filter(book => book.id !== id)); // Update the state after deleting
            })
            .catch(err => console.log(err));
    }
    


    

    return (
        <>  
            <table className='content-table' >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>BOOK TITLE</th>
                        <th>AUTHOR</th>
                        <th>PRICE</th>
                        <th>MODIFY</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {
                        data.map((book, i) => (
                            <tr className="book-row" key={i}>
                                <td>{i+1}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>₹ {book.price}</td>
                                <td>
                                <Link to={`/edit/${book.id}`}><button>Edit</button></Link>
                                <button onClick={()=>handleDelete(book.id)}>Delete</button>
                                </td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Outlet/>
    
        </>
    );
}

export default BookDetails;
