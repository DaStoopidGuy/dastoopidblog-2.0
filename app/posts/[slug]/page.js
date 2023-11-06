import fs from "fs";
import Markdown from "markdown-to-jsx";

function getPostContent(slug) {
    const folder = "posts/";
    const file = `${folder}${slug}.md`;
    const content = fs.readFileSync(file, "utf-8");
    return content;
}

export default function (props) {
    const slug = props.params.slug;
    const content = getPostContent(slug);
    return (
        <>
            <h1>{slug}! 📰</h1>
            <Markdown>{content}</Markdown>
        </>
    );
};