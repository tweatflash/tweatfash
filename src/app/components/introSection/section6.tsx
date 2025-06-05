export default function Section6() {
    const feautres=[
        {
            "title":"Customizable Profiles",
            "titleImg":"https://framerusercontent.com/images/HjUlVlaeVs5qamaZtWxKr7EoTNY.svg",
            "description":"Personalize your profile with themes, layouts, and settings.",
            "blogImg":"https://framerusercontent.com/images/X0Vl8CpTeSTA8DdhJhhjv4ll8ZQ.png"
        },
        {
            "title":"Verified Users",
            "titleImg":"https://framerusercontent.com/images/4d3xrHbTj5Ms5diHGITxfxhNWE.svg",
            "description":"Personalize your profile with themes, layouts, and settings.",
            "blogImg":"https://framerusercontent.com/images/SgBTdEbC2kWCbLFQfnCHZpn3Jw.png"
        },
        {
            "title":"Smart Notifications",
            "titleImg":"https://framerusercontent.com/images/ibG0LiimnkUTSfKg66O30GRXw.svg",
            "description":"Get real-time alerts for the updates that matter to you.",
            "blogImg":"https://framerusercontent.com/images/n4njaiteTaVrq1KL1O5iAE2nI8.png"
        },
        {
            "title":"Account Insights",
            "titleImg":"https://framerusercontent.com/images/k172RybSC5AgmTnr7g2w13DUXM.svg",
            "description":"Track your engagement and performance with detailed analytics.",
            "blogImg":"https://framerusercontent.com/images/ccnTzZyQjyrmUv1jY98k7JQNj0.png"
        },
        {
            "title":"Easy Messaging",
            "titleImg":"https://framerusercontent.com/images/rnEb8tJo8lTbNSRlcrJXd3Hp4oY.svg",
            "description":"Chat seamlessly with friends and groups through an intuitive interface.",
            "blogImg":"https://framerusercontent.com/images/9oeJvwWkztzYPVxzLFz36e0oEc.png"
        },
        {
            "title":"Post Scheduling",
            "titleImg":"https://framerusercontent.com/images/oicYIMrKrcr3XUdyPDOIw5qHg.svg",
            "description":"Plan and schedule posts to share content at the perfect time.",
            "blogImg":"https://framerusercontent.com/images/tGoB3F9x6jrFw9OxuiFq40o0HEg.png"
        },

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
                            <p className="text-[16px] text-white ">Features</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 max-w-[1200px] w-full">
                        <div className="flex items-center justify-center w-full">
                            <h2 className=" text-[38px] md:text-[58px] text-white text-center leading-[1.2]">Discover Tweatflash Features</h2>
                        </div>
                        <div className="flex lg:px-[320px] px-0">
                            <div className="w-full flex justify-center">
                                <p className="text-[#727272] text-lg text-center">Explore Appit's powerful features designed to help you connect, share, and engage with your community effortlessly.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                {feautres.map((item,index)=>(
                    <div className="w-full relative " key={index}>
                        <div className="w-full h-min rounded-[20px] border border-[hsl(var(--border-color))] bg-[#0F0F0F] flex flex-col">
                        <div className="max-h-[294px] h-auto aspect-[1.316326530612245/1] w-full relative flex justify-center flex-col overflow-hidden">
                            <div className="flex-1 w-full relative h-auto">
                                <div className="absolute inset-0 h-auto">
                                    <img className="w-full h-auto " src={item.blogImg} alt=""/>
                                </div>
                            </div>
                            <div className="absolute h-[175px] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,#0F0F0F_100%)] w-full bottom-0">
                                <div className="absolute bottom-0">
                                    <img className="w-full h-full hidden" src="https://framerusercontent.com/images/vSXeDeiftCFIZjNVBWtvTj0ibk.svg" alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 p-[30px_30px_24px] flex-col relative w-full">
                            <div className="flex flex-row gap-[6px] items-center">
                                <div className="w-6 h-6 relative">
                                    <div className="absolute w-full h-full flex items-center">
                                        <img className="w-full h-full" src={item.titleImg} alt="" />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-[20px] text-white">{item.title}</h3>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[#727272] text-[18px]">{item.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
                
            </div>
        </div>
    )
}
