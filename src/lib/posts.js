import fs from "fs";
import matter from "gray-matter";

export function getPostsMetadata() {
    const folder = "posts/";
    const files = fs.readdirSync(folder);
    const markdownFiles = files.filter((file) => file.endsWith(".md"));

    // get gray-matter data from each file
    const posts = markdownFiles.map((file) => {
        const fileContent = fs.readFileSync(`${folder}${file}`, "utf8");
        const matterResult = matter(fileContent);
        // return a post object
        return {
            title: matterResult.data.title,
            description: matterResult.data.description,
            date: matterResult.data.date,
            slug: file.replace(".md", ""),
        };
    });
    return posts;
}

export function getPost(slug) {
    const folder = "posts/";
    const file = `${folder}${slug}.md`;
    const content = fs.readFileSync(file, "utf-8");
    const matterResult = matter(content);
    return matterResult;
}