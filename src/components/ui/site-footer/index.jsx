import Link from "next/link";
import { FiHome, FiSearch, FiCalendar } from "react-icons/fi";
import './_site-footer.scss';

export default function SiteFooter() {

    return (
        <footer className="site-footer">
            <nav className="site-footer__menu">
                <Link href='/' className="site-footer__link">
                    <FiHome className="site-footer__icon" />
                </Link>
                <Link href='/soeg' className="site-footer__link">
                    <FiSearch className="site-footer__icon" />
                </Link>
                <Link href='/kalender' className="site-footer__link">
                    <FiCalendar className="site-footer__icon" />
                </Link>
            </nav>
        </footer>
    )
}