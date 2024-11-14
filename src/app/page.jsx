"use client";

import Sidebar from './Components/SideBar/SideBar.jsx';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DataTable from './Components/Table/Dashboard/DashTable.jsx';
import SalesChart from './Components/Graphs/SalesChart.jsx';

const HomePage = () => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-3">
                <div className='formcontainer'>
                    <h2 className="title">Dashboard</h2>
                    <p className="mb-4 text-pink-700">Visualize os indicadores dos agendamentos.</p>
                    <section id="dashboard" className="">
                        <div className='flex'>
                            <div className="ml-8 p-4 bg-white rounded-lg shadow-lg">
                                <h3 className="formlabel">Calendário</h3>
                                <Calendar className="bg-white rounded shadow-md" />
                            </div>
                                <SalesChart />
                        </div>
                        <DataTable />
                    </section>
                </div>
            </main>
        </div>
    );
};

export default HomePage;
