import React from "react";
import "./PromoCard.scss"

export interface PromoCardProps {
    title: string;
    image: string;
    tag: string;
    description: string;
}

function PromoCard ({title, image, tag, description} : PromoCardProps) {
    return (
        <>
            <div className="promo-card">
                <div className="promo-image">
                    <img src={image} alt={title} width={280} height={180} loading="lazy" decoding="async" />
                </div>

                <div className="promo-content">
                    <span className="promo-tag">{tag}</span>
                    <h3 className="promo-title">{title}</h3>
                    <p className="promo-description">{description}</p>
                </div>
            </div>
        </>
    )
}

export default PromoCard;