import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./ImageBanner.scss";

interface ImageBannerProps {
    imagePath: string;
    description: string;
    redirectLink?: string;
    buttonText?: string;
}

function ImageBanner({ imagePath, description, redirectLink, buttonText }: ImageBannerProps) {
    const [isDesktop, setIsDesktop] = useState(() =>
        typeof window !== 'undefined' ? window.matchMedia('(min-width: 769px)').matches : true
    );

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 769px)');
        const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);

    return (
        <div className="image-banner">
            {/* Sezione Immagine: montata solo su viewport > 768px per evitare download inutili su mobile */}
            {isDesktop && (
                <div className="banner-image-wrapper">
                    <img
                        src={imagePath}
                        alt="Banner"
                        className="banner-image"
                        width={510}
                        height={510}
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            )}

            {/* Sezione Descrizione e Bottone */}
            <div className="banner-content">
                <h2 className="banner-description">{description}</h2>

                {redirectLink && (
                    <Link to={redirectLink} className="button-primary"> {buttonText} </Link>
                )}
            </div>
        </div>
    );
}

export default ImageBanner;
