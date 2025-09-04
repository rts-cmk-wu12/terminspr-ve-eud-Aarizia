import Link from 'next/link';
import './_kvittering-page.scss';
import { RxCross1 } from "react-icons/rx";
import { MdDone } from "react-icons/md";

export const metadata = {
  title: 'Kvittering'
}

export default async function kvitteringPage({params}) {

    const {action} = await params

    return action ? (
        <main className="kvittering">
        {action === 'tilmelding' &&
            <>
                <div className='kvittering__flex-container'>
                    <MdDone className='kvittering__icon' />
                    <p className="kvittering__text">Du er nu tilmeldt aktiviteten</p>
                </div>
                <Link href='/' className='kvittering__link'>Se flere aktiviteter</Link>
            </>}
            {action === 'afmelding' &&
            <>
                <div className='kvittering__flex-container'>
                    <RxCross1 className='kvittering__icon' />
                    <p className="kvittering__text">Du er nu afmeldt aktiviteten</p>
                </div>
                <Link href='/' className='kvittering__link'>Se alle aktiviteter</Link>
            </>}
        </main>
    ) : (
        <main>
            <p>Indlæser...</p>
        </main>
    )
}