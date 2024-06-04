import { useParams } from "react-router-dom";
import NewLifeStylePage from "./NewsLifeStylePage/NewLifeStylePage";
import NewsUpdatePage from "./NewsUpdatePage/NewsUpdatePage";
import NewsMediaPage from "./NewsMediaPage/NewsMediaPage";
import ErrorComponent from "./ErrorComponent";


const News = () => {
  const { type } = useParams();

  switch (type) {
    case 'update':
      return <NewsUpdatePage />;
    case 'media':
      return <NewsMediaPage />;
    case 'life-style':
      return <NewLifeStylePage />;
    default:
      return <ErrorComponent />;
  }
}


export default News