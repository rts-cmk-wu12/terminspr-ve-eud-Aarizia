import OverlayCanvas from "@/components/ui/overlay-canvas";
import './_login-page.scss';
import styles from '../../page.module.scss';
import LoginForm from "@/components/ui/forms/login-form";

export const metadata = {
  title: 'Log ind'
}

export default function logIndPage() {

    return (
        <>
        <OverlayCanvas />
            <div className={`${styles.common_font} login`}>
                <div className="login__text">
                    <h1 className="login__heading">Log ind</h1>
                    <LoginForm />
                </div>
            </div>
        </>
    )
}