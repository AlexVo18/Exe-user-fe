import { useParams } from "react-router-dom";
import NewLifeStylePage from "./NewsLifeStylePage/NewLifeStylePage";
import NewsUpdatePage from "./NewsUpdatePage/NewsUpdatePage";
import NewsMediaPage from "./NewsMediaPage/NewsMediaPage";


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
      return <h1>Unknown news type</h1>;
  }
}


export default News