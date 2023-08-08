import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import React from "react";
import "tailwindcss/tailwind.css";
import Loader from "./loading";

function MyApp({ Component, pageProps, router }) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("finished");
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
      <Navbar />
      <div className="flex flex-col lg:flex-row flex-1  justify-center">
        <main className="flex-1 p-4 w-full max-w-[840px]">
          {loading ? <Loader /> : <Component {...pageProps} />}
        </main>
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}

export default MyApp;
