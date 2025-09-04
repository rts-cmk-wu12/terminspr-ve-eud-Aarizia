import Link from "next/link";
import Image from "next/image";
import './_activity-card-big.scss';

export default function ActivityCardBig(data) {

    //console.log(data.data)

    return (
        <Link href={`/aktivitet/${data?.data?.id}`}>
            <article className="activity-card-big">
                <Image 
                    src={data?.data?.asset?.url}
                    height={742}
                    width={768}
                    alt="background-image"
                    className="activity-card-big__image"
                />
                <section className="activity-card-big__text">
                    <h2>{data?.data?.name}</h2>
                    <p>{data?.data?.minAge} - {data?.data?.maxAge} år</p>
                </section>
            </article>
        </Link>
    )
}