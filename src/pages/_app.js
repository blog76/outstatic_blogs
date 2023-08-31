import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import React from "react";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import Loader from "./loading";
import Pagination from "@/components/UI/Pagination";
import { getDocuments } from "outstatic/server";
import SliderSlick from "@/components/UI/SliderSlick";

function MyApp({ Component, pageProps, router, posts }) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [isSingal, setIsSingal] = React.useState(false);
  const [latest, setLatest] = React.useState([]);
  console.log("post", posts);
  React.useEffect(() => {
    setTotalPages(Math.ceil(localStorage.getItem("len") / 10));
    setIsSingal(
      router.pathname.includes("[slug]") ||
        router.pathname.includes("info") ||
        router.query.s
    );
    console.log("Hiiiiiiiiiii", currentPage);
    if (!localStorage.getItem("n")) {
      setCurrentPage(1);
    }
    // localStorage.removeItem("n");
  }, [currentPage, router.pathname, router.query.s]);
  React.useEffect(() => {
    setLatest(JSON.parse(localStorage.getItem("latest")) || []);
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    localStorage.setItem("n", newPage);
    setTotalPages(Math.ceil(localStorage.getItem("len") / 10));
  };

  if (
    router.pathname.includes("outstatic") ||
    router.pathname.includes("sidebar-menu")
  ) {
    return <Component {...pageProps} />;
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <nav className="flex flex-col lg:flex-row flex-1 bg-gray-100 justify-center p-2 text-[#192a3d] items-start">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
          <div className="sm:grid grid-cols-12 gap-8 mt-5 rounded-xl w-full">
            <div className="col-span-12 lg:col-span-7 mb-5 sm:mb-0">
              <Component {...pageProps} />
              {totalPages > 1 && !isSingal && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
            <div className="col-span-12 lg:col-span-5">
              <Sidebar />
            </div>
            {isSingal && !router.pathname.includes("info") && (
              <>
                <div className="col-span-12 lg:col-span-12 text-3xl font-bold mb-5 sm:mb-0">
                  More Suggestions
                </div>
                <div className="col-span-12 lg:col-span-12 mb-10">
                  <div className={"lg:w-full slider-maincontainer m-auto"}>
                    <SliderSlick latest={latest} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
      <Footer />
    </div>
  );
}

export default MyApp;

export const getStaticProps = async () => {
  const posts = getDocuments("aivoices", [
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
