import { Link } from "react-router-dom";
import NewsUpdatePageComponents from "../NewsUpdatePage/NewsUpdatePageComponents";
import NewsLifeStylePageComponents from "./NewsLifeStylePageComponents";
import NewsMediaPageComponents from "../NewsMediaPage/NewsMediaPageComponents";
import { useState } from "react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Billboard from "@/app/components/homePage/billboard/Billboard";




interface News {
    newsID: number;
    newsTitle: string;
    newsSummary: string;
    thumbnail: string;
    newsDescription: string;
    dateCreate: string;
    details: string;
}
function NewLifeStylePage() {
    // const [newsLifeStyle, setnewsLifeStyle] = useState<News[]>([]);

    return (
        <div className='m-auto'>
            <div className="text-4xl font-semibold text-center text-mainBrown mt-10 mb-10">
                NÉT SỐNG XANH
            </div>
            <div className="mx-30 lg:mx-24  border-t border-gray-400"></div>
            {/* //News heading */}
            <div className="grid grid-cols-1 lg:grid-flow-row-dense lg:grid-cols-3 lg:grid-rows-2 gap-4 xl:mx-40 lg:mx-30 ">
                <div className="row-span-1 lg:row-span-2 lg:col-span-2 lg:border-r-2 border-gray-300 mt-6 gap-6 pr-0 lg:pr-3 pb-0 lg:pb-10">
                    <Link to="lop-hoc-trong-rung-tai-vuon-quoc-gia-Cuc-Phuong">
                        <img src="https://btnmt.1cdn.vn/2023/12/30/1(1).png" alt="anh"
                            className="inline object-cover w-full min-h-10" />
                        <Separator />
                        <p className="text-2xl text-center hover:text-green-500 font-semibold mt-4 ">'Lớp học trong rừng' tại Vườn quốc gia Cúc Phương</p>
                        <p className="mt-2">Với mục tiêu giáo dục học sinh ý thức bảo vệ môi trường, Hội đồng Đội T.Ư lần đầu tiên phối hợp với các đơn vị tổ chức đưa học sinh đi trải nghiệm 'lớp học trong rừng' tại Vườn quốc gia Cúc Phương.</p>
                    </Link>
                </div>
                <Link to="Quang-Nam-noi-hoi-ngo-cua-cac-du-an-quoc-te-bao-ton-dong-vat-hoang-da">
                    <div className="mt-6">
                        <img src="https://btnmt.1cdn.vn/2024/04/09/4(1).jpg" alt="anh" className="inline object-cover w-full min-h-10" />
                        <h2 className="text-xl hover:text-green-500 font-semibold m-2">Quảng Nam: Nơi “hội ngộ” của các dự án quốc tế bảo tồn động vật hoang dã</h2>
                    </div>
                </Link>
                <Link to="Quang-Nam-mit-ting-huong-ung-ngay-Moi-truong-the-gioi-2024">
                    <div className="mt-2">
                        <img src="https://btnmt.1cdn.vn/2024/06/04/moitruong4.jpg" alt="anh" className="inline object-cover w-full min-h-10" />
                        <h2 className="text-xl hover:text-green-500 font-semibold mt-2">Quảng Nam: Mít tinh hưởng ứng Ngày Môi trường thế giới 2024</h2>
                    </div>
                </Link>
            </div>

            <div className="mx-30 lg:mx-24  border-t border-gray-400"></div>
            {/* //OrderNews */}

            <div className="grid grid-cols-1 lg:grid-cols-4 xl:mx-40 lg:mx-30 my-10 gap-2">

                {/* {Array.isArray(newsUpdates) && newsUpdates.map(news => (
                    <Link to={`/news/update/${news.newsID}`} key={news.newsID}>
                        <div className="p-5 border border-gray-500">
                            <img src={news.thumbnail} alt="anh" />
                            <h1>{news.newsID}</h1>
                            <h2 className="text-2xl font-semibold">{news.newsTitle}</h2>
                            <Separator />
                            <p className="text-lg">{news.newsSummary}</p>
                        </div>
                    </Link>
                ))} */}
            </div>

            <div>
                <NewsLifeStylePageComponents />
            </div>
            <div>
                <NewsUpdatePageComponents />
            </div>
            <div className="my-5">
                <NewsMediaPageComponents />
            </div>

            <div className=" flex justify-center items-center mx-44 my-10 border rounded-3xl  bg-lime-400 py-5">
                <div >
                    <Billboard />
                </div>
            </div>
        </div>
    )
}

export default NewLifeStylePage