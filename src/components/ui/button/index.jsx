'use client';

import './_button.scss';

export default function Button({ title, onClick = '', active = true, type='button' }) {

    return (
        <button className="button" type={type}>{title}</button>
    )
}