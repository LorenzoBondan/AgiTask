import workmodel from 'assets/images/workmodel.png';
import './styles.css';

const WorkTogether = () => {
    return(
        <div className='work-together-container'>
            <div className='work-model-title'>
                <h3>Work Together</h3>
            </div>
            <div className='work-model-content'>
                <div className='work-model-content-image'>
                    <img src={workmodel} alt="" />
                </div>
                <div className='work-model-content-description'>
                    <p>
                    Understand what is a priority for your business. <br />
                    Record the time spent on each activity. Generate comments and tasks for each employee. <br />
                    Collaborate with your team: follow important tasks to streamline your work.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default WorkTogether;