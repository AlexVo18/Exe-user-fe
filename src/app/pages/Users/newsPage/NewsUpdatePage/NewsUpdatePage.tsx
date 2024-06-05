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
    <div className='mx-0 xl:lg:mx-auto'>
      <div className="text-4xl font-semibold text-center text-mainBrown mt-10 mb-10">
        CẬP NHẬT TIN TỨC HÀNG THÁNG
      </div>
      <div className="mx-30 xl:mx-[168px] lg:mx-[200px] border-t border-gray-400"></div>
      {/* //News heading */}
      <div className="grid grid-cols-1 md:gird-cols-1 lg:grid-cols-1 xl:grid-flow-row-dense xl:grid-cols-3 lg:grid-rows-2 mx-2 xl:mx-40 lg:mx-48 ">
        <div className="row-span-1 xl:row-span-2 xl:col-span-2 xl:border-r-2 border-gray-300mx  mx-2 mt-6 lg:mt-6 pr-0 xl:pr-3">
          <Link to="Binh-Thuan-tang-cuong-quan-ly-bao-ve-rung">
            <img src="https://btnmt.1cdn.vn/thumbs/900x600/2024/05/30/anh-2.jpg" alt="anh"
              className="inline object-cover w-full min-h-10" />
            <Separator />
            <p className="text-2xl mt-0 lg:mt-2 text-center hover:text-green-500 font-semibold">Bình Thuận: Tăng cường quản lý bảo vệ rừng</p>
            <p className="text-justify">(TN&MT) – Cơ quan chức năng trên địa bàn tỉnh Bình Thuận đã triển khai thực hiện nhiều biện pháp ngăn chặn, xử lý tình trạng phá rừng nhằm góp phần nâng cao hiệu quả trong công tác quản lý.</p>
          </Link>
        </div>
        <Link to="Lang-Son-quan-ly-bao-ve-tai-nguyen-rung-tao-sinh-ke-ben-vung">
          <div className="mt-6 mx-2 xl:mx-0 xl:mr-2">
            <img src="https://btnmt.1cdn.vn/thumbs/540x360/2024/05/23/20240522_081400.jpg" alt="anh" className="inline object-cover w-full min-h-10" />
            <h2 className="text-xl hover:text-green-500 font-semibold mt-2">Lạng Sơn: Quản lý, bảo vệ tài nguyên rừng, tạo sinh kế bền vững</h2>
          </div>
        </Link>
        <Link to="bao-yen-lao-cai-quan-ly-rung-ben-vung-huong-den-khai-thac-tin-chi-carbon">
          <div className="mt-1 mx-2 lg:mx-0 lg:mr-2">
            <img src="https://btnmt.1cdn.vn/thumbs/540x360/2024/05/10/rung-3.jpg" alt="anh" className="inline object-cover w-full min-h-10" />
            <h2 className="text-xl hover:text-green-500 font-semibold mt-2">Bảo Yên(Lào Cai): Quản lý rừng bền vững hướng đến khai thác tín chỉ carbon</h2>
          </div>
        </Link>
      </div>
      <div className="invisible lg:invisible xl:visible mx-30 xl:mx-[168px]  border-t border-gray-400 mb-5"></div>
      {/* //OrderNews */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 mx-2 xl:mx-[164px] my-10 gap-3 lg:mt-5 md:gap-5 lg:gap-5 xl:gap-8 xl:mt-9">
        {Array.isArray(newsUpdates) && newsUpdates.map(news => (
          <Link to={`/news/update/${news.newsID}`} key={news.newsID}>
            <div className="flex-none md:flex lg:flex xl:flex-none mx-2 md:mx-[186px] lg:mx-[186px] xl:mx-2">
              <img src={news.thumbnail} alt="anh"
                className="inline object-fill h-64 w-80 md:lg:w-72 md:lg:h-64   xl:w-48 xl:h-40 mr-0 md:lg:mr-2" />
              <div className=" flex:none md:flex-grow md:flex md:flex-col md:w-9 text-pretty">
                <h2 className="mt-2 text-2xl md:lg:text-left hover:text-green-500 font-semibold">{news.newsTitle}</h2>
                <p className="text-lg text-justify md:text-left">{news.newsSummary}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NewsUpdatePage;