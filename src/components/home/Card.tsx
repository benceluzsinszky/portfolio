import { Link } from "react-router-dom";
import './Card.css';

interface CardProps {
    title: string;
    imageSrc: string;
    description: string;
    link: string;
}

export default function Card({ title, imageSrc, description, link }: CardProps) {
    return (
        <Link to={link} className="card">
            <img src={imageSrc} alt={title} />
            <h2>{title}</h2>
            <p>{description}</p>
        </Link>
    );
}