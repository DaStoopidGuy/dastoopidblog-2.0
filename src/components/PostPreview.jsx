import Link from "next/link";

export function PostPreview(props) {
    return (
        <Link key={props.slug} href={`/posts/${props.slug}`}
            className="p-2 block border-2 border-dashed border-primary rounded-lg
            transition-all duration-200 hover:shadow-custom"
        >
            <h2 className="text-base font-bold">{props.title}</h2>
            <p className="text-xs italic">{props.date}</p>
            <p className="text-base">{props.description}</p>
        </Link>
    );

}