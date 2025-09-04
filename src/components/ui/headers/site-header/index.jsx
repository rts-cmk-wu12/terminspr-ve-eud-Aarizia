'use client';

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SiteHeader() {

    const pathname = usePathname();
    const [title, setTitle] = useState(null);

    useEffect(() => {

        switch (true) {
            case pathname === '/':
                setTitle('Aktiviteter');
                break;

            case pathname === '/soeg':
                setTitle('Søg');
                break;

            case pathname === '/kalender':
                setTitle('Kalender');
                break;

            case pathname === '/kalender/hold-oversigt':
                setTitle('Hold oversigt');
                break;

            case /^\/kvittering\/[a-zA-Z0-9]+$/.test(pathname):
                setTitle('Kvittering')
                break; 

        }
    }, [pathname]);

    return (
        <header>
            <h1>{title}</h1>
        </header>
    )
}