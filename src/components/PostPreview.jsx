import Link from "next/link";

export function PostPreview(props) {
    return (
        <div key={props.slug}>
            <Link href={`/posts/${props.slug}`}>
                <h2>{props.title}</h2>
            </Link>
            <p>{props.description}</p>
            <p>{props.date}</p>
        </div>
    );

}