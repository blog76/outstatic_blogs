import { getCollections, getDocuments } from "outstatic/server";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const Index = ({ allBlogs, len }) => {
  const router = useRouter();
  const { s, n } = router.query;
  let filteredBlogs = [];
  if (s && allBlogs && allBlogs.length > 0) {
    filteredBlogs = allBlogs.filter((post) =>
      post.title.toLowerCase().includes(s.toLowerCase())
    );
  }
  if (typeof window !== "undefined") {
    localStorage.setItem("len", JSON.stringify(len));
  }
  return (
    <>
      <div className="container">
        <header className="h-55 mb-5 p-12 bg-white text-black font-[600] text-4xl ">
          <h1>{s ? `Search Results for: ${s} ` : "Home Page"}</h1>
        </header>
        <div className="row">
          {(s ? filteredBlogs : allBlogs)?.map((post) => {
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

            return (
              <article
                key={post.publishedAt}
                className="mb-5 block bg-white border border-gray-300 rounded-md"
              >
                <div className="p-2.5 ">
                  <div className="pl-4 ">
                    <header className="block">
                      <h2 className="mb-5 text-[#2f4468] text-[20px] leading-normal hover:text-[#2872fa] font-bold capitalize">
                        <a>
                          <h2>{post.title}</h2>
                        </a>
                      </h2>
                    </header>
                    <p className="mb-5 text-[16px] leading-7 font-[400] text-[#3A4F66] break-words">
                      {post.description}
                    </p>
                    <p className="mb-5">
                      <button className="text-white bg-[#2872fa] hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-base rounded-sm px-5 py-3 flex">
                        <Link
                          href={`/category/${post.collection}/${post.slug}`}
                        >
                          Read more
                        </Link>
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
                    <div className="text-[#3A4F66] mt-2 uppercase">
                      <span className="flex text-[12px] ">
                        <svg
                          width="13"
                          height="13"
                          className="fill-[#3A4F66] self-center mr-2"
                          viewBox="0 0 15 15"
                        >
                          <path d="M7.5,0C3.4,0,0,3.4,0,7.5S3.4,15,7.5,15S15,11.6,15,7.5S11.6,0,7.5,0z M7.5,13.6c-3.4,0-6.1-2.8-6.1-6.1c0-3.4,2.8-6.1,6.1-6.1c3.4,0,6.1,2.8,6.1,6.1C13.6,10.9,10.9,13.6,7.5,13.6z M10.8,9.2c-0.1,0.2-0.4,0.4-0.6,0.4c-0.1,0-0.2,0-0.3-0.1L7.2,8.1C7,8,6.8,7.8,6.8,7.5V4c0-0.4,0.3-0.7,0.7-0.7S8.2,3.6,8.2,4v3.1l2.4,1.2C10.9,8.4,11,8.8,10.8,9.2z"></path>
                        </svg>
                        <time className="font-[600px]">{` ${month} ${day},${year}`}</time>
                      </span>
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

export async function getServerSideProps(context) {
  const { n } = context.query;
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
  const startIndex = n ? (n - 1) * 10 : 0;
  const endIndex = startIndex + 10;

  const blogsForPage = allBlogs.slice(startIndex, endIndex);
  if (n) {
    allBlogs = blogsForPage;
  }
  return {
    props: { allBlogs: allBlogs, len: len },
  };
}
