import { useEffect, useState } from 'react';
import PromoCard, { PromoCardProps } from "./PromoCard/PromoCard";
import "./Carousel.scss";
import Title from '../Title/Title';

type CarouselProps = {
    cardsData: PromoCardProps[];
    arrows?: boolean;
    autoplay?: boolean;
    dots?: boolean;
};

const getSlidesToShow = (): number => {
    if (typeof window === 'undefined') return 4;
    const width = window.innerWidth;
    if (width <= 600) return 1;
    if (width <= 1024) return 2;
    if (width <= 1200) return 3;
    return 4;
};

const Carousel = ({
    cardsData,
    arrows = true,
    autoplay = true,
    dots = true
}: CarouselProps) => {
    const [slidesToShow, setSlidesToShow] = useState<number>(getSlidesToShow);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const maxIndex = Math.max(0, cardsData.length - slidesToShow);

    useEffect(() => {
        const handleResize = () => {
            const nextCount = getSlidesToShow();
            setSlidesToShow(nextCount);
            setCurrentIndex((prev) => Math.min(prev, Math.max(0, cardsData.length - nextCount)));
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [cardsData.length]);

    useEffect(() => {
        if (!autoplay || maxIndex === 0 || isHovered) return;

        let timer: number | undefined;
        const start = () => {
            if (timer !== undefined) window.clearInterval(timer);
            timer = window.setInterval(() => {
                setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
            }, 3000);
        };
        const stop = () => {
            if (timer !== undefined) {
                window.clearInterval(timer);
                timer = undefined;
            }
        };
        const onVis = () => (document.hidden ? stop() : start());

        start();
        document.addEventListener('visibilitychange', onVis);
        return () => {
            stop();
            document.removeEventListener('visibilitychange', onVis);
        };
    }, [autoplay, maxIndex, isHovered]);

    const goPrev = () => setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    const goNext = () => setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));

    const gapPx = 16;
    const cardWidthPercent = 100 / slidesToShow;

    return (
        <div
            className="custom-services-carousel"
            style={{ padding: "40px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Title text={"I nostri servizi"} />
            <div className="carousel-wrapper">
                {arrows && slidesToShow > 1 && maxIndex > 0 && (
                    <button type="button" className="carousel-arrow prev" onClick={goPrev} aria-label="Precedente">
                        &#10094;
                    </button>
                )}

                <div className="carousel-viewport">
                    <div
                        className="carousel-track"
                        style={{
                            transform: `translateX(calc(-${currentIndex * cardWidthPercent}% - ${currentIndex * (gapPx / slidesToShow)}px))`,
                        }}
                    >
                        {cardsData.map((card: PromoCardProps) => (
                            <div
                                key={card.title}
                                className="carousel-item"
                                style={{
                                    flex: `0 0 calc(${cardWidthPercent}% - ${(gapPx * (slidesToShow - 1)) / slidesToShow}px)`,
                                }}
                            >
                                <PromoCard
                                    title={card.title}
                                    image={card.image}
                                    tag={card.tag}
                                    description={card.description}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {arrows && slidesToShow > 1 && maxIndex > 0 && (
                    <button type="button" className="carousel-arrow next" onClick={goNext} aria-label="Successivo">
                        &#10095;
                    </button>
                )}
            </div>

            {dots && maxIndex > 0 && (
                <ul className="carousel-dots">
                    {Array.from({ length: maxIndex + 1 }, (_, i) => (
                        <li key={i} className={i === currentIndex ? "active" : ""}>
                            <button
                                type="button"
                                aria-label={`Pagina ${i + 1}`}
                                onClick={() => setCurrentIndex(i)}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Carousel;
