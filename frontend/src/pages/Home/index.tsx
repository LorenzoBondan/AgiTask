
import Banner from 'Components/Banner';
import './styles.css';
import Utilized from 'Components/Utilized';

const Home = () => {
    return(
        <div className='home-container'>
            <Banner/>
            <div className='home-team-united'>
                <div className='home-team-text'>
                    <h3>Your team united as never before</h3>
                    <p>AgiTask offers a single plan with all features included to your company grow up!</p>
                </div>
                <div className='home-team-image'>
                    <img src="https://blog.bydrec.com/hubfs/6%20Techniques%20to%20Improve%20Your%20Software%20Development%20Team.jpg" alt="" />
                </div>
            </div>
            <div className='home-utilized-container'>
                <Utilized/>
            </div>
        </div>
    );
}

export default Home;