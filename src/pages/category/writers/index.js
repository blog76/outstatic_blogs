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
    filteredBlogs = posts.slice(startIndex, endIndex);
  }
  if (typeof window !== "undefined") {
    localStorage.setItem("len", JSON.stringify(len));
  }
  return (
    <>
      <div className="">
        <header className="h-55 mb-5 text-black font-[600] text-4xl">
          <h1>AI Writer</h1>
        </header>
        {/* <h1>Welcome to my Blog!</h1> */}
        <div className="row">
          {(n ? filteredBlogs : posts).map((post) => {
            const publishedDate = new Date(post.publishedAt);
            const day = publishedDate.getDate();
            const month = publishedDate.toLocaleString("default", {
              month: "short",
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
                  <div className="lg:p-10 md:p-[20px] sm:p-[30px]">
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
                    </p>
                    <p className="mb-5">
                      <button
                        onClick={() =>
                          router.push("/category/writers/" + post.slug)
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
      </div>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const posts = getDocuments("writers", [
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
