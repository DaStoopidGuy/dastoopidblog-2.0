import Markdown from "markdown-to-jsx";
import { getPost, getPostsMetadata } from "@/src/lib/posts";

export async function generateStaticParams() {
    const posts = getPostsMetadata();

    return posts.map((post) => {
        return { slug: post.slug, };
    });
}

export default function (props) {
    const slug = props.params.slug;
    const post = getPost(slug);
    return (
        <>
            <h1>{post.data.title}</h1>
            <Markdown>{post.content}</Markdown>
        </>
    );
};
