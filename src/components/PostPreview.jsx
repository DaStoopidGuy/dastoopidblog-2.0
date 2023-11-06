import Link from "next/link";

export function PostPreview(props) {
    return (
        <Link key={props.slug} href={`/posts/${props.slug}`}
            className="p-2 my-3 block border-2 border-dashed border-primary rounded-lg
            transition-all duration-200 hover:shadow-custom"
        >
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <p>{props.date}</p>
        </Link>
    );

}