import { getPostsMetadata } from "@/src/lib/posts";
import { latestSort } from "@/src/lib/sort";
import { PostPreview } from "../components/PostPreview";

const HomePage = () => {
  const postMetadatas = getPostsMetadata();
  postMetadatas.sort(latestSort);
  const postPreviews = postMetadatas.map((post) => (
    <PostPreview key={post.slug} {...post} />
  ));

  return <div>
    <h1 className="text-2xl font-bold " >Hello friend. 🍎</h1>
    <p>
      Welcome to the cozy palace of DaStoopidGuy 🗿. I'm just your Friendly Neighbourhood NerdyMan. I learned to code on my own,
      starting 4 years ago. I'm still in tutorial hell.
    </p>
    <p><strong>FUN FACT:</strong> I made this website in a day. ( I was sick and stayed at home 😔)</p>
    <p> Also, I hate going to college. Yayy.</p>

    <h2 className="text-xl font-bold">Give me money!!</h2>
    <p>Uh... I meant I'm available for any projects if you're looking for someone like me 🤓</p>
    <p>&gt; I can be contacted by Email (on the top right and in the bottom). Apparently everyone uses this for bizz-ness</p>

    <h2 className="text-2xl font-bold">Posts</h2>
    <div className={`
      mt-2
      mb-4
      grid
      ${postPreviews.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-3`
    }>
      {postPreviews}
    </div>
  </div>;
};

export default HomePage;
