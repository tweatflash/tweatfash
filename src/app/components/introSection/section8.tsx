import Link from 'next/link'
import React from 'react'

export default function Section8() {
    const questions = [
        {
            id: 1,
            question: 'Popular Articles',
            answer: 'Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.',
        },
            {
            id: 2,
            question: 'Fix problems & request removals',
            answer: 'Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.',
        },
            {
            id: 3,
            question: 'Browse the web',
            answer: 'Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.',
        },
            {
            id: 4,
            question: 'Search on your phone or tablet',
            answer: 'Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.',
        },
        
    ]

    return (
        <footer className="p-[64px_40px] justify-center relative w-full flex flex-col gap-20 bg-[radial-gradient(27.274516120515756%_35.90163801120711%_at_50%_-2.7755575615628914e-14%,_#131315,_#000)]">
            <div className="bg-[radial-gradient(40%_50%_at_50%_50%,_#28282c,_#000)] absolute left-0 top-0 h-[1px] w-full z-1"></div>
            <div className='flex flex-col gap-[60px] m-auto max-w-[1200px] w-full'>
                <div className='flex flex-col md:flex-row gap-[20px] md:gap-[10px] justify-center w-full '>
                    <div className='flex-[3] flex flex-col gap-[30px]'>
                        <div className="w-full flex flex-col gap-[10px]">
                            <Link href="/" className='flex flex-row gap-[10px] w-min items-center'>
                                <div className='w-10 h-10 flex'>
                                    <img src="/tweatflash.svg" alt="Logo" className='w-full h-full object-contain' />
                                </div>
                                <div className='flex items-center'>
                                    <p className='text-[28px] tracking-[-0.56px] text-white spacing'>Tweatflash</p>
                                </div>
                            </Link> 
                            <div className='max-w-[350px] w-full'>
                                <p className='text-[16px] text-[#727272] leading-[1.2]'>Your trusted partner in AI solutions, creating smarter systems for smarter businesses.</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex-1'>
                        <div className='flex flex-row w-full gap-[10px]'>
                            <div className='flex-1 flex flex-col gap-[10px]'>
                                <div className='w-full'>
                                    <p className='text-[16px] text-white'>Sections</p>
                                </div>
                                <div className='w-full'>
                                    <p className='text-[14px]'>
                                        <Link href="" className='text-[#727272] hover:text-white'>Process</Link>
                                    </p>
                                </div>
                                <div className='w-full'>
                                    <p className='text-[14px]'>
                                        <Link href="" className='text-[#727272] hover:text-white'>Services</Link>
                                    </p>
                                </div>
                                <div className='w-full'>
                                    <p className='text-[14px]'>
                                        <Link href="" className='text-[#727272] hover:text-white'>Benefits</Link>
                                    </p>
                                </div>
                                <div className='w-full'>
                                    <p className='text-[14px]'>
                                        <Link href="" className='text-[#727272] hover:text-white'>Plans</Link>
                                    </p>
                                </div>
                                <div className='w-full'>
                                    <p className='text-[14px]'>
                                        <Link href="" className='text-[#727272] hover:text-white'>Contact</Link>
                                    </p>
                                </div>
                            </div>
                            <div className='flex-1 flex flex-col gap-[10px]'>
                                <div className='w-full'>
                                    <p className='text-[16px] text-white'>Pages</p>
                                </div>
                                <div className='w-full'>
                                    <p className='text-[14px]'>
                                        <Link href="" className='text-[#727272] hover:text-white'>Home</Link>
                                    </p>
                                </div>
                                <div className='w-full'>
                                    <p className='text-[14px]'>
                                        <Link href="" className='text-[#727272] hover:text-white'>404</Link>
                                    </p>
                                </div>
                                <div className='w-full'>
                                    <p className='text-[14px]'>
                                        <Link href="" className='text-[#727272] hover:text-white'>Login</Link>
                                    </p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
