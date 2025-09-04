import OverlayCanvas from '@/components/ui/overlay-canvas';
import './_create-user-page.scss';
import styles from '../../page.module.scss';
import CreateUserForm from '@/components/ui/forms/create-user-form';

export default function opretBrugerPage() {

    return (
        <>
            <OverlayCanvas />
            <div className={`${styles.common_font} create-user`}>
                <div className="create-user__text">
                    <h1 className="create-user__heading">Opret bruger</h1>
                    <CreateUserForm />
                </div>
            </div>
        </>
    )
}