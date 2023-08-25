import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import React from "react";
import "tailwindcss/tailwind.css";
import Loader from "./loading";
import Pagination from "@/components/UI/Pagination";

function MyApp({ Component, pageProps, router }) {
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);

  const isCilent = typeof window !== "undefined";
  React.useEffect(() => {
    if (isCilent) {
      setTotalPages(Math.ceil(localStorage.getItem("len") / 10));
    }
  }, [isCilent, loading]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    router.push(`/?n=${newPage}`);
    setTotalPages(Math.ceil(localStorage.getItem("len") / 10));
  };
  React.useEffect(() => {
    const start = () => {
      setLoading(true);
      console.log("----------->start", localStorage.getItem("len"));
    };
    const end = () => {
      setLoading(false);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);

  if (
    router.pathname.includes("outstatic") ||
    router.pathname.includes("sidebar-menu")
  ) {
    return <Component {...pageProps} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className="flex flex-col lg:flex-row flex-1 bg-gray-100 justify-center">
            <main className="flex-1 py-4 pt-8 w-full max-w-[840px]">
              <Component {...pageProps} />
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </main>
            <Sidebar />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default MyApp;
