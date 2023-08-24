import { getDocuments } from "outstatic/server";
import Image from "next/image";

const Index = ({ posts }) => {
  const handleLinkClick = (path) => {
    window.parent.postMessage({ type: "changePath", path }, "*");
  };
  return (
    <>
      <div className="md:max-w-[450px] shadow-gray-500 shadow-md py-8 px-8 mx-auto mb-8">
        <div className="bg-gradient-to-tr from-blue-600 to-blue-400 text-white text-xl font-bold px-4 py-1 shadow-lg rounded-xl mt-3">
          Latest AI Tutorials
        </div>
        {posts.map((blogPost, i) => {
          const imageUrl = blogPost.coverImage;
          const publishedDate = new Date(blogPost.publishedAt);
          const day = publishedDate.getDate();
          const month = publishedDate.toLocaleString("default", {
            month: "short",
          });
          const year = publishedDate.getFullYear();
          return (
            <div className="mt-6 border-b-2" key={i}>
              <Image
                width={100}
                height={100}
                src={imageUrl}
                alt=""
                layout="responsive"
              />
              <div className="p-2">
                <h5
                  onClick={() =>
                    handleLinkClick("/category/latests/" + blogPost.slug)
                  }
                  className="mb-1 font-bold tracking-tight text-black cursor-pointer"
                >
                  {blogPost.title}
                </h5>
                <div className="text-xs">
                  {<time>{`${day} ${month} ${year}`}</time>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const posts = getDocuments("latests", [
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
