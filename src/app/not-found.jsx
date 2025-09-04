import Link from "next/link";
import './_not-found.scss';

export default function NotFound() {

    return (
        <section className="not-found">
            <h2>Beklager</h2>
            <p>Siden, du leder efter, findes ikke</p>
            <Link href={'/'}>Tilbage til forsiden</Link>
        </section>
    )
}