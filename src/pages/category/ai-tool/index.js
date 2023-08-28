import { getDocuments } from "outstatic/server";
import CardView from "@/components/UI/CardView";

const Index = ({ posts, len }) => {
  let n;
  if (typeof window !== "undefined") {
    localStorage.setItem("len", JSON.stringify(len));
    n = localStorage.getItem("n");
  }
  let filteredBlogs = [];
  if (n) {
    const startIndex = n ? (n - 1) * 10 : 0;
    const endIndex = startIndex + 10;
    filteredBlogs = posts.slice(startIndex, endIndex);
  }

  return (
    <div className="">
      <header className="bg-white p-5 rounded-xl mb-5 text-black font-[600] text-3xl">
        <h1>AI Tool</h1>
      </header>
      {/* <h1>Welcome to my Blog!</h1> */}
      <div className="row mb-20">
        {(n ? filteredBlogs : posts).map((post) => {
          return (
            <CardView
              post={post}
              key={post.publishedAt}
              redirect={"/category/posts/" + post.slug}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Index;

export const getStaticProps = async () => {
  const posts = getDocuments("posts", [
    "title",
    "publishedAt",
    "slug",
    "coverImage",
    "description",
    "author",
  ]);

  return {
    props: { posts, len: posts.length || 0 },
  };
};
