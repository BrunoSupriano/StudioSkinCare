package com.example.dgc.Login.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;

public record LoginRequestDto(
        @NotBlank @Email String email,
        @NotBlank String senha) {
}
