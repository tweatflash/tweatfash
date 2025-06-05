import Link from "next/link"
export default function Section1() {
  return (
    <div className="relative w-full flex flex-col ">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
            />
          </div>
          <div className="py-20 pb-0">
            <div className="mb-4 flex justify-center">
              <div className="relative flex gap-x-2 rounded-full bg-[rgb(29,29,32)] px-2 py-2 pr-3 text-white border border-1 border-[hsl(var(--border-color))] ">
                <div className="flex -space-x-1 ">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="inline-block size-6 rounded-full"
                  />
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="inline-block size-6 rounded-full"
                  />
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                    className="inline-block size-6 rounded-full"
                  />
                 
                </div>
                Trusted by 3+ million users
              </div>
            </div>
            <div className="text-center">
              <h1
                className={`text-[34px] md:text-6xl xl:text-[60px] tracking-[-0.56px] text-balance text-white !leading-[1.1] md:leading-normal`}
              >
                Connect, Share, and Grow with Tweatflash Social
              </h1>
              <p className="mt-8 max-w-[500px] w-full m-auto text-lg font-normal text-pretty text-gray-500 sm:text-lg dark:text-gray-400 ">
               Experience the future of business with intelligent, scalable automation solutions tailored to your needs
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-[10px]">
                <Link
                  href="/sign-in"
                  className="rounded-[7px] bg-indigo-600 px-5 py-[6px] text-[15px] font-normal text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get Started
                </Link>
                 <Link
                  href="/sign-in"
                  className="rounded-[7px] border border-[hsl(var(--border-color))] px-5 py-[6px] text-[15px] font-normal text-white shadow-xs hover:opacity-[.5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  See Plans
                </Link>
              </div>
              <div className="flex items-center justify-center mt-6 gap-x-2">
                <div className="flex items-center ">
                  <div className="framer-639ufn">
                    <img
                      decoding="async"
                      width="20"
                      height="20"
                      src="https://framerusercontent.com/images/lvuKg4x2aNtdE9KCJ5H0BUAeEo.svg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="framer-nbfpn4">
                  <p className="text-[#727272] font-bold text-[15px]">
                    App Available For
                  </p>
                </div>

                <div className="flex items-center px-3 py-2 gap-2 rounded-lg bg-[hsl(var(--accent))] ">
                  <div className="framer-19jslhr" data-framer-name="Icon">
                    <div>
                      <img
                        decoding="async"
                        width="28"
                        height="28"
                        src="https://framerusercontent.com/images/iubuv2STfmPz5zeKS49tuf1E38.svg"
                        alt="Icon"
                      />
                    </div>
                  </div>
                  <div className="framer-1kt93t3"> </div>
                  <div className="framer-1remv7f" data-framer-name="Icon">
                    <div>
                      <img
                        width="28"
                        height="28"
                        src="https://framerusercontent.com/images/Qh3hInJRKF6WFt1cZiFo08d8aXM.svg"
                        alt="Icon"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Mobile  Image Section */}
          




        </div>
  )
}