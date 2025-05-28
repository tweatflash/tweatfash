import { Lexend } from "next/font/google";
import Link from "next/link";
import React, { useState } from "react";
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  // fallback: ['ui-sans-serif', 'system-ui', 'sans-serif' ]
});

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];
const stats = [
  { id: 1, name: "Transactions every 24 hours", value: "500k+" },
  { id: 2, name: "Assets under holding", value: "200k+" },
  { id: 3, name: "New users annually", value: "50+" },
];
export default function IntroLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="bg-[hsl(var(--background))] min-h-screen w-full flex flex-col justify-center">
      <header className="sticky inset-x-0 top-0 z-50 border-b border-solid border-[hsl(var(--border-color))] flex justify-center w-full bg-[hsl(var(--background)/.6)] backdrop-blur-md">
        <nav
          aria-label="Global"
          className="flex flex-row items-center justify-between p-4 lg:px-8 max-w-7xl w-full"
        >
          <div className="flex lg:flex-1">
            <a
              href="#"
              className="-m-1.5 p-1.5 flex items-center gap-x-2 text-gray-900 dark:text-white"
            >
              <span className="sr-only">Your Company</span>
              <img alt="" src="/tweatflash.svg" className="h-8 w-8" />
              tweatflash
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="!size-6 dark:stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9h16.5m-16.5 6.75h16.5"
                ></path>
              </svg>
              {/* <Bars3Icon aria-hidden="true" className="size-6" /> */}
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm/6 font-semibold text-gray-900 dark:text-gray-400"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/sign-in"
              className="text-sm/6 font-semibold text-gray-900 dark:text-white"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="!size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5"></path></svg> */}
      </header>

      <div className="relative flex flex-col h-auto px-4 max-w-[450px] md:max-w-[750px] md:px-16 lg:max-w-[1300px]  w-full mx-auto lg:gap-y-[200px] md:gap-y-[150px] gap-y-[80px]">
        <div className="relative w-full flex flex-col">
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
          <div className="py-20">
            <div className="mb-4 flex justify-center">
              <div className="relative flex gap-x-2 rounded-full px-2 py-2 pr-3 text-black dark:text-white border border-1 border-[hsl(var(--border-color))] ">
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
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="inline-block size-6 rounded-full"
                  />
                </div>
                Trusted by 3+ million users
              </div>
            </div>
            <div className="text-center">
              <h1
                className={`text-[34px] md:text-6xl xl:text-[64px] font-extrabold tracking-tight text-balance text-gray-900  dark:text-white !leading-[1.1] md:leading-normal`}
              >
                Connect, Share, and&nbsp;Grow with Tweatflash Social
              </h1>
              <p className="mt-8 text-lg font-normal text-pretty text-gray-500 sm:text-lg dark:text-gray-400 ">
                Join Appit to build authentic connections and share your
                passions effortlessly.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/sign-in"
                  className="rounded-[13px] bg-indigo-600 px-5 py-4 text-[16px] font-normal text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Join Tweatflash
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
          <div className="w-full overflow-visible relative h-96 flex justify-center ">
            <div className="hidden md:flex h-[366px] absolute  justify-center right-[-45px] top-[-100px] lg:top-[-210px] w-[230px] lg:h-[472px] lg:w-[297px] ">
              <div className="contents">
                <div className="gap-[10px] h-[342px] overflow-hidden w-[168px] lg:h-[446px] lg:w-[219px] p-[15px_23px_0_5px] absolute  top-[24px]  flex items-center">
                  <div className="absolute inset-0 rounded-[32px] ">
                    <img
                      src="https://framerusercontent.com/images/bbJeLns4NqVr3NOyuD4LsO6Qz6E.png"
                      className="w-full h-full rounded-[inherit] object-cover object-center block"
                    />
                  </div>
                  <div className="rotate-y-2 skew-y-[-11deg] w-full h-full rounded-tl-[38px] rounded-tr-[41px] overflow-hidden relative">
                    <div className="absolute inset-x-[0px] inset-y-[0px]">
                      <img
                        src="https://framerusercontent.com/images/VnwgieSrwPtwTHEEP88vxVrcfBk.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[254px] absolute bottom-[-2px] left-0 right-0 bg-gradient-to-b from-transparent dark:to-black to-white"></div>
              <div className="bg-gradient-to-b from-transparent dark:to-black to-white h-[130px] absolute left-0 right-0 bottom-0"></div>
            </div>

            <div className="contents">
              <div className="h-[398px] w-[201px] lg:h-[515px] lg:w-[260px] relative overflow-hidden">
                <div className="relative inset-0">
                  {/* <img
                  decoding="async"
                  className="w-full block h-full object-cover object-center"
                  src="https://framerusercontent.com/images/I9yRU9jEN2S2ol2M7kgT5c6zOrc.png"
                  alt="Mobile Image"
                  
                /> */}
                </div>
                <div className="absolute inset-0">
                  <div className="w-full h-full ">
                    <div className="absolute">
                      <img
                        src="https://framerusercontent.com/images/I9yRU9jEN2S2ol2M7kgT5c6zOrc.png"
                        alt="Mobile Image"
                        className="w-full h-full block"
                      />
                    </div>
                    <div className="absolute rounded-[32px] inset-x-[14px] inset-y-[10px]">
                      <div className="rounded-[inherit] overflow-hidden inset-0 absolute">
                        <img
                          src="https://framerusercontent.com/images/8xn8DXbIdPvUwm8vHUmFG9nPM.jpg?scale-down-to=1024"
                          alt=""
                          className="w-full h-full rounded-[inherit] object-cover object-center block"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[423px] absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent dark:to-black to-white"></div>
                <div className="bg-gradient-to-b from-transparent dark:to-black to-white h-[216px] absolute left-0 right-0 bottom-0"></div>
              </div>
            </div>

            <div className="hidden w-[230px]  left-[-45px] top-[-100px] lg:top-[-210px] absolute h-[366px] lg:h-[471px] lg:w-[296px] md:flex justify-center">
              <div className="contents">
                <div className="gap-[10px] h-[342px]  overflow-hidden w-[168px] lg:h-[446px] lg:w-[219px] p-[15px_23px_0_5px] absolute top-[24px]  flex items-center">
                  <div className="absolute inset-0 rounded-[32px] ">
                    <img
                      src="https://framerusercontent.com/images/DNA4hTd6dhMchnMyWmFAPzRAB7M.png"
                      className="w-full h-full rounded-[inherit] object-cover object-center block"
                    />
                  </div>
                  <div className="skew-y-[3deg] rotate-x-[3deg] relative overflow-hidden rounded-tl-[37px] rounded-tr-[34px]">
                    <div className="absolute inset-0 rounded-[inherit] overflow-hidden">
                      <img
                        src="https://framerusercontent.com/images/ZIVIj5UHPVrXjpXkxa1NJ73SGM0.jpg"
                        className="w-full h-full rounded-[inherit] object-cover object-center block"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[254px] absolute bottom-[-2px] left-0 right-0 bg-gradient-to-b from-transparent dark:to-black to-white"></div>
              <div className="bg-gradient-to-b from-transparent dark:to-black to-white h-[130px] absolute left-0 right-0 bottom-0"></div>
            </div>
          </div>




        </div>
        <div className="w-full flex flex-col gap-[60px]">
          <div className="w-full flex flex-col justify-center gap-2">
            <div className="w-20 md:w-24 aspect-square m-auto rounded-full overflow-hidden">
              <img alt="" src="/tweatflash.svg" className="w-full h-full" />
            </div>
            <div className="w-full flex justify-center">
              <h1 className="text-2xl font-bold md:font-black md:text-5xl !leading-[1.2] text-black dark:text-white text-center">
                Empowering authentic connections for a vibrant social
                experience.
              </h1>
            </div>
          </div>
          <div className="w-full ">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col md:flex-row md:gap-8 gap-5 h-auto text-center md:items-stretch">
                <div className="mx-auto h-fit flex max-w-xs flex-col gap-y-2">
                  <div className="text-[18px] text-[#727272] font-normal">
                    Shared moments and stories every month
                  </div>
                  
                  <div className="order-first md:text-[50px] font-semibold tracking-tight text-black dark:text-white text-[40px]">
                    500k+
                  </div>
                </div>

                <div className="w-[1px] bg-[hsl(var(--accent))] block">
                </div>

                <div className="mx-auto h-fit flex max-w-xs flex-col gap-y-2">
                  <div className="text-[18px] text-[#727272] font-normal">
                   Communities thriving across diverse interests
                  </div>
                  <dd className="order-first md:text-[50px] font-semibold tracking-tight text-black dark:text-white text-[40px]">
                    200k+
                  </dd>
                </div>

                <div className="w-[1px] bg-[hsl(var(--accent))]"></div>

                <div className="mx-auto h-fit flex max-w-xs flex-col gap-y-2">
                  <div className="text-[18px] text-[#727272] font-normal">
                    Countries where Appit is growing strong
                  </div>
                  <dd className="order-first md:text-[50px] font-semibold tracking-tight text-black dark:text-white text-[40px]">
                    50+
                  </dd>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <div className="flex flex-col gap-12 relative w-full">
             
              <div className="relative w-full h-auto flex gap-2 flex-col justify-center">
                  <div className="py-2 px-4 m-auto border flex rounded-full border-[hsl(var(--border-color))] w-fit gap-1">
                    <div className="h-5 w-5 ">
                      <img className="w-full h-full" src="https://framerusercontent.com/images/o8k4hpBGZSqpjSgLI7W0kJLJuw4.svg"/>
                    </div>
                    <div>
                      <p className="text-4 text-black dark:text-white">Our Benefits</p>
                    </div>
                  </div>
                  <div className="flex-col gap-1">
                    <h2 className="text-[38px] leading-tight md:text-[58px] text-black dark:text-white md:font-black font-bold text-center ">
                      Discover Tweatflash&apos;s Benefits
                    </h2>
                    <p className="text-[#727272] text-[18px] text-center">Unlock a world of meaningful connections, tailored experiences, and seamless social interaction.</p>
                  </div>
              </div>
          
            <div className="w-full grid lg:grid-cols-3 gap-5 md:grid-cols-2">
              <div className="flex gap-5 lg:order-none order-1 flex-col ">
                <div className="p-[30px] flex  flex-col rounded-[20px] border border-[hsl(var(--border-color))] gap-[30px]">
                    <div className="p-[14px] w-fit border border-[hsl(var(--border-color))] rounded-[14px] ">
                      <div className="w-[30px] h-[30px]">
                        <img src="https://framerusercontent.com/images/AjjAxBc5v6SZHOkJzG2bwrSMk.svg" alt="" className="w-full h-full "/>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[6px]">
                      <div>
                        <h3 className="text-[22px] text-black dark:text-white ">Authentic Connections</h3>
                      </div>
                      <div>
                        <p className="text-[#727272] text-[18px]">Build genuine relationships with like-minded individuals.</p>
                      </div>
                    </div>
                </div>
                <div className="p-[30px] flex flex-col rounded-[20px] border border-[hsl(var(--border-color))] gap-[30px]">
                    <div className="p-[14px] w-fit border border-[hsl(var(--border-color))] rounded-[14px] ">
                      <div className="w-[30px] h-[30px]">
                        <img src="https://framerusercontent.com/images/rxSlFR0RyaC3WCayigHX4RPQZs.svg" alt="" className="w-full h-full "/>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[6px]">
                      <div>
                        <h3 className="text-[22px] text-black dark:text-white ">Global Reach</h3>
                      </div>
                      <div>
                        <p className="text-[#727272] text-[18px]">Connect with people across 50+ countries effortlessly.</p>
                      </div>
                    </div>
                </div>
              </div>
              <div className="relative col-span-full  lg:order-2 lg:col-span-1 lg:min-w-auto h-[496px] lg:h-full m-auto min-w-full order-0">
                <div className="contents"></div>
                <div className="absolute bottom-0 w-full">
                  <img className="w-full" src="https://framerusercontent.com/images/G5E3Hg44KVQi3oAJd4bMzA4lC4k.svg"/>
                </div>
                
              </div>
              <div className="flex gap-5 order-2 lg:order-3 flex-col">
                <div className="p-[30px] flex flex-col rounded-[20px] border border-[hsl(var(--border-color))] gap-[30px]">
                    <div className="p-[14px] w-fit border border-[hsl(var(--border-color))] rounded-[14px] ">
                      <div className="w-[30px] h-[30px]">
                        <img src="https://framerusercontent.com/images/pvxqwt0ZG86WIRPPnHxDCgV7rkQ.svg" alt="" className="w-full h-full "/>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[6px]">
                      <div>
                        <h3 className="text-[22px] text-black dark:text-white ">Personalized Experience</h3>
                      </div>
                      <div>
                        <p className="text-[#727272] text-[18px]">Tailored content and recommendations just for you.</p>
                      </div>
                    </div>
                </div>
                <div className="p-[30px] flex flex-col rounded-[20px] border border-[hsl(var(--border-color))] gap-[30px]">
                    <div className="p-[14px] w-fit border border-[hsl(var(--border-color))] rounded-[14px] ">
                      <div className="w-[30px] h-[30px]">
                        <img src="https://framerusercontent.com/images/u8fjSIAgWQzhagulXkIoN7PzI.svg" alt="" className="w-full h-full "/>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[6px]">
                      <div>
                        <h3 className="text-[22px] text-black dark:text-white ">Community Support</h3>
                      </div>
                      <div>
                        <p className="text-[#727272] text-[18px]">Join thriving communities aroundyour interests.</p>
                      </div>
                    </div>
                </div>
              </div>
            </div>

            
        </div>
        <div className="max-w-[1134px] w-full flex-col lg:flex-row flex gap-x-[50px] items-center">
          <div className="h-[548px] w-full max-w-[438px] flex justify-center relative rounded-[25px] overflow-hidden">
              <div className="contents">
                <div className="absolute w-full h-full top-0 right-0 left-0">
                  <img
                    className="w-full h-full object-cover object-center"
                    src="https://framerusercontent.com/images/Fo4i0rVb4DLMSSNWLjFTsmdrxtA.svg"
                    alt=""
                  />  
                </div>
              </div>
              <div className="contents">
                <div className="w-[255px] absolute top-[80px] p-[3px_7px_0_21px] h-[468px] flex justify-center">
                    <div className="absolute inset-0">
                      <img 
                        src="https://framerusercontent.com/images/Ezv95KhZ472AmRHJdppXjtn7Yg8.png"
                        className="w-full h-full object-cover "
                       />

                    </div>
                    <div className="rotate-x-[-12deg] skew-y-[3deg] inset-[3px_7px_-17px_21px] w-full rounded-tl-[40px] rounded-tr-[40px]">
                      <div className="w-full h-full rounded-[inherit] bg-black overflow-hidden">
                        <img className="w-full h-full" src="https://framerusercontent.com/images/6pEqMFLtWo7ymjMRGhPcK4QZ9g.png" alt=""/>
                      </div>
                    </div>
                </div>
              </div>
              <div className="absolute w-full h-[254px] overflow-hidden bottom-0">
                <img className="w-full h-full" src="https://framerusercontent.com/images/Odm4ynlr2GaNp1uafqRsNfKV358.svg" alt=""/>
              </div>
              
          </div>
          <div className="flex flex-col gap-[50px] flex-1">
              <div className=" flex justify-start flex-col">
                  <h2 className="dark:text-white text-center lg:text-left mt-5 lg:mt-0 text-black text-2xl md:text-5xl md:font-black font-bold">Tweatflash Social&apos;s Advanced Capabilities</h2>
              </div>
              <div className="grid gap-5 md:grid-cols-2 grid-cols-1 grid-rows-2 w-full" >
                <div className="contens">
                  <div className="w-full border border-[hsl(var(--border-color))] rounded-[20px]">
                    <div className="w-full flex flex-col gap-4 p-6">
                      <div className="flex gap-2 items-center">
                        <div className="w-[26px] h-[26px] flex items-center">
                          <img src="https://framerusercontent.com/images/0ZuOwnoOjO6aCuZyODXxddhTA.svg" alt="" className="w-full h-full"/>
                        </div>
                        <h3 className="text-[20px] text-black dark:text-white">Instant Messaging</h3>
                      </div>
                      <div className="flex">
                        <p className="text-[#727272] text-lg">Chat seamlessly with friends and communities.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contens">
                  <div className="w-full border border-[hsl(var(--border-color))] rounded-[20px]">
                    <div className="w-full flex flex-col gap-4 p-6">
                      <div className="flex gap-2 items-center">
                        <div className="w-[26px] h-[26px] flex items-center">
                          <img src="https://framerusercontent.com/images/VkUZshZscEaDkcpWl3Cjwsa2eTk.svg" alt="" className="w-full h-full"/>
                        </div>
                        <h3 className="text-[20px] text-black dark:text-white">Story Sharing</h3>
                      </div>
                      <div className="flex">
                        <p className="text-[#727272] text-lg">Share life moments through photos and videos.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contens">
                  <div className="w-full border border-[hsl(var(--border-color))] rounded-[20px]">
                    <div className="w-full flex flex-col gap-4 p-6">
                      <div className="flex gap-2 items-center">
                        <div className="w-[26px] h-[26px] flex items-center">
                          <img src="https://framerusercontent.com/images/cWLTQB9F2r4V1VWFjwhxL7pKw.svg" alt="" className="w-full h-full"/>
                        </div>
                        <h3 className="text-[20px] text-black dark:text-white">Customizable Profiles</h3>
                      </div>
                      <div className="flex">
                        <p className="text-[#727272] text-lg">Personalize your profile with themes and layouts.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contens">
                  <div className="w-full border border-[hsl(var(--border-color))] rounded-[20px]">
                    <div className="w-full flex flex-col gap-4 p-6">
                      <div className="flex gap-2 items-center">
                        <div className="w-[26px] h-[26px] flex items-center">
                          <img src="https://framerusercontent.com/images/TgZPYI3DkURzht1SO7C0GZKgOdE.svg" alt="" className="w-full h-full"/>
                        </div>
                        <h3 className="text-[20px] text-black dark:text-white">Community Groups</h3>
                      </div>
                      <div className="flex">
                        <p className="text-[#727272] text-lg">Chat seamlessly with friends and communities.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className="flex gap-[50px] flex-1 items-center">
          <div></div>
          <div className="height-[548px] flex-1 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
}
