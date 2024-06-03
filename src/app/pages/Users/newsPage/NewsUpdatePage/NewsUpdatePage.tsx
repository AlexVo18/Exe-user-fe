import { Separator } from "../../../../components/ui/separator";
import React from 'react';
import SlideNewsPages from "../SlideNewsPages";
interface News {
  id: number;
  title: string;
  content: string;
}
const NewsUpdatePage: React.FC = () => {
  const newsUpdates: News[] = [
    { id: 1, title: 'News 1', content: 'This is news 1' },
    { id: 2, title: 'News 2', content: 'This is news 2' },
    { id: 3, title: 'News 3', content: 'This is news 3' },
    { id: 4, title: 'News 4', content: 'This is news 4' },
    { id: 5, title: 'News 5', content: 'This is news 5' },
    { id: 6, title: 'News 6', content: 'This is news 6' },
    { id: 7, title: 'News 7', content: 'This is news 7' },
  ];
  return (
    <div className="mt-auto">
      <div className='container mx-auto'>
        <div className="text-4xl font-semibold text-center text-mainBrown mt-10 mb-10">
          CẬP NHẬT TIN TỨC HÀNG THÁNG
        </div>
        <div className="mx-30 lg:mx-24  border-t border-gray-400"></div>
        {/* //News heading */}
        <div className="grid grid-cols-1 lg:grid-cols-2  xl:mx-40 lg:mx-30 ">

          <div className="row-span-1 lg:row-span-2  lg:border-r-2 border-gray-300  mt-6 gap-6 pr-0 lg:pr-3 ">
            <img src="https://btnmt.1cdn.vn/thumbs/900x600/2024/05/30/anh-2.jpg" alt="anh"
              className="inline object-cover w-full min-h-10" />
            <Separator />
            <p className="text-2xl text-center  hover:text-green-500 font-semibold text-size">Bình Thuận: Tăng cường quản lý bảo vệ rừng</p>
            <p>(TN&MT) – Cơ quan chức năng trên địa bàn tỉnh Bình Thuận đã triển khai thực hiện nhiều biện pháp ngăn chặn, xử lý tình trạng phá rừng nhằm góp phần nâng cao hiệu quả trong công tác quản lý.</p>
          </div>
          <div className="mt-6 pl-0 lg:pl-3">
            <h2 className="text-2xl font-semibold">img</h2>
            <Separator />
            <p className="text-lg">content</p>
          </div>
          <div className="border-2 border-gray-400 p-10 mt-6">
            <h2 className="text-2xl font-semibold">img</h2>
            <Separator />
            <p className="text-lg">content</p>
          </div>

        </div>

        <div className="mx-30 lg:mx-24  border-t border-gray-400"></div>
        {/* //OrderNews */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:mx-40 lg:mx-30 my-10 gap-2">
          {newsUpdates.map((news, index) => (
            <div
              key={news.id}
              className={`border-2 border-gray-400 p-5 '}`}
            >
              <h2 className="text-2xl font-semibold">{news.title}</h2>
              <Separator />
              <p className="text-lg">{news.content}</p>
            </div>
          ))}
        </div>
        {/* SlideNews */}
        <div className="flex flex-wrap">
          <SlideNewsPages newsUpdates={newsUpdates} />
        </div>
      </div>

    </div>
  );
}

export default NewsUpdatePage;