import React from 'react';
import {Link , Routes , Route} from 'react-router-dom';
import BookDetails from './BookDetails';
import AddBook from './AddBook';
import EditBook from './EditBook';


function Navbar() {
  return (
    <>
    <div className='main'>
            <h2>CRUD OPERATION</h2>
            <Link to="Add"><button>ADD BOOK</button></Link>
    </div>
     <Routes>
            <Route path="/" element={<BookDetails/>}>
            <Route path='/edit/:id' element={<EditBook/>}></Route>
            </Route>
            <Route path='Add' element={<AddBook/>}></Route>
                
    </Routes>
    </>
    
  )
}

export default Navbar