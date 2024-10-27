
// Desc: Home page for the application
import './Home.css';
import Contests from '../Components/Contests';
import Scoreboard from '../Components/Scoreboard';

const Home = () => {
    return (
        <div className="home-screen">
            <div className='box' id="scoreboard"><Scoreboard /></div>
            <div className='box'><iframe src="https://codechef-api.vercel.app/rating/ksun48"></iframe></div>
            <div className='box'>
                <Contests/>
            </div>
            <div className='box'>Div 4</div>
        </div>
    );
};

export default Home;