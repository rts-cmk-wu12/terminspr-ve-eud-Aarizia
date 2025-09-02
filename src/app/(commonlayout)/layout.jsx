import './_common-layout.scss';
import SiteFooter from '@/components/ui/site-footer';
import styles from '../page.module.scss';
import SiteHeader from '@/components/ui/headers/site-header';

export default function CommonLayout({ children }) {

    return (
        <div className={`${styles.common_font} common-layout__wrapper`}>
            <SiteHeader />
            {children}
            <SiteFooter />
        </div>
    )
}