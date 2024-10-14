package com.example.BookStore.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BookStore.DAO.BookRepository;
import com.example.BookStore.Model.BookStore;

@Service
public class BookService {

	@Autowired
	private BookRepository db;

	// TO VIEW ALL DATA
	public List<BookStore> getAllData() {
		return db.findAll();
	}

	// TO INSERT
	public BookStore setData(BookStore book) {
		return db.save(book);
	}

	// TO VIEW BY ID
	public Optional<BookStore> getById(long id) {
		return db.findById(id);
	}

	// DELETE BY ID
	public void deleteById(long id) {
		db.deleteById(id);
	}

	// DELETE ALL DATA
	public void delete() {
		db.deleteAll();
	}
}
