import Image from 'next/image'
import React from 'react'

const FeaturedBlog = () => {
    return (
        <div>
            <header className="text-black font-[600] text-2xl border-b-4 pb-2 border-[#2872fa]">
                <h1>Recent Blog</h1>
            </header>
            {[1, 2, 3].map((obj, ind) => (
                <div
                    className={`sm:grid grid-cols-12 gap-4 mt-5 w-full items-center ${ind === 0 ? "" : "border-t-4"} pt-5`}
                    key={ind}
                >
                    <div className="col-span-12 sm:col-span-5">
                        <a className="w-full">
                            {/* <Image
                        width={325}
                        height={200}
                        className="w-full h-[200px] object-cover rounded-md"
                        src="https://images.unsplash.com/photo-1693092243843-412e289bc5ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
                        alt="bg"
                    /> */}
                            <img alt="bg" className="w-full h-[150px] object-cover rounded-md" src="https://images.unsplash.com/photo-1693092243843-412e289bc5ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80" />
                        </a>
                    </div>
                    <div className="col-span-12 sm:col-span-7">
                        <div className="py-5 px-5 sm:px-5 sm:py-0">
                            <header className="block">
                                <h2 className="mb-1 text-[#2f4468] text-[20px] leading-normal hover:text-[#2872fa] cursor-pointer font-bold ">
                                    <a>
                                        <h2>Hello World</h2>
                                    </a>
                                </h2>
                            </header>
                            <p className="mb-2 text-md font-[400] text-[#3A4F66]">
                                {/* {post.description.slice(0, 90)}
                        {post.description.length < 90 ? "" : "...."} */}
                                Hello World
                            </p>
                            <p className="mb-2">
                                <button
                                    onClick={() =>
                                        router.push("/")
                                    }
                                    className="text-white bg-[#2872fa] hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-base rounded px-5 py-2 flex"
                                >
                                    Read more
                                    <svg
                                        width="20px"
                                        height="17px"
                                        className="fill-white self-center ml-2"
                                        viewBox="0 0 32 32"
                                    >
                                        <path d="M 21.1875 9.28125 L 19.78125 10.71875 L 24.0625 15 L 4 15 L 4 17 L 24.0625 17 L 19.78125 21.28125 L 21.1875 22.71875 L 27.90625 16 Z "></path>
                                    </svg>
                                </button>
                            </p>
                            <div className="text-[#878787] mt-2 text-base">
                                <span>
                                    <time>Hello World</time>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FeaturedBlog