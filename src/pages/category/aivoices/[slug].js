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
    <>
      <div className="">
        <header className="h-55 mb-5 pb-10 text-[#2f4468] font-[600] text-3xl">
          <h1 className="text-3xl font-sans font-bold capitalize">
            {post.title}
          </h1>
        </header>

        <div
          className="sm:grid grid-cols-12 gap-4 mt-5 rounded-xl w-full items-center mb-10"
          key={post.publishedAt}
        >
          <div className="col-span-12 drop-shadow-lg">
            <Image
              src={post.coverImage}
              alt="no_image"
              height={100}
              width={100}
              className="rounded-[1rem] mx-auto mb-8 font-medium drop-shadow-xl  w-full h-full"
            />
          </div>
          <div className="col-span-12">
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
          <div className="col-span-12 mx-auto mt-16 md:items-center p-5 md:flex  overflow-hidden rounded-xl shadow-lg w-full">
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
      <div className="sm:grid grid-cols-12 gap-7 rounded-xl w-full items-center my-12">
        {[1, 2, 3].map((item, ind) => (
          <div
            key={ind}
            className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-4 bg-white border border-gray-200 rounded-lg shadow text-dark mt-5 sm:mt-0"
          >
            <a href="#">
              <img
                className="rounded-t-lg w-full h-[200px]"
                src={
                  "https://images.unsplash.com/photo-1682685797088-283404e24b9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                }
                alt=""
              />
            </a>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-black">
                  Noteworthy technology acquisitions 2021
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
              <a
                href="#"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  class="w-3.5 h-3.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogSingle;

export async function getStaticPaths() {
  const posts = getDocuments("aivoices", ["slug"]);

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
  const post = getDocumentBySlug("aivoices", slug, [
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
