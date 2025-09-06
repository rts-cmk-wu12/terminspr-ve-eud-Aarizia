import Link from "next/link";
import './_not-found.scss';
import styles from './page.module.scss';

export default function NotFound() {

    return (
        <section className={`${styles.common_font} not-found`}>
            <h2 className="not-found__heading">Beklager</h2>
            <p>Siden, du leder efter, findes ikke</p>
            <Link className="not-found__link" href={'/'}>Tilbage til forsiden</Link>
        </section>
    )
}