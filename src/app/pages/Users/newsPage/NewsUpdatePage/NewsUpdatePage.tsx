import { Separator } from "../../../../components/ui/separator";
import { Link } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
interface News {
  newsID: number;
  newsTitle: string;
  newsSummary: string;
  thumbnail: string;
  newsDescription: string;
  dateCreate: string;
  details: string;
}

const NewsUpdatePage: React.FC = () => {
  const [newsUpdates, setNewsUpdates] = useState<News[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://nuoicay.azurewebsites.net/api/home/news/type/1');
        const data = await response.json();
        setNewsUpdates(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='mx-0 lg:mx-auto'>
      <div className="text-4xl font-semibold text-center text-mainBrown mt-10 mb-10">
        CẬP NHẬT TIN TỨC HÀNG THÁNG
      </div>
      <div className="mx-30 lg:mx-24  border-t border-gray-400"></div>
      {/* //News heading */}
      <div className="grid grid-cols-1 lg:grid-flow-row-dense lg:grid-cols-3 lg:grid-rows-2 gap-4 xl:mx-40 lg:mx-30 ">
        <div className="row-span-1 lg:row-span-2 lg:col-span-2 lg:border-r-2 border-gray-300mx mx-2 mt-6 gap-6 pr-0 lg:pr-3 pb-0 lg:pb-10">
          <Link to="Binh-Thuan-tang-cuong-quan-ly-bao-ve-rung">
            <img src="https://btnmt.1cdn.vn/thumbs/900x600/2024/05/30/anh-2.jpg" alt="anh"
              className="inline object-cover w-full min-h-10" />
            <Separator />
            <p className="text-2xl text-center hover:text-green-500 font-semibold">Bình Thuận: Tăng cường quản lý bảo vệ rừng</p>
            <p className="text-justify">(TN&MT) – Cơ quan chức năng trên địa bàn tỉnh Bình Thuận đã triển khai thực hiện nhiều biện pháp ngăn chặn, xử lý tình trạng phá rừng nhằm góp phần nâng cao hiệu quả trong công tác quản lý.</p>
          </Link>
        </div>
        <Link to="Lang-Son-quan-ly-bao-ve-tai-nguyen-rung-tao-sinh-ke-ben-vung">
          <div className="mt-6 mx-2">
            <img src="https://btnmt.1cdn.vn/thumbs/540x360/2024/05/23/20240522_081400.jpg" alt="anh" className="inline object-cover w-full min-h-10" />
            <h2 className="text-xl hover:text-green-500 font-semibold mt-2">Lạng Sơn: Quản lý, bảo vệ tài nguyên rừng, tạo sinh kế bền vững</h2>
          </div>
        </Link>
        <Link to="bao-yen-lao-cai-quan-ly-rung-ben-vung-huong-den-khai-thac-tin-chi-carbon">
          <div className="mt-2 mx-2">
            <img src="https://btnmt.1cdn.vn/thumbs/540x360/2024/05/10/rung-3.jpg" alt="anh" className="inline object-cover w-full min-h-10" />
            <h2 className="text-xl hover:text-green-500 font-semibold mt-2">Bảo Yên(Lào Cai): Quản lý rừng bền vững hướng đến khai thác tín chỉ carbon</h2>
          </div>
        </Link>
      </div>

      <div className="invisible lg:visible mx-30 lg:mx-24  border-t border-gray-400"></div>
      {/* //OrderNews */}

      <div className="grid grid-cols-1 lg:grid-cols-4 mx-2 xl:mx-40 lg:mx-30  my-10 gap-3">

        {Array.isArray(newsUpdates) && newsUpdates.map(news => (
          <Link to={`/news/update/${news.newsID}`} key={news.newsID}>
            <div className=" border border-gray-500">
              <img src={news.thumbnail} alt="anh"
                className="inline object-fill h-52 w-full" />
              <h1>{news.newsID}</h1>
              <h2 className="text-2xl text-center hover:text-green-500 font-semibold">{news.newsTitle}</h2>
              <Separator />
              <p className="text-lg text-justify">{news.newsSummary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>

  );
}

export default NewsUpdatePage;