'use client';

import './_create-user-form.scss';
import styles from '../../../../app/page.module.scss';
import { useActionState, useEffect } from 'react';
import createUserFormAction from '@/actions/create-user-form-action';

export default function CreateUserForm() {

    const [formState, formAction, isPending] = useActionState(createUserFormAction);

    useEffect(() => {

        if (!formState) return;

        console.log(formState);

    }, [formState]);

    return isPending ? (
        <p className='create-user-form-loading-text'>Indlæser...</p>
    ) : (
            <form action={formAction} className="create-user-form">
                <div>
                    <label className="create-user-form__label">
                        <input className="create-user-form__input" type="text" placeholder="brugernavn" name="username" />
                        <p className="create-user-form__error-message">{formState?.properties?.username?.errors}</p>
                    </label>
                </div>
                <div>
                    <label className="create-user-form__label">
                        <input className="create-user-form__input" type="password" placeholder="adgangskode" name='passwordFirst' />
                        <p className="create-user-form__error-message">{formState?.properties?.passwordFirst?.errors}</p>
                    </label>
                </div>
                <div>
                    <label className="create-user-form__label">
                        <input className="create-user-form__input" type="password" placeholder="gentag adgangskode" name='passwordSecond' />
                        <p className="create-user-form__error-message">{formState?.properties?.passwordSecond?.errors}</p>
                    </label>
                </div>
                <div>
                    <label className="create-user-form__label">
                        <input className="create-user-form__input" type="text" placeholder="fornavn" name="firstname" />
                        <p className="create-user-form__error-message">{formState?.properties?.firstname?.errors}</p>
                    </label>
                </div>
                <div>
                    <label className="create-user-form__label">
                        <input className="create-user-form__input" type="text" placeholder="efternavn" name='lastname' />
                        <p className="create-user-form__error-message">{formState?.properties?.lastname?.errors}</p>
                    </label>
                </div>
                <div>
                    <label className="create-user-form__label">
                        <input className="create-user-form__input" type="number" placeholder="alder" name='age' />
                        <p className="create-user-form__error-message">{formState?.properties?.age?.errors}</p>
                    </label>
                </div>
                <input hidden className="create-user-form__input" type="text" name='role' value='default' readOnly />
                <button className={`${styles.button} create-user-form__button`} type="submit">Opret</button>
                <p className='create-user-form__error-message-general'>{formState?.errors}</p>
            </form>
    )
}