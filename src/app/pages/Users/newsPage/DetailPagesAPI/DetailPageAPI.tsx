import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorComponent from "../ErrorComponent";
import { Separator } from "@radix-ui/react-dropdown-menu";
import BreadcrumbsNewsUpdate from "../NewsUpdatePage/BreadcrumbsNewsUpdate";
import BreadcrumbsNewsMedia from "../NewsMediaPage/BreadcrumbsNewsMedia";
import BreadcrumbsLifeStyle from "../NewsLifeStylePage/NewsLifeStyleDetailPages/BreadcrumbsLifeStyle";

interface News {
    newsID: number;
    newsTitle: string;
    newsSummary: string;
    thumbnail: string;
    newsDescription: string;
    dateCreate: string;
    ownerCreateID: number;
    type: number;
    status: number;
}
const DetailPageAPI: React.FC = () => {
    let { id } = useParams();
    const [newsUpdatesAPI, setNewsUpdatesAPI] = useState<News | null>(null); const [error, setError] = useState(false);
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const response = await fetch(`https://nuoicay.azurewebsites.net/api/home/news/detail/${id}`);
                const data = await response.json();
                if (isMounted) { // check if the component is still mounted
                    setNewsUpdatesAPI(data);
                }
            } catch (error) {
                if (isMounted) { // check if the component is still mounted
                    setError(true);
                }
                console.error('Failed to fetch data:', error);
            }
        };
        fetchData();
        return () => {
            isMounted = false; // update the flag when the component is unmounted
        };
    }, [id]);
    console.log(newsUpdatesAPI);

    if (error) {
        return <ErrorComponent />;
    }
    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
    };

    const showBreadcrumbsNews = () => {
        if (newsUpdatesAPI?.type === 1) {
            return <BreadcrumbsNewsUpdate />;
        }
        if (newsUpdatesAPI?.type === 2) {
            return <BreadcrumbsNewsMedia />;
        }
        if (newsUpdatesAPI?.type === 3) {
            return <BreadcrumbsLifeStyle />;
        }
        return null;
    };
    return (
        <div>
            {showBreadcrumbsNews()}
            {newsUpdatesAPI && (
                <div className="my-20 flex justify-center">
                    <div className="w-full md:w-[740px] mx-3 mb-30 ">
                        <strong className="text-3xl">{newsUpdatesAPI.newsTitle}</strong>
                        <h1 className="text-xs font-light my-5">Ngày tạo bài viết: {formatDate(newsUpdatesAPI.dateCreate)}</h1>
                        <img src={newsUpdatesAPI.thumbnail} alt="anh" className="object-fill w-860px min-h-10  md:lg:w-[380px] md:lg:h-[330px] mt-4 xl:w-[450px] xl:h-[390px]" />
                        <p className="text-sm font-light mb-3 italic my-2">{newsUpdatesAPI.newsDescription}</p>
                        <p className="text-lg mt-3">{newsUpdatesAPI.newsSummary}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
export default DetailPageAPI;