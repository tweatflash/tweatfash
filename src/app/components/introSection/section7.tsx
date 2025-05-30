export default function Section7() {
    const testimony=[
        {
            text: "Tweatflash has truly transformed my social life. I've connected with amazing people and discovered new interests. Highly recommended!",
            name: "Emma Johnson",
            role: "Founder at Specra",
            image: "https://framerusercontent.com/images/VvQpIy1y1cSSlomZVLtZ5g6MY.png"
        },
        {
            text: "Using Tweatflash has been a game-changer for me. The connections I've made and the experiences I've had are unparalleled. It's a must-try!",
            name: "Paul Jessey",
            role: "CEO at Magic AI",
            image: "https://framerusercontent.com/images/w6nhBfckvD3enWdC7MdGroG3zYM.png" // Placeholder image
        },
        {
            text: "Tweatflash has revolutionized the way I interact with my friends and community. The features are intuitive and the design is sleek.",
            name: "Olivia Brown",
            role: "Designer at CreativeHub",
            image: "https://framerusercontent.com/images/DsQBHRyqYMW0j9DEkiDEFfYhI6Q.png" // Placeholder image
        },
        {
            text: "I love how Tweatflash brings people together. The platform is user-friendly and the community is vibrant. It's my go-to app for socializing.",
            name: "Augustine Godwin",
            role: "Marketing Manager",
            image: "https://framerusercontent.com/images/q8tlzXQaCG8gQHuuiRSRgpqUbc.png" // Placeholder image
        }
       
    ]
    return (
        <div className="pt-[80px] relative w-full flex flex-col gap-20 bg-[radial-gradient(27.274516120515756%_35.90163801120711%_at_50%_-2.7755575615628914e-14%,_#131315,_#000)]">
            <div className="bg-[radial-gradient(40%_50%_at_50%_50%,_#28282c,_#000)] absolute top-0 h-[1px] w-full z-1"></div>
            <div className="w-full realative h-auto">
                <div className="w-full flex items-center flex-col gap-[14px] relative">
                    <div className="flex items-center w-min  flex-row gap-1 overflow-hidden p-[10px_12px] border border-[hsl(var(--border-color))] rounded-full bg-[hsl(var(--accent))]">
                        <div className="w-5 h-5 relative">
                            <div className="absolute inset-0">
                                <img className="w-full h-full" src="https://framerusercontent.com/images/kQr6giL6HveRQhi7tiDl3MKDuo.svg" alt="Icon"/>
                            </div>
                        </div>
                        <div>
                            <p className="text-[16px] text-white ">Testimonials</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 max-w-[1200px] w-full">
                        <div className="flex items-center justify-center w-full">
                            <h2 className="font-bold text-[38px] md:text-[58px] text-white text-center leading-[1.2]">Our Testimonials</h2>
                        </div>
                        <div className="flex lg:px-[320px] px-0">
                            <div className="w-full flex justify-center">
                                <p className="text-[#727272] text-lg text-center">See how Appit has transformed users social experiences through their own words.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full overflow-hidden relative h-auto slider">
                <div className="slide-track flex gap-5 ">
                    {testimony.map((item, index) => (
                        <div className="slide h-auto w-[358px] relative"  key={index}>
                            <div className="flex flex-col gap-6 p-[30px] relative">
                                <div className="absolute inset-0 left-0 top-0 right-0 z-0">
                                    <div className="absolute inset-0">
                                        <img className="w-full h-auto object-cover object-top" src="https://framerusercontent.com/images/G4xxX7meBEZQwfzDvZvv41TMW0.svg" alt="Background Image" />
                                    </div>
                                </div>
                                <div className="flex z-1 opacity-100">
                                    <p className="text-[16px] text-[#727272] z-10 font-medium">{item.text}</p>
                                </div>
                                <div className="flex gap-3 pt-5 relative items-center w-full flex-row border-t border-[rgb(29,29,32)]">
                                    <div className="w-[50px] h-[50px] relative">
                                        <div className="absolute inset-0">
                                            <img className="w-full h-full object-cover" src={item.image} alt="Profile Image" />
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col h-min">
                                        <div className="flex items-center">
                                            <p className="text-[20px] text-white font-[500]">{item.name}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <p className="text-sm text-[#727272]" >{item.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                   
                </div>
            </div>
        </div>
    )
}
