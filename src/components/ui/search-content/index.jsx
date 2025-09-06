'use client';

import { FiSearch } from "react-icons/fi";
import './_search-content.scss';
import { useActionState, useEffect, useState } from "react";
import searchFormAction from "@/actions/search-form-action";
import ActivityCardBig from "../activity-cards/activity-card-big";

export default function SearchContent({ activitiesData }) {

    const [formState, formAction, isPending] = useActionState(searchFormAction);

/*     useEffect(() => {

        if (!formState) return;

        console.log('formState: ', formState);

    }, [formState]); */

    return (
        <>
            <form className="search-form" action={formAction}>
                <div className="search-form__form-group">
                    <label>
                    </label>
                    <input type="text" className="search-form__input" name="query" />
                </div>
                <input hidden type="text" name="activitiesData" value={activitiesData} readOnly />
                <button className="search-form__button" type="submit"><FiSearch /></button>
            </form>
            <p className="search-form__error-message">{formState?.errors}</p>
            {formState?.success && <ul>
                {formState?.results.map(result => {
                    return (
                        <li key={result.id}>
                            <ActivityCardBig data={result} />
                        </li>
                    )
                })}
            </ul>}
        </>
    )
}