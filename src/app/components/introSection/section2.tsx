export default function Section2() {
  return (
    <div className="w-full flex flex-col gap-[40px] ">
      <div className="py-2 px-4 m-auto border flex rounded-full bg-[#0f0f0f] border-[hsl(var(--border-color))] w-fit gap-1">
        <div className="h-5 w-5 ">
          <img className="w-full h-full" src="https://framerusercontent.com/images/o8k4hpBGZSqpjSgLI7W0kJLJuw4.svg"/>
        </div>
        <div>
          <p className="text-4 text-black dark:text-white">Who we are</p>
        </div>
      </div>
      <div className="w-full flex justify-center bg-[radial-gradient(28.000000000000004%_25%_at_50%_50%,rgba(81,47,235,.15)_0%,rgba(171,171,171,0)_100%)]">
        <div className="flex text-center max-w-[800px] w-full">
          <h3 className="leading-[1.4em] text-white text-[26px] md:text-[32px] lg:text-[40px]  "><span>We</span> <span>are</span> <span>Radison,</span> <span>we</span> <span>help</span> <span>founders</span> <span>like</span> <span>you</span> <span>to</span> <span>automate</span> <span>their</span> <span>day</span> <span>to</span> <span>day</span> <span>business</span> <span>operations</span> <span>with</span> <span>the</span> <span>help</span> <span>of</span> <span>AI</span></h3>
        </div>
      </div>
    </div>
  )
}
