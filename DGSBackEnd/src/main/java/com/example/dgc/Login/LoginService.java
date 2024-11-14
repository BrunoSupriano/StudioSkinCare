package com.example.dgc.Login;


import com.example.dgc.Login.dtos.LoginRequestDto;
import com.example.dgc.Login.dtos.LoginResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private LoginMapper loginMapper;

    public LoginResponseDto login(LoginRequestDto loginRequestDto) {
        Login login = loginRepository.findByEmail(loginRequestDto.email());

        if (login != null && login.getSenha().equals(loginRequestDto.senha())) {
            return loginMapper.toResponseDTO(login);
        }

        return null;
    }
}
