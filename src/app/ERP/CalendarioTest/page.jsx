"use client";

import Head from 'next/head';
import Calendar from './Calendar.jsx';

export default function Agender() {
    return (
        <div>
            <Head>
                <title>Sistema de Agenda</title>
                <meta name="description" content="Sistema de Agenda em Next.js do zero" />
            </Head>

            <main>
                <h1>Sistema de Agenda</h1>
                <Calendar />
            </main>
        </div>
    );
}
