import { getCollections, getDocuments } from "outstatic/server";
import { useRouter } from "next/router";
import CardView from "@/components/UI/CardView";

const Index = ({ allBlogs, len, latest }) => {
  const router = useRouter();
  const { s, n } = router.query;
  let filteredBlogs = [];
  if (s && allBlogs && allBlogs.length > 0) {
    filteredBlogs = allBlogs.filter((post) =>
      post.title.toLowerCase().includes(s.toLowerCase())
    );
  } else {
    const startIndex = n ? (n - 1) * 10 : 0;
    const endIndex = startIndex + 10;
    filteredBlogs = allBlogs.slice(startIndex, endIndex);
  }
  if (typeof window !== "undefined") {
    localStorage.setItem("len", JSON.stringify(len));
    localStorage.setItem("latest", JSON.stringify(latest));
  }
  return (
    <>
      <div className="">
        {s ? (
          <header className="h-55 mb-6 text-black font-[600] text-2xl">
            <h1>{`Search Results for: ${s} `}</h1>
          </header>
        ) : (
          <header className="h-55 mb-10 text-black font-[600] text-3xl">
            <h1>Home Page</h1>
          </header>
        )}
        <div className="row mb-10">
          {filteredBlogs?.map((post) => {
            return (
              <CardView post={post} key={post.publishedAt} redirect={`/category/${post.collection}/${post.slug}`} />
            );
          })}
        </div>
        {filteredBlogs.length < 1 && s && (
          <header className="h-55 mb-5 p-12 bg-white font-[600] text-3xl drop-shadow-lg ">
            <h1>Nothing Found</h1>
            <p className="mt-5 text-black text-lg">
              Sorry, but nothing matched your search terms. Please try again
              with some different keywords.
            </p>
          </header>
        )}
      </div>
    </>
  );
};

export default Index;

export async function getStaticProps() {
  const collection = getCollections();
  const latest = getDocuments("latests", [
    "title",
    "slug",
    "coverImage",
    "description",
  ]);

  let allBlogs = [],
    len = 0;
  (collection || []).map((i) => {
    let blogData = getDocuments(i, [
      "title",
      "publishedAt",
      "slug",
      "coverImage",
      "description",
      "content",
      "author",
    ]);
    const blogWithColletion = blogData.map((blg) => ({
      ...blg,
      collection: i,
    }));
    allBlogs = [...allBlogs, ...blogWithColletion];
  });

  allBlogs.sort(function (a, b) {
    return a.publishedAt.localeCompare(b.publishedAt);
  });
  len = allBlogs.length;

  return {
    props: { allBlogs: allBlogs, len: len, latest: latest },
  };
}
