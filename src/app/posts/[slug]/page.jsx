import Markdown from "markdown-to-jsx";
import { getPost, getPostsMetadata } from "@/src/lib/posts";

export async function generateStaticParams() {
    const posts = getPostsMetadata();

    return posts.map((post) => {
        return { slug: post.slug, };
    });
}

export function generateMetadata(props) {
    const slug = props.params.slug;
    const post = getPost(slug);
    return {
        title: `${post.data.title} - DaStoopidGuy`,
    }
}

export default function (props) {
    const slug = props.params.slug;
    const post = getPost(slug);

    return (
        <>
            <h1 className="text-3xl font-bold">{post.data.title}</h1>
            <article className="prose prose-base prose-invert text-primary prose-headings:text-primary marker:text-primary max-w-none">
                <Markdown>{post.content}</Markdown>
            </article>
        </>
    );
};
