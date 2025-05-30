import Link from "next/link";

export default function Section5() {
  const capabilities=["Story Sharing", "Custom Profiles", "Community Groups", "Event Creation", "Smart Notifications"];
  return (
    <div className="flex flex-col justify-center max-w-[520px] m-auto lg:max-w-full lg:flex-row gap-[50px] flex-1 items-center lg:w-full">
        <div className="flex-1 flex flex-col gap-10 relative">
          <div className="flex gap-4 flex-col w-full">
            <div className="contents">
              <div className="flex">
                <h2 className="text-center lg:text-left text-[38px] md:text-[58px] text-white leading-[1.2] font-bold">Tweatflash&apos;s Advanced Capabilities</h2>
              </div>
            </div>
            <div className="contents">
              <div className="flex">
                <p className="text-lg text-[#727272] text-center lg:text-left">Explore advanced capabilities designed to elevate your social experience and interactions.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-5 w-full items-center justify-center lg:justify-start">
            
            {
              capabilities.map((capability, index) =>(
                <div className="w-auto h-auto" key={index}>
                  <div className="items-center gap-2 flex flex-nowrap flex-row">
                    <div className="relative w-[22px] h-[22px] ">
                      <div className="absolute w-full h-full">
                        <img className="w-full h-full absolute" src="https://framerusercontent.com/images/55fmjBtSJ5KITLoOmKA2KYcj64.svg" alt="Icon" />
                      </div>
                    </div>
                    <div className="flex whitespace-pre break-words ">
                      <p className="text-[16px] text-[#727272] ">{capability}</p>
                    </div>
                  </div>
                </div>
              ))
            }
            
          </div>
          <div className="flex flex-col md:flex-row items-center flex-nowrap w-auto relative gap-5 lg:justify-start justify-center">
              <Link href={"#"} className="cursor-pointer flex items-center flex-row flex-nowrap gap-[10px] justify-center p-[14px_18px] rounded-[12px] bg-white">
                <div className="w-10 h-10 relative" data-framer-name="Icon">
                  <div className="absolute inset-0 ">
                    <img className="w-full h-full block" src="https://framerusercontent.com/images/1GgSZDsVA7GKub98IQFhnqoNJvI.svg" alt="" />
                  </div>
                </div>
                <div className="flex flex-col  h-min relative">
                  <div className="flex">
                    <p className="text-[13px] text-black">Get It On</p>
                  </div>
                  <div className="flex">
                    <p className="text-[17px] text-black">Google Play</p>
                  </div>
                </div>
              </Link>
              <Link href={"#"} className="cursor-pointer flex items-center flex-row flex-nowrap gap-[10px] justify-center p-[14px_18px] rounded-[12px] bg-white">
                <div className="w-10 h-10 relative" data-framer-name="Icon">
                  <div className="absolute inset-0 ">
                    <img className="w-full h-full block" src="https://framerusercontent.com/images/FYCYoM8VIfSiqoaZSgdFlktYPik.svg" alt="" />
                  </div>
                </div>
                <div className="flex flex-col  h-min relative">
                  <div className="flex">
                    <p className="text-[13px] text-black">Download on the</p>
                  </div>
                  <div className="flex">
                    <p className="text-[17px] text-black">App Store</p>
                  </div>
                </div>
              </Link>
          </div>
        </div>
        <div className="h-[398px] md:h-[548px] w-full flex lg:flex-1  justify-center rounded-3xl overflow-hidden relative">
            <div className="contents">
              <div className="absolute  ">
                <div >
                  <img className="w-full h-full" src="https://framerusercontent.com/images/MBNLu5qpu5it2G0jkxzHJ8LD8M.svg" alt="Background Image" />
                </div>
              </div>
            </div>

            <div className="absolute h-[300px] w-[300px] bottom-0 blur-[100px] m-auto bg-[radial-gradient(50%_49.99999999999999%_at_50%_49.99999999999999%,_#fff,_#fff0)]"></div>

            <div className="contents">
              <div className="w-[249px] h-[555px] md:h-[613px] absolute top-[62px] md:w-[310px]" >
                <div className="w-full h-full overflow-hidden relative">
                  <div className="absolute inset-0 bottom-0">
                    <img className="w-full object-cover object-center" src="https://framerusercontent.com/images/I9yRU9jEN2S2ol2M7kgT5c6zOrc.png" alt="Mobile Image"/>
                  </div>
                  <div className="rounded-[32px] inset-x-[10px] inset-y-[14px] absolute bg-black overflow-hidden">
                    <div className="inset-0 absolute rounded-[inherit] ">
                      <img src="https://framerusercontent.com/images/wY3nZb0IHOFXnNZW6Mm2BjRursc.png" alt="" className="w-full h-full block object-cover object-top rounded-[inherit]"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contents">
              <div className="absolute bottom-0 h-[254px] left-0 right-0 overflow-hidden">
                <div className=" absolute inset-0">
                  <img className="w-full h-full object-center" src="https://framerusercontent.com/images/Cwur5AdahGCKpWbBVpxhQGng0Hs.svg" alt=""/>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}