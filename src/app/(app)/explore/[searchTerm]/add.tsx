'use client'

import { Fragment, useEffect, useState ,useRef, useContext} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import getExplorePosts from '../../../../../lib/explore'
import CreatePostDialog from '../../../components/addPost/S'

export default function Generate() {
    const ref=Cookies.get("RFTFL")
    const acc=Cookies.get("ACTFL")
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<any>({})
    const [loading, setLoading] = useState(false)
    const abortRef = useRef<AbortController | null>(null)
    const router = useRouter()
    const refs = useRef<HTMLDivElement>(null)
    const [html, setHtml] = useState('')
    const editableRef = useRef<HTMLDivElement>(null)
    const [placeholderVisible, setPlaceholderVisible] = useState(true)
    const [openSearch , setOpenSearch]: any = useState(true)
    /* keyboard shortcut: ⌘K / CtrlK toggles palette */
    const handlePush=(data:string)=>{
        console.log(data)
        router.push(data)
        setOpenSearch(false)
        setQuery("")
    }
    useEffect(() => {
        const toggle = (e: KeyboardEvent) => {
        const hotKey = (e.metaKey || e.ctrlKey) && e.key === 'c'
        if (hotKey) {
            e.preventDefault()
            setOpenSearch((prev:boolean) => !prev)
        }
        if (e.key === 'Escape') setOpenSearch(false)
        }
        window.addEventListener('keydown', toggle)
        return () => window.removeEventListener('keydown', toggle)
    }, [])

    /* reset search text whenever we close */
    useEffect(() => {
        if (!openSearch) setQuery('')
    }, [open])
    async function petch(){
        const data : any=await getExplorePosts(query,ref,acc)
        const result :any= await data
        if (!result || result===undefined){
            setLoading(false)
            console.log("undefined")
        }else{
            setLoading(false)
            setResults(result)
            
        }
    }
    /* --------------------------------------------------------------------- */
    useEffect(() => {
        // 1️⃣ Ignore empty queries
        if (!query.trim()) { 
            setResults({}) 
            setLoading(false) 
            return 
        }
        setLoading(true)
        // 2️⃣ Debounce: fire only after 300 ms of silence
        const id = setTimeout(() => {
            // 3️⃣ Cancel the previous in-flight request (if any)
            abortRef.current?.abort()
            const controller = new AbortController()
            abortRef.current = controller
            petch()
        }, 300)

        // // Cleanup for the debounce timer
        return () => clearTimeout(id)

    }, [query])
    useEffect(()=>{
        if (openSearch==false){
            setQuery("")
        }
    },[openSearch])
    useEffect(() => {
        // for browsers that support it
        document.execCommand('defaultParagraphSeparator', false, 'br')
      }, [])
    
      // 3) Show/hide placeholder
      const onInput = () => {
        const txt = editableRef.current?.innerText || ''
        setPlaceholderVisible(txt.trim().length === 0)
      }
    
      const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          // insert two <br> so you get a blank line
          document.execCommand('insertHTML', false, '<br><br>')
          onInput()
        }
      }
    return (
        <Transition show={openSearch} as={Fragment}>
        <Dialog onClose={() => {
            setOpenSearch(false)
            setQuery("")
        }} className="fixed bg-black/60 inset-0 z-50">
            {/* backdrop */}
            <Transition.Child
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
            <div className="absolute inset-0 hidden bg-black/60" />
            </Transition.Child>

            {/* panel */}
            <Transition.Child
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-50 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-50 scale-95"
            >
            <Dialog.Panel className="mx-auto mt-0 mobile:bg-transparent bg-[hsl(var(--background))] mobile:mt-[55px] w-full mobile:max-w-[600px] max-w-full mobile:px-4 min-h-full mobile:min-h-fit">
                <Command
                    className="overflow-hidden mobile:rounded-xl mobile:border mobile:border-[hsl(var(--border-color))] mobile:shadow-2xl mobile:bg-[hsl(var(--background))]"
                >
                {/* search input */}
                <div className="border-b sm:border-none relative border-zinc-200 dark:border-zinc-700 h-[55px] flex flex-row justify-between  gap-1">
                    <div className='aspect-square h-[55px] p-2'>
                        <button className="h-full aspect-square hover:bg-[hsl(var(--accent))] rounded-full flex justify-center items-center"
                            onClick={()=>setOpenSearch(false)}
                        >
                        
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="fill-black dark:fill-white size-5"
                            style={{ color: "rgb(239, 243, 244)" }}
                        >
                        <g>
                            <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z" />
                        </g>
                        </svg>

                        </button>
                    </div>
                    <div className='h-full flex flex-1 justify-between items-center pr-4'>
                        <h2 className='text-[--color] text-lg font-bold'>Create Post</h2>
                        <button className="px-4 rounded-xl bg-[hsl(var(--accent))] text-[#727272] text-[15px] py-[2px]">drafts</button>
                    </div>
                </div>
                <div className='pt-2 w-full px-2'>
                    <div className="flex flex-col relative border-b border-solid border-[hsl(var(--border-color))] last:border-none last:border-b-0">
                        <div className="flex flex-col py-3 w-full">
                            <div className="gap-3 flex item-start w-full px-4 ">
                                <div>
                                    <div className="w-9 h-9 rounded-[50%] border border-[hsl(var(--border-color))] bg-[hsl(var(--accent))]">
                                        <img
                                            alt=""
                                            src="https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png"
                                            className="h-full w-full object-cover object-center rounded-full"
                                        />
                                    </div>
                                </div>
                                <div className="w-full h-auto flex flex-col">
                                    <div className="w-full relative">
                                        <div
                                            ref={editableRef}
                                            contentEditable
                                            suppressContentEditableWarning
                                            role="textbox"
                                            aria-multiline="true"
                                            tabIndex={0}
                                            className={`
                                            w-full min-h-[6rem] max-h-[20rem] overflow-auto
                                            whitespace-pre-wrap break-words
                                            bg-transparent text-current outline-none p-3
                                            
                                            `}
                                            onInput={onInput}
                                            onKeyDown={onKeyDown}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                {/* results */}
                {/* <Command.List className="h-fit overflow-y-auto p-2 flex flex-col">
                    {query && results && <Command.Item tabIndex={-1} className='flex-1 aria-selected:bg-[hsl(var(--accent))] flex px-2 py-2 cursor-pointer rounded-lg'>
                        <div className='w-full flex-1 h-10 rounded-xl flex flex-row ' onClick={()=>handlePush(`/explore/${query}`)}>
                            <div className='h-full aspect-square flex justify-center items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-black dark:stroke-white"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                            </div>
                            <div className='flex-1 h-full flex items-center '>
                                <div>
                                    <span className='text-[--color] text-sm'>Search for <b>{query}</b></span>
                                </div>
                            </div>
                        </div>
                    </Command.Item>}
                    {results.user && results.user.map((cmd:Person,index:number) => (
                        <Command.Item
                            key={index}
                            value={cmd._id}
                            onSelect={() => {
                                setOpenSearch(false)
                                router.push(`/${cmd.username}`)
                            // if (cmd.action) cmd.action()
                            }}
                            className="flex cursor-pointer items-center justify-between
                                    rounded-md px-3 py-2 text-sm text-[--color]
                                    aria-selected:bg-zinc-100 dark:aria-selected:bg-[hsl(var(--accent))]"
                        >
                            <Person userObj={cmd} key={index} />
                        </Command.Item>
                    ))}

                    <Command.Empty className="p-3 text-center text-xs text-zinc-500">
                        No result
                    </Command.Empty>
                </Command.List> */}
                </Command>
            </Dialog.Panel>
            </Transition.Child>
        </Dialog>
        </Transition>
    )
}