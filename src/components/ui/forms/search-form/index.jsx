import { FiSearch } from "react-icons/fi";
import './_search-form.scss';

export default function SearchForm() {

    return (
        <form className="search-form">
            <div className="search-form__form-group">
                <label>
                    <input type="text" className="search-form__input" />
                </label>
            </div>
            <button className="search-form__button" type="submit"><FiSearch /></button>
            <p className="search-form__error-message"></p>
        </form>
    )
}