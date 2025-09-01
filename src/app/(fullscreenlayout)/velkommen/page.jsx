import Button from '@/components/ui/button';
import './_velkommen-page.scss';

export default function velkommenPage() {

    return (
        <div className='welcome'>
            <div className='welcome__text'>
                <h1 className='welcome__heading'>Landrup<span className='welcome__heading--accent'>dans</span></h1>
                <div className='welcome__colored-line'></div>
            </div>
            <div className='welcome__button-container'>
                <Button title='Kom i gang' className='welcome__button' />
            </div>
        </div>
    )
}