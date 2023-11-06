import Link from "next/link";
import { getPostsMetadata } from "@/src/lib/posts"
import { PostPreview } from "../components/PostPreview";

const HomePage = () => {
    const postMetadatas = getPostsMetadata();
    const postPreviews = postMetadatas.map((post) => (
        <PostPreview key={post.slug} {...post} />
    ));

    return <div>
        <h1 className="text-3xl font-bold underline" >Hello from seb. 🍎</h1>
        {postPreviews}
    </div>;
};

export default HomePage;