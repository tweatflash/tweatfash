import SavedPosts from "@/app/components/posts/savedPosts"

export default function Bookmarks() {
  
  return (
    <div className="w-full h-auto"> 
      <div className="flex flex-col justify-center relative">
        <div className="flex justify-center"> 
          <div className="w-full max-w-[568px] text-[--color] flex gap-4 flex-col " >
            <div className="flex w-full pt-4 gap-3 flex-col relative" >
                <div className="w-full px-4">
                  <label htmlFor="saved-search" className="inline-flex items-center gap-2 border h-auto has-[input:focus]:border-[#4070f4] border-[hsl(var(--border-color))]  px-4 py-2 relative w-full justify-start rounded-[0.5rem]  text-sm font-normal shadow-none text-[#727272]">
                    <div className="pointer-events-none h-5 select-none items-center gap-1 rounded border border-[hsl(var(--border-color))] bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                        <span className="text-xs">⌘</span>K
                    </div>
                    <form className=" flex-1">
                        <input
                            type="text"
                            className="w-full bg-transparent outline-none placeholder-[#727272] border-none h-6 text-[--color]"
                            placeholder="Search Bookmarks..."
                            // value={search}
                            // onChange={(e)=>setSearch(e.target.value)}
                            id="saved-search"
                        />
                    </form>
                  
                  </label>
                </div>
                <SavedPosts />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
