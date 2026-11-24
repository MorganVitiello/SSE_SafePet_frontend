import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HeroCarousel.scss";

export interface HeroSlide {
  image: string;
  title: string;
  text: string;
  cta?: {
    label: string;
    href: string;
  };
}

interface HeroCarouselProps {
  slides: HeroSlide[];
}

const HeroCarousel = ({ slides }: HeroCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    let intervalId: number | undefined;

    const startTimer = () => {
      if (intervalId !== undefined) window.clearInterval(intervalId);
      intervalId = window.setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % slides.length);
      }, 5000);
    };

    const stopTimer = () => {
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
        intervalId = undefined;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) stopTimer();
      else startTimer();
    };

    startTimer();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopTimer();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [slides.length]);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="carousel-hero-banner">
      {slides.map((slide, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={slide.title}
            className={`carousel-slide${isActive ? " active" : ""}`}
            aria-hidden={!isActive}
          >
            <img
              src={slide.image}
              alt={slide.title}
              width={1280}
              height={600}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />

            <div className="slide-content">
              <h1>{slide.title}</h1>
              <p>{slide.text}</p>
              {slide.cta && (
                <Link to={slide.cta.href} className="button-primary" tabIndex={isActive ? 0 : -1}>
                  {slide.cta.label}
                </Link>
              )}
            </div>
          </div>
        );
      })}

      {slides.length > 1 && (
        <>
          <button type="button" className="nav-button prev" onClick={goPrev} aria-label="Slide precedente">
            &#10094;
          </button>
          <button type="button" className="nav-button next" onClick={goNext} aria-label="Slide successiva">
            &#10095;
          </button>
          <div className="hero-dots">
            <ul>
              {slides.map((slide, i) => (
                <li key={slide.title} className={i === activeIndex ? "active" : ""}>
                  <button
                    type="button"
                    aria-label={`Vai alla slide ${i + 1}`}
                    onClick={() => setActiveIndex(i)}
                  >
                    <span className="dot"></span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default HeroCarousel;
