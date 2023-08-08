const Aboutus = () => {
  return (
    <>
      <div className="md:flex max-w-[1024px] gap-[1rem] mx-auto ">
        <div className="container shadow-gray-500 shadow-lg p-12 my-5 md:h-[80rem]">
          <header className="text-cyan-500 text-[40px] font-bold">
            <h1>About Us</h1>
          </header>
          <p className="mt-7 mb-1.5em text-[17px]">
            Welcome to the DragGAN AI Tool Blog!
          </p>
          <div className="bg-gradient-to-tr from-blue-600 to-blue-400 text-white text-[25px] font-bold px-6 py-1 shadow-lg rounded-xl mt-7">
            About me:
          </div>

          <div className="mt-5 ">
            At <b>DragGAN AI Tool Blog</b>, we are passionate about the power of
            artificial intelligence and its applications in the world of image
            editing. Led by <b>Sonu</b>, a dedicated blogger with over 5 years
            of experience and a B.Tech degree in Information Technology, we
            strive to provide valuable tutorials and insights into the
            innovative <b>DragGAN AI editing tool.</b>
            <br />
            <br />
          </div>
          <div className="bg-gradient-to-tr from-blue-600 to-blue-400 text-white text-[25px] font-bold px-6 py-1 shadow-lg rounded-xl mt-7">
            Other Blogs:
          </div>
          <div className="mt-5 ">
            With a deep love for writing and a strong background in blogging,
            Sonu has established multiple successful educational blogs,
            including hindigovtscheme.com, ekalyanbihar.online, and
            bestsmartwatchindia.in. These platforms have helped thousands of
            readers stay informed and up-to-date on various topics.
          </div>
          <div className="bg-gradient-to-tr from-blue-600 to-blue-400 text-white text-[25px] font-bold px-6 py-1 shadow-lg rounded-xl mt-7">
            Our Mission to Create DragGAN AI Blog
          </div>
          <div className="mt-5 ">
            The creation of the DragGAN AI Tool Blog was driven by our desire to
            share knowledge and provide detailed tutorials on using the DragGAN
            AI editing tool.
            <br />
            <br /> We understand the importance of user-friendly and informative
            content, and we aim to deliver just that. Whether you&apos;re a
            beginner looking to explore the world of AI editing or an
            experienced user seeking advanced techniques, our blog has something
            for everyone.
          </div>
          <div className="bg-gradient-to-tr from-blue-600 to-blue-400 text-white text-[25px] font-bold px-6 py-1 shadow-lg rounded-xl mt-7">
            Tutorials:
          </div>
          <div className="mt-5 ">
            We cover a wide range of topics related to DragGAN, including
            step-by-step guides on how to use the tool effectively, the download
            procedure, and other relevant information. Our articles are designed
            to empower you with the skills and knowledge needed to make the most
            of this powerful AI editing tool.
          </div>
          <div className="bg-gradient-to-tr from-blue-600 to-blue-400 text-white text-[25px] font-bold px-6 py-1 shadow-lg rounded-xl mt-7">
            Feel Free to Contact Us:
          </div>
          <div className="mt-5 ">
            If you have any questions or need assistance, please don&apos;t
            hesitate to reach out to us at
            <span className="text-red-500 hover:text-black">
              {" "}
              <a href="mailto:help@dragganaitool.com">
                help@dragganaitool.com
              </a>{" "}
            </span>
            . We value your feedback and are always ready to help you navigate
            the exciting world of DragGAN AI editing.
            <br />
            <br />
            Join us on this journey of exploration and creativity with the
            DragGAN AI Tool Blog. Together, let&apos;s unlock the potential of
            AI editing and create stunning visual masterpieces.
          </div>
        </div>
      </div>
    </>
  );
};

export default Aboutus;
