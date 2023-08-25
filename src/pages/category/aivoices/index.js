import { getDocuments } from "outstatic/server";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const Index = ({ posts, len }) => {
  const router = useRouter();
  const { n } = router.query;
  let filteredBlogs = [];
  if (n) {
    const startIndex = n ? (n - 1) * 10 : 0;
    const endIndex = startIndex + 10;
    filteredBlogs = allBlogs.slice(startIndex, endIndex);
  }
  if (typeof window !== "undefined") {
    localStorage.setItem("len", JSON.stringify(len));
  }
  return (
    <>
      <div className="container">
        <header className="h-55 mb-5 p-12 text-[#2f4468] font-[600] text-4xl   rounded-xl">
          <h1>AI Voice</h1>
        </header>
        {/* <h1>Welcome to my Blog!</h1> */}
        <div className="row mb-20">
          {(n ? filteredBlogs : posts).map((post) => {
            const publishedDate = new Date(post.publishedAt);
            const day = publishedDate.getDate();
            const month = publishedDate.toLocaleString("default", {
              month: "long",
            });
            const year = publishedDate.getFullYear();

            const imageUrl = post.coverImage;

            return (
              <>
                <div
                  className="sm:grid grid-cols-12 gap-4 mt-5 p-8 items-center  rounded-xl"
                  key={post.publishedAt}
                >
                  <div className="col-span-5">
                    <a>
                      <img
                        className="w-full h-[200px] object-cover rounded-md"
                        src={imageUrl}
                        alt="bg"
                      />
                    </a>
                  </div>
                  <div className="col-span-7">
                    <div className="ps-5">
                      <header className="block">
                        <h2 className="mb-5 text-[#2f4468] text-[20px] leading-normal hover:text-[#2872fa] cursor-pointer font-bold ">
                          <a>
                            <h2>{post.title}</h2>
                          </a>
                        </h2>
                      </header>
                      <p className="mb-5 text-lg font-[400] text-[#3A4F66]">
                        {post.description.slice(0, 90)}
                        {post.description.length < 90 ? "" : "...."}
                        {/* {post.description} */}
                      </p>
                      <p className="mb-5">
                        <Link
                          href={"/category/aivoices/" + post.slug}
                          className="text-white bg-[#2872fa] hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-base rounded-[3px] px-5 py-2.5"
                        >
                          Read more
                        </Link>
                      </p>
                      <div className="text-[#878787] mt-2 text-base">
                        <span>
                          <time>{`${day} ${month},${year}`}</time>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
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
