
// Desc: Home page for the application
import './Dashboard.css';
import Contests from '../Components/Contests';
import Scoreboard from '../Components/Scoreboard';

const Dashboard = () => {
    return (
        <div className="home-screen">
            <div className='box' id="scoreboard"><Scoreboard /></div>
            <div className='box'>{/*<iframe src="https://codechef-api.vercel.app/rating/ksun48"></iframe>*/}</div>
            <div className='box'>
                <Contests/>
            </div>
            <div className='box'></div>
        </div>
    );
};

export default Dashboard;