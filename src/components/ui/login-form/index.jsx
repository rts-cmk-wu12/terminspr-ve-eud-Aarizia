'use client';

import Button from "../button";
import './_login-form.scss';

export default function LoginForm() {

    return (
        <form className="form">
            <div>
                <label className="form__label">
                    <input className="form__input" type="text" placeholder="brugernavn" />
                    <p className="form__error-message"></p>
                </label>
            </div>
            <div>
                <label className="form__label">
                    <input className="form__input" type="password" placeholder="adgangskode" />
                    <p className="form__error-message"></p>
                </label>
            </div>
            <div className="form__button-container">
                <Button title='Log ind' type='submit' />
            </div>
        </form>
    )
}