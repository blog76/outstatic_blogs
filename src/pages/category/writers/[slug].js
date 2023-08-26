import markdownToHtml from "@/lib/markdownToHtml";
import Image from "next/image";
import { getDocuments, getDocumentBySlug } from "outstatic/server";

const BlogSingle = ({ post, htmlData }) => {
  const publishedDate = new Date(post.publishedAt);
  const day = publishedDate.getDate();
  const month = publishedDate.toLocaleString("default", {
    month: "short",
  });
  const year = publishedDate.getFullYear();
  if (typeof window !== "undefined") {
    localStorage.setItem("sin", JSON.stringify(true));
  }

  return (
    <div>
      <div className="container">
        <header className="h-55 mb-5 py-12 text-[#2f4468] font-[600] text-4xl">
          <h1 className="text-4xl font-sans ml-10  font-bold">{post.title}</h1>
        </header>

        <div className=" md:px-[3rem] px-[1rem] py-[2rem] drop-shadow-lg   mx-auto my-3 ">
          <div className="drop-shadow-lg">
            <Image
              src={post.coverImage}
              alt="no_image"
              height={100}
              width={100}
              className="rounded-[1rem] mx-auto mb-8 font-medium drop-shadow-xl  w-full h-full"
            />
          </div>
          <div>
            <header>
              <div className="mb-3">
                <time>{`${day} ${month} ${year}`}</time>
              </div>
            </header>
            <div className="text-left Poppins-sans-serif text-base  selection:bg-fuchsia-300 selection:text-white">
              <div
                className="prose lg:prose-2xl home-intro overflow-auto break-word"
                dangerouslySetInnerHTML={{ __html: htmlData }}
              />
            </div>
          </div>
          <div className="mx-auto mt-16 md:items-center p-5 md:flex max-w-md overflow-hidden rounded-xl   shadow-lg md:max-w-4xl">
            <Image
              width={100}
              height={100}
              className="m-auto md:h-24 h-36 rounded-full object-cover object-center"
              src={post.author.picture}
              alt="Profile Image"
            />

            <div className="p-4">
              <h2 className="mb-2 text-2xl font-semibold">
                {post.author.name}
              </h2>

              <p className="text-base text-gray-700">
                {post.author.name} is a passionate blogger specializing in SEO
                and writing high-quality articles. With a strong background in
                AI and technology, Sonu provides valuable insights and
                comprehensive guides on the latest Smart AI Solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSingle;

export async function getStaticPaths() {
  const posts = getDocuments("writers", ["slug"]);

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async ({ params }) => {
  const slug = params.slug;
  const post = getDocumentBySlug("writers", slug, [
    "title",
    "slug",
    "coverImage",
    "author",
    "content",
    "publishedAt",
  ]);
  const htmlData = await markdownToHtml(post.content);
  return {
    props: { post, htmlData },
  };
};
