import Banner from 'Components/Banner';
import './styles.css';
import Utilized from 'Components/Utilized';
import Companies from 'Components/Companies';
import TaskModel from './TaskModel';
import WorkTogether from './WorkTogether';

const Home = () => {
    return(
        <div className='home-container'>
            <Banner/>
            <div className='home-team-united'>
                <div className='home-team-text'>
                    <h3>Your team united as never before</h3>
                    <p className='separator'></p>
                    <p>AgiTask offers a single plan with all features included to your company grow up!</p>
                    <p style={{fontStyle:"italic"}}>Our team worked hard. There were sleepless nights and lots of coffee. <br /> All of this to deliver a solution that allows not only to serve clients but also to manage projects <br />in a simple and intuitive way, making teams more engajed and productive.</p>
                </div>
                <div className='home-team-image'>
                    <img src="https://blog.bydrec.com/hubfs/6%20Techniques%20to%20Improve%20Your%20Software%20Development%20Team.jpg" alt="" />
                </div>
            </div>
            <div className='home-utilized-container'>
                <Utilized/>
            </div>
            <div className='home-utilized-container'>
                <Companies/>
            </div>
            <div className='home-utilized-container'>
                <TaskModel/>
            </div>
            <div className='home-utilized-container'>
                <WorkTogether/>
            </div>
        </div>
    );
}

export default Home;