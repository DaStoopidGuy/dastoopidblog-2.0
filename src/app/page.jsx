import { getPostsMetadata } from "@/src/lib/posts"
import { PostPreview } from "../components/PostPreview";

const latestSort = (a, b) => {
    const dateA = a.date;
    const dateB = b.date;

    if (dateA < dateB) return 1;
    else if (dateA > dateB) return -1;
    return 0;
};

const HomePage = () => {
    const postMetadatas = getPostsMetadata();
    postMetadatas.sort(latestSort);
    const postPreviews = postMetadatas.map((post) => (
        <PostPreview key={post.slug} {...post} />
    ));

    return <div>
        <h1 className="text-2xl font-bold " >Hello friend. 🍎</h1>
        <p>
            Wecome to the cozy palace of DaStoopidGuy 🗿. I'm just your Friendly Neighbourhood NerdyMan. I learnt to code on my own,
            starting 4 years ago. I'm still in tutorial hell.
        </p>
        <p><strong>FUN FACT:</strong> I made this website in a day. ( I was sick and stayed at home 😔)</p>
        <p> Also, I hate going to college. Yayy.</p>

        <h2 className="text-xl font-bold">Give me money!!</h2>
        <p>Uh... I meant I'm available for any projects if you're looking for someone like me 🤓</p>
        <p>&gt; I can be contacted by Email (on the top right and in the bottom). Apparently everyone uses this for bizz-ness</p>

        <h2 className="text-2xl font-bold">Posts</h2>
        <div className="mt-2 mb-4 grid grid-cols-1 gap-3">
            {postPreviews}
        </div>
    </div>;
};

export default HomePage;