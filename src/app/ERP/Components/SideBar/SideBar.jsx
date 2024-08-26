import React from 'react';
import Link from 'next/link';
import { FaUsers, FaCalendarAlt, FaDollarSign, FaConciergeBell, FaSignOutAlt } from 'react-icons/fa';
import { BiSolidDashboard } from "react-icons/bi";
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className='flex p-2 align-middle bg-pink-50'>
            <div className="bg-pink-300 w-72 h-[calc(100vh-20px)] p-6 rounded-3xl shadow-lg flex flex-col ">
                <div className="flex flex-col h-full">
                    <span className="font-bold text-4xl font-sacramento text-pink-900">Daros Glow Care</span>
                    <div className="flex flex-col gap-4 flex-1 justify-center" name="options">
                        <Link href="/ERP" className={`flex items-center gap-4 text-white text-2xl px-5 py-2 rounded-lg transition ${pathname === '/ERP' ? 'bg-pink-400' : 'hover:bg-pink-400'}`}>
                            <BiSolidDashboard className="text-4xl" />
                            Dashboard
                        </Link>
                        <Link href="/ERP/Clientes" className={`flex items-center gap-4 text-white text-2xl px-5 py-2 rounded-lg transition ${pathname === '/ERP/Clientes' ? 'bg-pink-400' : 'hover:bg-pink-400'}`}>
                            <FaUsers className="text-4xl" />
                            Clientes
                        </Link>
                        <Link href="/ERP/Agendamento" className={`flex items-center gap-4 text-white text-2xl px-5 py-2 rounded-lg transition ${pathname === '/ERP/Agendamento' ? 'bg-pink-400' : 'hover:bg-pink-400'}`}>
                            <FaCalendarAlt className="text-4xl" />
                            Agenda
                        </Link>
                        <Link href="/ERP/Financeiro" className={`flex items-center gap-4 text-white text-2xl px-5 py-2 rounded-lg transition ${pathname === '/ERP/Financeiro' ? 'bg-pink-400' : 'hover:bg-pink-400'}`}>
                            <FaDollarSign className="text-4xl" />
                            Financeiro
                        </Link>
                        <Link href="/ERP/Servicos" className={`flex items-center gap-4 text-white text-2xl px-5 py-2 rounded-lg transition ${pathname === '/ERP/Servicos' ? 'bg-pink-400' : 'hover:bg-pink-400'}`}>
                            <FaConciergeBell className="text-4xl" />
                            Serviços
                        </Link>
                    </div>
                    <div className="mt-auto flex flex-col items-center justify-center gap-10">
                        <Link rel="stylesheet" href="/">
                        <button className="flex items-center gap-4 text-1xl text-white bg-red-600 px-8 py-2 rounded-lg">
                            <FaSignOutAlt className="text-2xl" />
                            Logout
                        </button>
                        </Link>
                        <div className="text-1xl text-white text-center">
                            © 2024 JAGB ERP
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
