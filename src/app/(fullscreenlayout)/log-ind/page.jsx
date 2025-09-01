import LoginForm from "@/components/ui/login-form";
import OverlayCanvas from "@/components/ui/overlay-canvas";
import './_login-page.scss';

export default function logIndPage() {

    return (
        <>
        <OverlayCanvas />
            <div className="login">
                <div className="login__text">
                    <h1 className="login__heading">Log ind</h1>
                    <LoginForm />
                </div>
            </div>
        </>
    )
}