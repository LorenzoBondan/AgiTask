import taskmodel from 'assets/images/taskmodel.png';
import './styles.css';

const TaskModel = () => {
    return(
        <div className="task-model-container">
            <div className='task-model-title'>
                <h3>Task Model</h3>
            </div>
            <div className='task-model-content'>
                <div className='task-model-content-description'>
                    <p>
                        Use Agitask's boards and lists to create unlimited tasks. <br />
                        Involve multiple team members in the same project. <br />
                        Easily rename tasks and quickly know how many tasks you have in each task list. <br />
                        More autonomy and flexibility for your teams' work.
                    </p>
                </div>
                <div className='task-model-content-image'>
                    <img src={taskmodel} alt="" />
                </div>
            </div>
        </div>
    );
}

export default TaskModel;