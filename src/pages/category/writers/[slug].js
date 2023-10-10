import SingleBlogView from "@/components/UI/SingleBlogView";
import markdownToHtml from "@/lib/markdownToHtml";
import { getDocuments, getDocumentBySlug } from "outstatic/server";

function BlogSingle({ post, htmlData }) {
  return <SingleBlogView post={post} htmlData={htmlData} />;
}

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
