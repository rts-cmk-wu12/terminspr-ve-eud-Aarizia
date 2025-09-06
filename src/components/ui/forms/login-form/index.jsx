'use client';

import './_login-form.scss';
import styles from '../../../../app/page.module.scss';
import { useActionState, useEffect } from 'react';
import loginFormAction from '@/actions/login-form-action';
import Link from 'next/link';

export default function LoginForm() {

    const [formState, formAction, isPending] = useActionState(loginFormAction);

    useEffect(() => {

        if (!formState) return 

        console.log(formState);

    }, [formState]);

    return isPending ? (
        <p className='form-loading-text'>Indlæser...</p>
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
            <p className='form__error-message-general'>{formState?.errors}</p>
            <button className={`${styles.button} form__button`} type="submit">Log ind</button>
            <p className="login__create-user">Har du ikke en bruger? Opret dig <Link className="login__create-user-link" href='/opret-bruger'>her</Link></p>
        </form>
    );
}