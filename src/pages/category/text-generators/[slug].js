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
  return (
    <div>
      <div className="container">
        <div className=" md:px-[3rem] px-[1rem] py-[4rem] drop-shadow-lg bg-white mx-auto my-3 ">
          <div className="drop-shadow-lg">
            <Image
              src={post.coverImage}
              alt="no_image"
              height={100}
              width={100}
              className="rounded-[1rem] mx-auto mb-8 font-medium drop-shadow-xl  w-[664px] h-[350px]"
            />
          </div>
          <div>
            <header>
              <div className="inline-block align-middle">
                <h1 className="text-4xl font-sans text-sky-500 font-bold">
                  {post.title}
                </h1>
              </div>
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
          <div className="mx-auto mt-16 md:items-center p-5 md:flex max-w-md overflow-hidden rounded-xl bg-white shadow-lg md:max-w-4xl">
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
                comprehensive guides on the latest AI tools.
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
  const posts = getDocuments("text-generators", ["slug"]);

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
  const post = getDocumentBySlug("text-generators", slug, [
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
