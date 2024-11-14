package com.example.dgc.Login;

import com.example.dgc.Login.dtos.LoginResponseDto;


public class LoginMapper {

    public LoginResponseDto toResponseDTO(Login login) {
        return new LoginResponseDto(
                login.getId(),
                login.getNome(),
                login.getEmail()
        );
    }
}
