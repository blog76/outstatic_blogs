import { getCollections, getDocuments } from "outstatic/server";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const Index = ({ allBlogs, len }) => {
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
  }

  return (
    <>
      <div className="">
        {s ? (
          <header className="h-55 mb-6 text-black font-[600] text-2xl">
            <h1>{`Search Results for: ${s} `}</h1>
          </header>
        ) : (
          <header className="h-55 mb-10 text-black font-[600] text-4xl">
            <h1>Home Page</h1>
          </header>
        )}
        <div className="row">
          {filteredBlogs?.map((post) => {
            if (post.title.length > 100) {
              post.title = post.title.slice(0, 100) + "...";
            }
            if (post.description.length > 200) {
              post.description = post.description.slice(0, 200) + "...";
            }
            const publishedDate = new Date(post.publishedAt);
            const day = publishedDate.getDate();
            const month = publishedDate.toLocaleString("default", {
              month: "long",
            });
            const year = publishedDate.getFullYear();
            const imageUrl = post.coverImage;
            return (
              <div
                className="sm:grid grid-cols-12 gap-4 mt-5 rounded-xl w-full items-center"
                key={post.publishedAt}
              >
                <div className="col-span-12 sm:col-span-5">
                  <a className="w-full">
                    <Image
                      width={325}
                      height={200}
                      className="w-full h-[200px] object-cover rounded-md"
                      src={imageUrl}
                      alt="bg"
                    />
                  </a>
                </div>
                <div className="col-span-12 sm:col-span-7">
                  <div className="py-5 px-0 sm:px-5">
                    <header className="block">
                      <h2 className="mb-5 text-[#2f4468] text-[20px] leading-normal hover:text-[#2872fa] cursor-pointer font-bold ">
                        <a>
                          <h2>{post.title}</h2>
                        </a>
                      </h2>
                    </header>
                    <p className="mb-5 text-md font-[400] text-[#3A4F66]">
                      {post.description}
                    </p>
                    <p className="mb-5">
                      <button
                        onClick={() =>
                          router.push(
                            `/category/${post.collection}/${post.slug}`
                          )
                        }
                        className="text-white bg-[#2872fa] hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-base rounded px-5 py-2 flex"
                      >
                        Read more
                        <svg
                          width="20px"
                          height="17px"
                          className="fill-white self-center ml-2"
                          viewBox="0 0 32 32"
                        >
                          <path d="M 21.1875 9.28125 L 19.78125 10.71875 L 24.0625 15 L 4 15 L 4 17 L 24.0625 17 L 19.78125 21.28125 L 21.1875 22.71875 L 27.90625 16 Z "></path>
                        </svg>
                      </button>
                    </p>
                    <div className="text-[#878787] mt-2 text-base">
                      <span>
                        <time>{`${day} ${month},${year}`}</time>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {filteredBlogs.length < 1 && s && (
          <header className="h-55 mb-5 p-12 bg-white font-[600] text-4xl drop-shadow-lg ">
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
    props: { allBlogs: allBlogs, len: len },
  };
}
