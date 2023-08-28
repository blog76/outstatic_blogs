import { getDocuments } from "outstatic/server";
import { useRouter } from "next/router";
import CardView from "@/components/UI/CardView";

const Index = ({ posts, len }) => {
  const router = useRouter();
  const { n } = router.query;
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
          <h1>AI Voice</h1>
        </header>
        {/* <h1>Welcome to my Blog!</h1> */}
        <div className="row mb-20">
          {(n ? filteredBlogs : posts).map((post) => {
            return (
              <CardView post={post} key={post.publishedAt} redirect={"/category/aivoices/" + post.slug} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const posts = getDocuments("aivoices", [
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
