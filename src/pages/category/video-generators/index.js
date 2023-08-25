import { getDocuments } from "outstatic/server";
import Link from "next/link";
import Image from "next/image";

const Index = ({ posts }) => {
  return (
    <>
      <div className="container">
        <header className="h-55 mb-5 p-12  text-[#2f4468] font-[600] text-4xl my-5 ">
          <h1>AI Video Generator</h1>
        </header>
        {/* <h1>Welcome to my Blog!</h1> */}
        <div className="row">
          {posts.map((post) => {
            const publishedDate = new Date(post.publishedAt);
            const day = publishedDate.getDate();
            const month = publishedDate.toLocaleString("default", {
              month: "long",
            });
            const year = publishedDate.getFullYear();

            const imageUrl = post.coverImage;

            return (
              <article
              key={post.publishedAt}
              className="mb-5 block border-3 border-b border-gray-300"
            >
              <div className="lg:flex md:flex-none">
                <div className="mt-5 w-30 flex lg:justify-center md:justify-start p-5">
                  <a>
                    <Image
                      width={325}
                      height={200}
                      className="lg:w-[350px] lg:h-[200px] md:w-[550px] md:h-[350px] object-cover rounded-md"
                      src={imageUrl}
                      alt="bg"
                    />
                  </a>
                </div>
                <div className="capitalize">
                <div className="lg:p-10 md:p-[20px] sm:p-[30px]">
                    <header className="block">
                      <h2 className="mb-5 text-[#2f4468] text-[20px] leading-normal hover:text-[#2872fa] cursor-pointer font-bold ">
                        <a>
                          <h2>{post.title}</h2>
                        </a>
                      </h2>
                    </header>
                    <p className="mb-5 text-lg font-[400] text-[#3A4F66]">
                      {post.description}
                    </p>
                    <p className="mb-5">
                      <Link
                        href={"/category/video-generators/" + post.slug}
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
            </article>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const posts = getDocuments("video-generators", [
    "title",
    "publishedAt",
    "slug",
    "coverImage",
    "description",
    "author",
  ]);

  return {
    props: { posts },
  };
};
