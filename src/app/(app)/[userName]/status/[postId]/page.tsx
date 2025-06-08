type Props = {
  params: {
    postId: string;
  };
};
export default async function page({params:{postId}}:Props) {
  return (
    <div className="w-full h-auto"> 
      <div className="flex flex-col justify-center relative">
        <div className="flex justify-center"> 
          <div className="w-full max-w-[568px]">
            <div className="w-full pt-4 px-4">
              <h1 className="text-white text-lg font-[boldCal]" >
                {postId}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
