import { Link } from "react-router-dom";

export default function HomePage() {

    return (
        <div className='home'>
            <h1>Home</h1>
            <p>Welcome to my portfolio!</p>
            <Link to="/game-of-life">Game Of Life</Link>
        </div>
    );
}