import './_velkommen-page.scss';
import styles from '../../page.module.scss';
import SplashButton from '@/components/ui/splash-button';

export const metadata = {
  title: 'Velkommen'
}

export default function velkommenPage() {

    return (
        <div className='welcome'>
            <div className='welcome__text'>
                <h1 className={`${styles.welcome__heading} welcome__heading welcome__heading--stroke-bold`}>Landrup<span className={`${styles.welcome__heading__brand} welcome__heading--accent stroke-thin`}>dans</span></h1>
                <div className='welcome__colored-line'></div>
            </div>
            <div className={`${styles.common_font} welcome__button-container`}>
                <SplashButton />
            </div>
        </div>
    )
}