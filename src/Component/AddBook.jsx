import axios from 'axios';
import React, { useState } from 'react';
import '../css/Style.css';

function AddBook() {

    const [data,setData]= useState({
        name:"",
        author:"",
        price:""
    });

      const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/add",{
          title:data.title,
          author:data.author,
          price:data.price
        })
        .then(res => {
          console.log(res.data);
          
          window.location.href="http://localhost:3000/";
      })
        .catch(err => console.log(err));
    };
    

  return (
    <>
        <form onSubmit={handleSubmit} className='form'>
      <h2>ADD BOOK</h2>
      <input
        type="text"
        name="name"
        onChange={(e)=>setData({...data,title:e.target.value})}
        placeholder="Enter Book Name" required
      />
      <br />
      <input
        type="text"
        name="author"
        onChange={(e)=>setData({...data,author:e.target.value})}
        placeholder="Enter Author" required
      />
      <br />
      <input
        type="text"
        name="price"
        onChange={(e)=>setData({...data,price:e.target.value})}
        placeholder="Enter Price" required
      />
      <br />
      <button type="submit">ADD</button>
    </form>
    </>
  )
}

export default AddBook