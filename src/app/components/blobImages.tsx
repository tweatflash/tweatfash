import { useEffect, useState } from "react"

type Param={
    mediaList:any,
    setMediaList:any,
    setSelectedFiles:any
}
export default function BlobImages(
    {
        mediaList,
        setMediaList,
        setSelectedFiles
    }:Param
) {
    const [padding, setPadding] = useState<number>(0);
    const getHeight = (element: {type:string,url:string}) => {
        if (element.type==="image"){
            const img: any = new Image();
            img.src = element.url;

            img.onload = () => {
            var hgh = img.naturalWidth / img.naturalHeight;
            var data = 100 / hgh;
            setPadding(data >= 133 ? 133: data);
            };
        }else{
        const video = document.createElement('video');
        video.src = element.url // 'element' is your File object
        video.preload = 'metadata';

        video.onloadedmetadata = () => {
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            const aspectRatio = videoWidth / videoHeight;
            const data = 100 / aspectRatio;
            setPadding(data >= 133 ? 133 : data);
        };
    }  
  }
    const handleDelete = (fileToDelete:{type:string,url:string,file:any}) => {
        setMediaList((prev:any) => prev.filter((media:any) => media.url !== fileToDelete.url));
        setSelectedFiles((prev:any) =>
            prev.filter((file:any) => file !== fileToDelete.file)
        );
    };
    useEffect(() => {
        if (mediaList.length) getHeight(mediaList[0]);
    }, [mediaList]);
    
    if (mediaList.length) return (
        <div className="w-full overflow-x-scroll no-scrollbar">
            <div className="w-full h-full">
                <div className="w-auto h-auto  relative flex items-stretch">
                
                <div
                    style={
                    mediaList.length > 1
                        ? { paddingBottom: "57%" }
                        : { paddingBottom: `${padding}%` }
                    }
                    className="w-full max-h-[690px]"
                ></div>
                <div className="h-full absolute w-full top-0 rounded-lg">
                    <div className="flex-1  gap-3 h-full relative shrink grow flex scroll-px-9 scroll-py-0 snap-x overflow-x-scroll overflow-y-scroll no-scrollbar  flex-row snap-mandatory flex-nowrap">
                    {mediaList.map(
                        (file: any, index: number) => (
                        <div
                            key={index}
                            className={`snap-start stretch ${
                            mediaList.length === 1
                                ? "w-full"
                                : "w-[50%]"
                            } h-full bg-[hsl(var(--accent))] flex justify-center relative border-[hsl(var(--border-color))] shrink-0 border rounded-lg overflow-hidden`}

                            
                        >
                            <div className="absolute z-[4] top-0 left-0 px-3 py-2 w-full flex justify-end">
                            <div className="size-8 text-white cursor-pointer rounded-full bg-black/75 flex justify-center items-center" 
                                onClick={() =>{
                                
                                    handleDelete(file)
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>

                            </div>
                            </div>
                            {
                            file.type.startsWith('image') ?<img
                                src={file.url}
                                className="object-cover object-center w-full h-full"
                            />:
                            <video controls  src={file.url} className="object-cover object-center w-full h-full"></video>
                            }
                            
                        </div>
                        )
                    )}
                    </div>
                </div>
                </div>
            </div>
        </div>              
    )
    return <></>
}
