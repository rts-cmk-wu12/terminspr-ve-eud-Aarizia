import Link from "next/link";
import { FiHome, FiSearch, FiCalendar, FiLogIn } from "react-icons/fi";
import './_site-footer.scss';
import { cookies } from "next/headers";

export default async function SiteFooter() {

    const cookieStore = await cookies();
    const userRole = cookieStore.get('landrupdans_userRole');
    const PAGE_STATE_NO_USER = 'public';
    const PAGE_STATE_USER = 'default';
    const PAGE_STATE_INSTRUCTOR = 'instructor';
    let pageState = PAGE_STATE_NO_USER;

    if (userRole?.value === 'default') {
        pageState = PAGE_STATE_USER;
    }

    if (userRole?.value === 'instructor') {
        pageState = PAGE_STATE_INSTRUCTOR;
    }
    console.log(pageState);

    return (
        <footer className="site-footer">
            <nav className="site-footer__menu">
                <Link href='/' className="site-footer__link">
                    <FiHome className="site-footer__icon" />
                </Link>
                <Link href='/soeg' className="site-footer__link">
                    <FiSearch className="site-footer__icon" />
                </Link>
                {(pageState === 'default' || pageState === 'instructor') && <Link href='/kalender' className="site-footer__link">
                    <FiCalendar className="site-footer__icon" />
                </Link>}
                {pageState === 'public' && <Link href='/log-ind' className="site-footer__link">
                    <FiLogIn className="site-footer__icon" />
                </Link>}
            </nav>
        </footer>
    )
}