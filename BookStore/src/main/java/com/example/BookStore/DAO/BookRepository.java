package com.example.BookStore.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.BookStore.Model.BookStore;

public interface BookRepository extends JpaRepository<BookStore,Long>{

}
