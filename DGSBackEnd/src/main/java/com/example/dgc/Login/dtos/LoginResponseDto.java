package com.example.dgc.Login.dtos;

import java.util.UUID;

public record LoginResponseDto(
        UUID id,
        String nome,
        String email) {
}
