import BackgroundImage from '@/components/ui/background-image';

export default function FullScreenLayout({ children }) {

    return (
        <>
            <BackgroundImage imageUrl='/images/splash-image.jpg' fullScreen={true}/> 
            {children}
        </>
    )
}