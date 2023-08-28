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
  if (typeof window !== "undefined") {
    localStorage.setItem("len", JSON.stringify(len));
  }
  return (
    <>
      <div className="">
        <header className="bg-white p-5 rounded-xl mb-5 text-black font-[600] text-3xl">
          <h1>AI Transcriber</h1>
        </header>
        {/* <h1>Welcome to my Blog!</h1> */}
        <div className="row">
          {(n ? filteredBlogs : posts).map((post) => {
            return (
              <CardView
                post={post}
                key={post.publishedAt}
                redirect={"/category/transcribers/" + post.slug}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const posts = getDocuments("transcribers", [
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
