import Image from 'next/image';
import React from 'react';

const SingleBlogView = ({ post, htmlData }) => {
  const publishedDate = new Date(post.publishedAt);
  const day = publishedDate.getDate();
  const month = publishedDate.toLocaleString("default", {
    month: "short",
  });
  const year = publishedDate.getFullYear();

  return (
    <div className="">
      <header className="h-55  text-[#2f4468] font-[600] text-3xl">
        <h1 className="text-3xl font-sans font-bold capitalize">
          {post.title}
        </h1>
      </header>

      <div
        className="sm:grid grid-cols-12 gap-4 mt-5 rounded-xl w-full items-center mb-10"
        key={post.publishedAt}
      >
        {/* <div className="col-span-12 drop-shadow-lg">
          <Image
            src={post.coverImage}
            alt="no_image"
            height={100}
            width={100}
            className="rounded-[1rem] mx-auto mb-8 font-medium drop-shadow-xl  w-full h-full"
          />
        </div> */}
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
            className="m-auto md:h-24 h-36 rounded-full   object-center"
            src={post.author.picture}
            alt="Profile Image"
          />

          <div className="p-4">
            <h2 className="mb-2 text-2xl font-semibold">{post.author.name}</h2>

            <p className="text-base text-gray-700">
              {post.author.name} is a passionate blogger specializing in SEO and
              writing high-quality articles. With a strong background in AI and
              technology, Sonu provides valuable insights and comprehensive
              guides on the latest Smart AI Solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogView