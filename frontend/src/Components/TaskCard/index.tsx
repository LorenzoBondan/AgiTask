
import { Task, User } from 'types';
import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

import { FiClock } from 'react-icons/fi';
import { BiCommentDetail } from 'react-icons/bi';
import { SlUserFollow } from 'react-icons/sl';

type Props = {
    task: Task;
    creatorId: number;
    userLoggedId: number;
    onUpdateStatus : Function;
}

const TaskCard = ({task, creatorId, userLoggedId, onUpdateStatus} : Props) => {

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

    const updateTaskStatus = useCallback((status : string) => {
        const params : AxiosRequestConfig = {
          method:"PUT",
          url: `/tasks/${task.id}/updateStatus/${status}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            onUpdateStatus();
          })
    }, [task.id, onUpdateStatus])

    return(
        <div className="task-card-container">
            <p className='task-card-border' style={{backgroundColor:changeBorderColor(task.status)}}></p>

            <div className='task-card-components'>
                <div className="task-card-content">
                    <div className='task-card-creator-image'>
                        <img src={creator?.imgUrl} alt="" />
                    </div>
                    <div className='task-card-title'>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <div className='task-card-title-info'>
                            <p><FiClock style={{marginRight:"3px"}}/>{formatDateTime(task.startDate)}</p>
                            <p><BiCommentDetail style={{marginRight:"3px"}}/>{task.comments.length}</p>
                            {task.followersId.includes(userLoggedId) && <p><SlUserFollow style={{marginRight:"3px"}}/>Follower</p>}
                        </div>
                        
                    </div>
                </div>
                <div className="task-card-buttons">
                    <p className='update-task-status' style={{backgroundColor:"#F66565"}} onClick={() => updateTaskStatus("PENDING")}></p>
                    <p className='update-task-status' style={{backgroundColor:"#FECB33"}} onClick={() => updateTaskStatus("WORKING")}></p>
                    <p className='update-task-status' style={{backgroundColor:"#0DAA2A"}} onClick={() => updateTaskStatus("COMPLETED")}></p>
                </div>
            </div>

        </div>
    );
}

export default TaskCard;