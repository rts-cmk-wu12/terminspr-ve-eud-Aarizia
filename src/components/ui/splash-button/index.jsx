'use client';

import { useRouter } from "next/navigation";
import './_splash-button.scss';

export default function SplashButton() {

    const router = useRouter();

    function clickHandler() {
        router.push('/');
    }

    return (
        <button className="splash-button" type="button" onClick={clickHandler}>Kom i gang</button>
    )
}