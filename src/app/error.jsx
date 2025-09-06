'use client';
import { useRouter } from 'next/navigation';
import './_not-found.scss';
import styles from './page.module.scss';

import { useEffect } from "react"

export default function Error({ error, reset }) {

    const router = useRouter();

    useEffect(() => {
        // fejlen logges til consollen:
        console.error(error);
    }, [error])

    return (
        <section className={`${styles.common_font} error`}>
            <h2>Ups, noget gik galt</h2>
            <button className={`${styles.button_light} error__button`} onClick={() => reset()}>Prøv igen</button>
            <button className={`${styles.button_light} error__button`} onClick={() => router.push('/')}>Tilbage til forsiden</button>
        </section>
    )
}