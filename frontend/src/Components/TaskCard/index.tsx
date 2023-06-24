import { Task, User } from 'types';
import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { FiClock } from 'react-icons/fi';
import { BiCommentDetail } from 'react-icons/bi';
import { SlUserFollow } from 'react-icons/sl';
import { Link } from 'react-router-dom';

type Props = {
    taskId: number;
    creatorId: number;
    userLoggedId: number;
    onUpdateStatus : Function;
}

const TaskCard = ({taskId, creatorId, userLoggedId, onUpdateStatus} : Props) => {

    // get current task
    const [task, setTask] = useState<Task>();

    const getThisTask = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/tasks/${taskId}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setTask(response.data);
          })
    }, [taskId])

    useEffect(() => {
        getThisTask();
    }, [getThisTask]);

    const [creator, setCreator] = useState<User>(); 

    const getCreator = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/users/${creatorId}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setCreator(response.data);
          })
    }, [creatorId])

    useEffect(() => {
        getCreator();
    }, [getCreator]);

    const changeBorderColor = (status : string) => {
        if(status === "PENDING"){
            return '#F66565';
        }
        else if(status === "WORKING"){
            return '#FFDC8D';
        }
        else{
            return '#0DAA2A';
        }
    }

    function formatDateTime(dateTime: string): string {
        const date = new Date(dateTime);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear().toString().substr(-2);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${month}/${day}/${year} ${hours}:${minutes}`;
    }

    const updateTaskStatus = useCallback((status : string | undefined) => {
        if(!window.confirm(`Are you sure that you want to change the task status to ${status?.toLowerCase()}?`)){
            return;
        }
        const params : AxiosRequestConfig = {
          method:"PUT",
          url: `/tasks/${taskId}/updateStatus/${status}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            onUpdateStatus();
          })
    }, [taskId, onUpdateStatus])

    const isFollower = (): boolean => {
        const userId = userLoggedId;
        if (task) {
          return task.followers.some((follower) => follower.id === userId);
        }
        return false;
    };
      

    return(
        
        <div className="task-card-container">
            {task && <>
            <p className='task-card-border' style={{backgroundColor:changeBorderColor(task?.status)}}></p>
            <div className='task-card-components'>
                <Link to={`/tasks/${task.id}`}>
                    <div className="task-card-content">
                        <div className='task-card-creator-image'>
                            <img src={creator?.imgUrl} alt="" />
                        </div>
                        <div className='task-card-title'>
                            <h3>{task?.title}</h3>
                            <p>{task?.description}</p>
                            <div className='task-card-title-info'>
                                <p><FiClock style={{marginRight:"3px"}}/>{formatDateTime(task?.startDate)}</p>
                                <p><BiCommentDetail style={{marginRight:"3px"}}/>{task?.comments.length}</p>
                                {isFollower() && <p><SlUserFollow style={{marginRight:"3px"}}/>Follower</p>}
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="task-card-buttons">
                    <p className='update-task-status' 
                        style={{backgroundColor:"#F66565"}} 
                        onClick={() => updateTaskStatus("PENDING")} 
                        data-tooltip-content="Change status to Pending" 
                        data-tooltip-id='myTooltip'
                    ></p>
                    <p className='update-task-status' 
                        style={{backgroundColor:"#FECB33"}} 
                        onClick={() => updateTaskStatus("WORKING")} 
                        data-tooltip-content="Change status to Working" 
                        data-tooltip-id='myTooltip'
                    ></p>
                    <p className='update-task-status' 
                        style={{backgroundColor:"#0DAA2A"}} 
                        onClick={() => updateTaskStatus("COMPLETED")} 
                        data-tooltip-content="Change status to Completed" 
                        data-tooltip-id='myTooltip'
                    ></p>
                    <ReactTooltip id='myTooltip' place="top" />
                </div>
            </div>
            </>}
        </div>
    );
}

export default TaskCard;