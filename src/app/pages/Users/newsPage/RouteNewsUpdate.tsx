import { useParams } from 'react-router-dom';
import DetailPages01 from './NewsUpdatePage/NewsUpdateDetailPages/NewsUpdateDetailPages01';
import DetailPages02 from './NewsUpdatePage/NewsUpdateDetailPages/NewsUpdateDetailPages02';
import DetaiPages03 from './NewsUpdatePage/NewsUpdateDetailPages/NewsUpdateDetailPages03';
import DetailPageAPI from './DetailPagesAPI/DetailPageAPI';
import NewsLifeStyleDetailPages01 from './NewsLifeStylePage/NewsLifeStyleDetailPages/NewsLifeStyleDetailPages01';
import NewsLifeStyleDetailPages02 from './NewsLifeStylePage/NewsLifeStyleDetailPages/NewsLifeStyleDetailPages02';
import NewsLifeStyleDetailPages03 from './NewsLifeStylePage/NewsLifeStyleDetailPages/NewsLifeStyleDetailPages03';
import NewsMediaDetailPages01 from './NewsMediaPage/NewsMediaDetailPages/NewsMediaDetailPages01';
import NewsMediaDetailPages02 from './NewsMediaPage/NewsMediaDetailPages/NewsMediaDetailPages02';
import NewsMediaDetailPages03 from './NewsMediaPage/NewsMediaDetailPages/NewsMediaDetailPages03';

const DetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    switch (id) {
        case 'Binh-Thuan-tang-cuong-quan-ly-bao-ve-rung':
            return <DetailPages01 />;
        case 'Lang-Son-quan-ly-bao-ve-tai-nguyen-rung-tao-sinh-ke-ben-vung':
            return <DetailPages02 />;
        case 'bao-yen-lao-cai-quan-ly-rung-ben-vung-huong-den-khai-thac-tin-chi-carbon':
            return <DetaiPages03 />;
        case 'Quang-Nam-noi-hoi-ngo-cua-cac-du-an-quoc-te-bao-ton-dong-vat-hoang-da':
            return <NewsLifeStyleDetailPages01 />
        case 'lop-hoc-trong-rung-tai-vuon-quoc-gia-Cuc-Phuong':
            return <NewsLifeStyleDetailPages02 />
        case 'Quang-Nam-mit-ting-huong-ung-ngay-Moi-truong-the-gioi-2024':
            return <NewsLifeStyleDetailPages03 />
        case 'rung-xanh-len-voi-muc-tieu-trong-25ha-rung-noi-Hoa_Binh-Son-La':
            return <NewsMediaDetailPages01 />
        case 'thuc-day-hanh-dong-vi-khong-khi-sach-thanh-pho-xanh-tai-Ha-Noi':
            return <NewsMediaDetailPages02 />
        case 'thuc-day-vai-tro-luc-luong-phi-chinh-thuc-trong-thuc-hien-EPR':
            return <NewsMediaDetailPages03 />
        default:
            return <DetailPageAPI />;
    }
};

export default DetailPage;