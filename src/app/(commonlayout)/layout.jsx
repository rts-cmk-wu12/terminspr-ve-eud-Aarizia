import SiteHeader from '@/components/ui/site-header';
import './_common-layout.scss';
import SiteFooter from '@/components/ui/site-footer';

export default function CommonLayout({ children }) {

    return (
        <div className="common-layout__wrapper">
            <SiteHeader />
            {children}
            <SiteFooter />
        </div>
    )
}