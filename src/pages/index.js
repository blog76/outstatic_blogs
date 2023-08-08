import { getCollections, getDocuments } from "outstatic/server";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const Index = ({ allBlogs }) => {
  const router = useRouter();
  const { s } = router.query;

  let filteredBlogs = [];
  if (s && allBlogs && allBlogs.length > 0) {
    filteredBlogs = allBlogs.filter((post) =>
      post.title.toLowerCase().includes(s.toLowerCase())
    );
  }
  return (
    <>
      <div className="container">
        <header className="h-55 mb-5 p-12 bg-white text-[#18a7c7] font-[600] text-4xl drop-shadow-lg ">
          <h1>{s ? `Search Results for: ${s}` : "Home Page"}</h1>
        </header>
        {/* <h1>Welcome to my Blog!</h1> */}
        <div className="row">
          {(s ? filteredBlogs : allBlogs).map((post) => {
            if (post.title.length > 100) {
              post.title = post.title.slice(0, 100) + "...";
            }
            if (post.description.length > 200) {
              post.description = post.description.slice(0, 200) + "...";
            }
            const publishedDate = new Date(post.publishedAt);
            const day = publishedDate.getDate();
            const month = publishedDate.toLocaleString("default", {
              month: "short",
            });
            const year = publishedDate.getFullYear();

            const imageUrl = post.coverImage;

            return (
              <article
                key={post.publishedAt}
                className="mb-5 block bg-white drop-shadow-lg"
              >
                <div className="p-10">
                  <header className="block">
                    <h2 className="mb-0 text-[#2f4468] font-[650] text-3xl">
                      <a>
                        <h2>{post.title}</h2>
                      </a>
                    </h2>
                    <div className="text-[#878787] mt-2 text-base">
                      <span>
                        <time>{`${day} ${month} ${year}`}</time>
                      </span>
                    </div>
                  </header>
                  <div className="lg:flex">
                    <div className="mt-5 w-30 flex justify-center items-center">
                      <a>
                        <Image
                          width={325}
                          height={200}
                          className="w-[325px] h-[200px] object-cover"
                          src={imageUrl}
                          alt="bg"
                        />
                      </a>
                    </div>
                    <div className="mt-5 lg:mx-5 flex-1 block md:mx-0">
                      <p className="mb-10 text-lg font-[500]">
                        {post.description}
                      </p>
                      <p className="mb-0">
                        <Link
                          href={`/category/${post.collection}/${post.slug}`}
                          className="text-white bg-[#242226] hover:bg-stone-700 text-base inline-block px-5 py-3"
                        >
                          Read more
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        {filteredBlogs.length < 1 && s && (
          <header className="h-55 mb-5 p-12 bg-white text-[#18a7c7] font-[600] text-4xl drop-shadow-lg ">
            <h1>Nothing Found</h1>
            <p className="h-4 mb-5 p-4 text-black text-lg">
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
  let allBlogs = [];
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

  return {
    props: { allBlogs },
  };
}
