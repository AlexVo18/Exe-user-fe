import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorComponent from "../ErrorComponent";
import { Separator } from "@radix-ui/react-dropdown-menu";

interface News {
    newsID: number;
    newsTitle: string;
    newsSummary: string;
    thumbnail: string;
    newsDescription: string;
    dateCreate: string;
    details: string[];
}

const DetailPageAPI: React.FC = () => {
    let { id } = useParams();
    const [newsUpdatesAPI, setNewsUpdatesAPI] = useState<News[]>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://nuoicay.azurewebsites.net/api/home/news/detail/${id}`);
                const data = await response.json();
                setNewsUpdatesAPI(data);
            } catch (error) {
                setError(true);
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, [id]);
    console.log(newsUpdatesAPI);

    if (error) {
        return <ErrorComponent />;
    }


    return (
        <div>
            <h2>DetailPageAPI: {id}</h2>
            {/* <div className="my-20 flex flex-col md:flex-row justify-center overflow-hidden">
                <div className="w-full md:w-[740px] mx-3 mb-30"> */}
            {Array.isArray(newsUpdatesAPI) && newsUpdatesAPI.map(news => (
                <div key={news.newsID} className="p-5">
                    <img src={news.thumbnail} alt="anh" />
                    <h2 className="text-2xl font-semibold">{news.newsTitle}</h2>
                    <h2>{news.newsSummary}</h2>
                    <h2>{news.newsDescription}</h2>
                    <Separator />
                    <p className="text-lg">{news.newsSummary}</p>
                </div>
            ))}
            {/* </div>
            </div> */}
        </div>

    );
}

export default DetailPageAPI;