package com.bookstore.exception;

public class InternalServerErrorException extends RuntimeException {

    public InternalServerErrorException(String message){
        super(message);
    }
}
