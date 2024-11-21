import React from 'react';
import Link from 'next/link';
import { FaUsers, FaCalendarAlt, FaDollarSign, FaConciergeBell, FaSignOutAlt } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from '../../assets/LOGO.png';

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className='p-2 align-middle'>
            <div className="bg-rose-300 w-50 h-[calc(100vh-20px)] p-4 rounded-3xl shadow-lg flex">
                <div className="flex flex-col h-full">
                    <Image src={logo} alt="Logo da empresa" width={200} height={100} className="rounded-full p-2" style={{ backgroundColor: '#f55381' }} />
                    <div className="flex flex-col gap-4 flex-1 justify-center" name="options">
                        <Link href="/ERP/Agendamento" className={`menu-item ${pathname === '/ERP/Agendamento' ? 'active' : ''}`}>
                            <FaCalendarAlt className="icon" />
                            Agenda
                        </Link>
                        <Link href="/ERP/Clientes" className={`menu-item ${pathname === '/ERP/Clientes' ? 'active' : ''}`}>
                            <FaUsers className="icon" />
                            Clientes
                        </Link>
                        <Link href="/ERP/Servicos" className={`menu-item ${pathname === '/ERP/Servicos' ? 'active' : ''}`}>
                            <FaConciergeBell className="icon" />
                            Serviços
                        </Link>
                        <Link href="/ERP/Financeiro" className={`menu-item ${pathname === '/ERP/Financeiro' ? 'active' : ''}`}>
                            <FaDollarSign className="icon" />
                            Financeiro
                        </Link>
                    </div>
                    <div className="mt-auto flex flex-col items-center justify-center gap-10">
                        <Link rel="stylesheet" href="/auth/login">
                            <button className="Action">
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
