import Card from "./Card";
import './HomePage.css';

export default function HomePage() {

    return (
        <div className='home'>
            <h1>Bence Luzsinszky</h1>
            <h2>Games</h2>
            <div className='card-container'>
                <Card
                title='Placeholder'
                imageSrc='/image.png'
                description='A placeholder for future projects.'
                link='/placeholder' />
                <Card
                title='Placeholder'
                imageSrc='/image.png'
                description='A placeholder for future projects.'
                link='/placeholder' />
                <Card
                title='Placeholder'
                imageSrc='/image.png'
                description='A placeholder for future projects.'
                link='/placeholder' />
                <Card 
                title='Game of Life' 
                imageSrc='/game-of-life.png' 
                description='A cellular automaton devised by John Horton Conway.' 
                link='/game-of-life' />
                <Card
                title='Placeholder'
                imageSrc='/image.png'
                description='A placeholder for future projects.'
                link='/placeholder' />
                <Card
                title='Placeholder'
                imageSrc='/image.png'
                description='A placeholder for future projects.'
                link='/placeholder' />
                <Card
                title='Placeholder'
                imageSrc='/image.png'
                description='A placeholder for future projects.'
                link='/placeholder' />
            </div>
        </div>
    );
}