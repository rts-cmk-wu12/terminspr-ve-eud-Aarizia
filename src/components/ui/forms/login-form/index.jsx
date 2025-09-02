'use client';

import './_login-form.scss';
import styles from '../../../../app/page.module.scss';
import { useActionState, useEffect } from 'react';
import loginFormAction from '@/actions/login-form-action';

export default function LoginForm() {

    const [formState, formAction, isPending] = useActionState(loginFormAction);

    useEffect(() => {

        if (!formState) return 

        console.log(formState);

    }, [formState]);

    return isPending ? (
        <p>Indlæser...</p>
    ) : (
        <form className="form" action={formAction}>
            <div>
                <label className="form__label">
                    <input className="form__input" type="text" name='username' placeholder="brugernavn" />
                    <p className="form__error-message">{formState?.properties?.username?.errors}</p>
                </label>
            </div>
            <div>
                <label className="form__label">
                    <input className="form__input" type="password" name='password' placeholder="adgangskode" />
                    <p className="form__error-message">{formState?.properties?.password?.errors}</p>
                </label>
            </div>
            <p>{formState?.errors}</p>
            <button className={`${styles.button} form__button`} type="submit">Log ind</button>
        </form>
    );
}