import Link from "next/link";

export default function NotFound() {

    return (
        <>
            <h1>Beklager</h1>
            <p>Aktiviteten, du leder efter, findes ikke</p>
            <Link href={'/'}>Tilbage til forsiden</Link>
        </>
    )
}