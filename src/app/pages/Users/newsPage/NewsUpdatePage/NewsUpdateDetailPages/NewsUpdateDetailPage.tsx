import { useParams } from 'react-router-dom';
import DetailPages01 from './NewsUpdateDetailPages01';
import DetailPages02 from './NewsUpdateDetailPages02';
import DetaiPages03 from './NewsUpdateDetailPages03';
import DetailPageAPI from './NewsUpdateDetailPageAPI';

const DetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    switch (id) {
        case 'Binh-Thuan-tang-cuong-quan-ly-bao-ve-rung':
            return <DetailPages01 />;
        case 'Lang-Son-quan-ly-bao-ve-tai-nguyen-rung-tao-sinh-ke-ben-vung':
            return <DetailPages02 />;
        case 'bao-yen-lao-cai-quan-ly-rung-ben-vung-huong-den-khai-thac-tin-chi-carbon':
            return <DetaiPages03 />;
        default:
            return <DetailPageAPI />;
    }
};

export default DetailPage;