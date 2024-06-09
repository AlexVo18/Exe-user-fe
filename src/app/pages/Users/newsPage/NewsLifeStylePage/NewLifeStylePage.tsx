import { Link } from "react-router-dom";

import { Separator } from "@radix-ui/react-dropdown-menu";




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
        <div className='mx-0 lg:mx-auto'>
            <div className="text-4xl font-semibold text-center text-mainBrown mt-10 mb-10">
                NÉT SỐNG XANH
            </div>
            <div className="mx-30 xl:mx-[168px] lg:mx-[200px] border-t border-gray-400"></div>
            {/* //News heading */}
            <div className="grid grid-cols-1 md:gird-cols-1 lg:grid-cols-1 xl:grid-flow-row-dense xl:grid-cols-3 lg:grid-rows-2 mx-2 xl:mx-40 lg:mx-48 ">
                <div className="row-span-1 xl:row-span-2 xl:col-span-2 xl:border-r-2 border-gray-300mx  mx-2 mt-6 lg:mt-6 pr-0 xl:pr-3">
                    <Link to="lop-hoc-trong-rung-tai-vuon-quoc-gia-Cuc-Phuong">
                        <img src="https://btnmt.1cdn.vn/2023/12/30/1(1).png" alt="anh"
                            className="inline object-cover w-full min-h-10" />
                        <Separator />
                        <p className="text-2xl mt-0 lg:mt-2 text-center hover:text-green-500 font-semibold">Lớp học trong rừng' tại Vườn quốc gia Cúc Phương</p>
                        <p className="mt-2">Với mục tiêu giáo dục học sinh ý thức bảo vệ môi trường, Hội đồng Đội T.Ư lần đầu tiên phối hợp với các đơn vị tổ chức đưa học sinh đi trải nghiệm 'lớp học trong rừng' tại Vườn quốc gia Cúc Phương.</p>
                    </Link>
                </div>
                <Link to="Quang-Nam-noi-hoi-ngo-cua-cac-du-an-quoc-te-bao-ton-dong-vat-hoang-da">
                    <div className="mt-6 mx-2 xl:mx-0 xl:mr-2">
                        <img src="https://btnmt.1cdn.vn/2024/04/09/4(1).jpg" alt="anh" className="inline object-cover w-full min-h-10" />
                        <h2 className="text-xl hover:text-green-500 font-semibold m-2">Quảng Nam: Nơi “hội ngộ” của các dự án quốc tế bảo tồn động vật hoang dã</h2>
                    </div>
                </Link>
                <Link to="Quang-Nam-mit-ting-huong-ung-ngay-Moi-truong-the-gioi-2024">
                    <div className="mt-1 mx-2 lg:mx-0 lg:mr-2">
                        <img src="https://btnmt.1cdn.vn/2024/06/04/moitruong4.jpg" alt="anh" className="inline object-cover w-full min-h-10" />
                        <h2 className="text-xl hover:text-green-500 font-semibold mt-2">Quảng Nam: Mít tinh hưởng ứng Ngày Môi trường thế giới 2024</h2>
                    </div>
                </Link>
            </div>

            <div className="invisible lg:invisible xl:visible mx-30 xl:mx-[168px]  border-t border-gray-400 mb-5"></div>
            {/* //OrderNews */}
        </div>
    )
}

export default NewLifeStylePage