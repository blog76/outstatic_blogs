import { useRouter } from "next/router";
import React from "react";

const FeaturedBlog = () => {
  const router = useRouter();
  const [recent, setRecent] = React.useState([]);
  React.useEffect(() => {
    setRecent(JSON.parse(localStorage.getItem("rec")) || []);
  }, []);
  return (
    <>
      {recent.length > 0 && (
        <div>
          <header className="text-black font-[600] text-2xl border-b-4 pb-2 border-[#2872fa]">
            <h1>Recent Blog</h1>
          </header>
          {recent.map((obj, ind) => {
            const publishedDate = new Date(obj.publishedAt);
            const day = publishedDate.getDate();
            const month = publishedDate.toLocaleString("default", {
              month: "long",
            });
            const year = publishedDate.getFullYear();

            return (
              <div
                className={`sm:grid grid-cols-12 gap-4 mt-5 w-full items-center ${
                  ind === 0 ? "" : "border-t-4"
                } pt-5`}
                key={ind}
              >
                <div className="col-span-12 sm:col-span-5">
                  <a className="w-full">
                    <img
                      alt="bg"
                      className="w-full h-[150px] object-cover rounded-md"
                      src={obj.coverImage}
                    />
                  </a>
                </div>
                <div className="col-span-12 sm:col-span-7">
                  <div className="py-5 px-5 sm:px-5 sm:py-0">
                    <header className="block">
                      <h2
                        onClick={() =>
                          router.push(`/category/${obj.collection}/${obj.slug}`)
                        }
                        className="mb-1 text-[#2f4468] text-[20px] leading-normal hover:text-[#2872fa] cursor-pointer font-bold "
                      >
                        <a>
                          <h2>{obj.title}</h2>
                        </a>
                      </h2>
                    </header>
                    <p className="mb-2 text-md font-[400] text-[#3A4F66]">
                      {obj.description.slice(0, 90)}
                      {obj.description.length < 90 ? "" : "...."}
                    </p>

                    <div className="text-[#878787] mt-2 text-base">
                      <span>
                        <time>{`${day} ${month},${year}`}</time>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default FeaturedBlog;
