import type { Metadata } from 'next'
export const metadata :Metadata= {
  title: 'Posts engaugment',
  description:'People who found this post engauging',
}
export default function EngaugementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-auto">
      <div className="flex flex-col justify-center relative">
        <div className="flex justify-center">
          <div className="w-full max-w-[568px]">
            <div className="w-full text-[--color] flex flex-col gap-5">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
