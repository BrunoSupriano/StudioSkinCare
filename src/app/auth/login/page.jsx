"use client";

import "../../globals.css";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Redireciona para a rota desejada
        router.push('/ERP/Agendamento');
    };

    return (
        <div className="flex flex-col h-screen bg-pink-100 w-full">
            <div className="flex flex-col items-center justify-center h-full p-5">
                <h1 className="text-9xl mb-10 font-sacramento text-pink-600">Login</h1>
                <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-5 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-sm text-pink-600">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 text-lg border border-pink-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2 text-sm text-pink-600">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 text-lg border border-pink-300 rounded-md"
                        />
                    </div>
                    <button type="submit" className="w-full py-2 text-lg text-white bg-pink-500 rounded-md cursor-pointer transition-colors duration-300 hover:bg-pink-600">
                        Entrar
                    </button>
                </form>
                <p className="mt-5 text-sm text-pink-600 text-center">
                    Não tem uma conta? <a href="/auth/register" className="text-pink-500 font-bold">Cadastre-se</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
