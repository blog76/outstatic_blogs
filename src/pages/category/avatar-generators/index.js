import { getDocuments } from "outstatic/server";
import Link from "next/link";
import Image from "next/image";

const Index = ({ posts }) => {
  return (
    <>
      <div className="container">
        <header className="h-55 mb-5 p-12 bg-white text-[#18a7c7] font-[600] text-4xl drop-shadow-lg my-5 ">
          <h1>AI Avatar Generator</h1>
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
                          href={"/category/avatar-generators/" + post.slug}
                          className="text-white bg-[#242226] text-base inline-block px-5 py-3"
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
      </div>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const posts = getDocuments("avatar-generators", [
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
