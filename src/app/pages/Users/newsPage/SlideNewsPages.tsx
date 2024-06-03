import React, { useState, FC } from 'react';

interface NewsUpdate {
    id: string;
    title: string;
    content: string;
}

interface SlideShowProps {
    newsUpdates: NewsUpdate[];
}

const SlideNewsPages: FC<SlideShowProps> = ({ newsUpdates }) => {
    const [activeSlide, setActiveSlide] = useState(0);

    const nextSlide = () => {
        setActiveSlide((prevSlide) => (prevSlide + 1) % newsUpdates.length);
    };

    const prevSlide = () => {
        setActiveSlide((prevSlide) => (prevSlide - 1 + newsUpdates.length) % newsUpdates.length);
    };

    return (
        <div className="relative ">
            {newsUpdates.map((news, index) => (
                <div
                    key={news.id}
                    className={`absolute w-full h-full transition-opacity duration-500 ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                    <h2 className="text-2xl font-semibold">{news.title}</h2>
                    <p className="text-lg">{news.content}</p>
                </div>
            ))}
            <button onClick={prevSlide} className="absolute left-0">Prev</button>
            <button onClick={nextSlide} className="absolute right-0">Next</button>
        </div>
    );
};

export default SlideNewsPages;