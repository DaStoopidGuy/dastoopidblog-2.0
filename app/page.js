import fs from "fs";
import Link from "next/link";

function getPostSlugs() {
    const folder = "posts/";
    const files = fs.readdirSync(folder);
    const markdownPosts = files.filter((file) => file.endsWith(".md"));
    const slugs = markdownPosts.map((file) => file.replace(".md", ""));
    return slugs;
}

const HomePage = () => {
    const postSlugs = getPostSlugs();
    const postPreviews = postSlugs.map((slug) => (
        <div key={slug}>
            <Link href={`/posts/${slug}`}>
                <h2>{slug}</h2>
            </Link>
        </div>
    ));

    return <div>
        <h1>Hello from seb. 🍎</h1>
        {postPreviews}
    </div>;
};

export default HomePage;