package com.example.BookStore.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.BookStore.Model.BookStore;
import com.example.BookStore.Service.BookService;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from your React app
public class BookController {

	@Autowired
	private BookService bs;

	@GetMapping("/view")
	public List<BookStore> getAllData() {
		return bs.getAllData();
	}

	@GetMapping("/view/{id}")
	public ResponseEntity<BookStore> getById(@PathVariable long id) {
		Optional<BookStore> book = bs.getById(id);
		return book.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());

	}

	@PostMapping("/add")
	public ResponseEntity<BookStore> SetData(@RequestBody BookStore book) {
		BookStore b = bs.setData(book);
		return ResponseEntity.status(HttpStatus.CREATED).body(b);
	}

	@PutMapping("/edit/{id}")
	public ResponseEntity<BookStore> editById(@PathVariable long id, @RequestBody BookStore book) {
		Optional<BookStore> b = bs.getById(id);
		if (!b.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		book.setId(id);
		BookStore b1 = bs.setData(book);
		return ResponseEntity.ok(b1);

	}

	@PatchMapping("/edit1/{id}")
	public ResponseEntity<BookStore> edit1ById(@PathVariable long id, @RequestBody BookStore book) {
		Optional<BookStore> existingBookStore = bs.getById(id);

		if (!existingBookStore.isPresent()) {
			return ResponseEntity.notFound().build();
		}

		// Get the existing BookStore
		BookStore b1 = existingBookStore.get();

		// Partial update: Only update the fields that are not null in the request
		if (book.getTitle() != null) {
			b1.setTitle(book.getTitle());
		}
		if (book.getAuthor() != null) {
			b1.setAuthor(book.getAuthor());
		}

		Double value = book.getPrice();

		if (value != null) {
			b1.setPrice(book.getPrice());
		}
		// Add other fields similarly...

		// Save the updated BookStore
		bs.setData(b1);

		return ResponseEntity.ok(b1);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<BookStore> deleteById(@PathVariable long id) {
		if (!bs.getById(id).isPresent()) {
			return ResponseEntity.notFound().build();
		}
		bs.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@DeleteMapping("/delete")
	public ResponseEntity<BookStore> delete() {
		bs.delete();
		return ResponseEntity.noContent().build();
	}

}
