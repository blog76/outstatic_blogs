import SingleBlogView from "@/components/UI/SingleBlogView";
import markdownToHtml from "@/lib/markdownToHtml";
import {
  getCollections,
  getDocumentBySlug,
  getDocuments,
} from "outstatic/server";

function MyPage({ post, htmlData }) {
  return <SingleBlogView post={post} htmlData={htmlData} />;
}

export async function getStaticPaths() {
  const collections = getCollections();

  const paths = [];
  collections.forEach((collection) => {
    const posts = getDocuments(collection, ["slug"]);

    posts.forEach((item) => {
      paths.push({ params: { collection, slug: item["slug"] } });
    });
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { collection, slug } = params;
  const post = getDocumentBySlug(collection, slug, [
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
}

export default MyPage;
