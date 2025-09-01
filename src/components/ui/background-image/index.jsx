import Image from "next/image";
import './_background-image.scss';

export default function BackgroundImage({ imageUrl, aspectRatio = 'initial', height: height, }) {

    return (
        imageUrl && <Image
            src={imageUrl}
            style={{aspectRatio: aspectRatio, height: height}}
            width={500}
            height={200}
            alt='Landrup Dans'
            className='background-image__full-screen'
        />
    )
}