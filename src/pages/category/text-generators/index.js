import { getDocuments } from "outstatic/server";
import Link from "next/link";
import Image from "next/image";

const Index = ({ posts }) => {
  return (
    <>
      <div className="container">
        <header className="h-55 mb-5 p-12 bg-white text-[#2f4468] font-[600] text-4xl">
          <h1>AI Text Generator</h1>
        </header>
        {/* <h1>Welcome to my Blog!</h1> */}
        <div className="row">
          {posts.map((post) => {
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
              className="mb-5 block bg-white border border-gray-300 rounded-md"
            >
              <div className="p-2.5">
                <div className="pl-4">
                  <header className="block">
                  <h2 className="mb-5 text-[#2f4468] text-[20px] leading-normal hover:text-[#2872fa] cursor-pointer font-bold capitalize">
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
                      <Link href={"/category/text-generators/" + post.slug}>
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
                      <svg width="13" height="13" className="fill-[#3A4F66] self-center mr-2" viewBox="0 0 15 15">
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
      </div>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const posts = getDocuments("text-generators", [
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
