import { AxiosRequestConfig } from "axios";
import { convertDateTime, convertTimeToHours } from "helpers";
import { useCallback, useEffect, useState } from "react";
import { Task, Work } from "types";
import { requestBackend } from "util/requests";
import { BsClock } from 'react-icons/bs';
import { AiOutlineCalendar } from 'react-icons/ai';
import './styles.css';

type Props = {
    work: Work;
    onDelete: Function;
}

const WorkCard = ({work, onDelete} : Props) => {

    const [task, setTask] = useState<Task>();

    const getTask = useCallback(() => {
          const params : AxiosRequestConfig = {
            method:"GET",
            url: `/tasks/${work.taskId}`,
            withCredentials:true
          }
          requestBackend(params) 
            .then(response => {
                setTask(response.data);
            })
        }
    , [work.taskId])
    
    useEffect(() => {
        getTask();
    }, [getTask]);

    const deleteWork = () => {
        if(!window.confirm(`Are you sure that you want to delete this work?`)){
            return;
        }
        const params : AxiosRequestConfig = {
            method:"DELETE",
            url: `/works/${work.id}`,
            withCredentials:true
          }
          requestBackend(params) 
            .then(response => {
                onDelete();
            });
        };

    return(
        <div className="work-card-container">
            <div className="work-card-delete">
                <h2 onClick={() => deleteWork()}>X</h2>
            </div>
            <div className="work-card-main-container">
                <div className="work-card-title">
                    <h6>{task?.title}</h6>
                </div>
                <div className="work-card-content">
                    <p><BsClock style={{marginRight:"3px"}}/>{convertTimeToHours(work.totalTime)}</p>
                    <span><AiOutlineCalendar style={{marginRight:"3px"}}/>Started at {convertDateTime(work.dateTimeStart)} <br /></span>
                    <span><AiOutlineCalendar style={{marginRight:"3px"}}/>Finished at {convertDateTime(work.dateTimeEnd)}</span>
                </div>
            </div>

        </div>
    );
}

export default WorkCard;