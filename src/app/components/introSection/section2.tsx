export default function Section2() {
  return (
    <div className="w-full flex flex-col gap-[60px]">
          <div className="w-full flex flex-col justify-center gap-2">
            <div className="w-20 md:w-24 aspect-square m-auto rounded-full overflow-hidden">
              <img alt="" src="/tweatflash.svg" className="w-full h-full" />
            </div>
            <div className="w-full flex justify-center">
              <h1 className="text-2xl font-bold md:text-5xl !leading-[1.2] text-black dark:text-white text-center">
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
  )
}
