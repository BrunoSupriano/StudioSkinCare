package com.example.dgc.Usuario;

public class LoginResponse {
    private final String message;
    private final String userName;

    public LoginResponse(String message, String userName) {
        this.message = message;
        this.userName = userName;
    }

    public String getMessage() {
        return message;
    }

    public String getUserName() {
        return userName;
    }
}