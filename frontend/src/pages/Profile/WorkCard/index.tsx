import { AxiosRequestConfig } from "axios";
import { convertDateTime, convertTimeToHours } from "helpers";
import { useCallback, useEffect, useState } from "react";
import { Task, Work } from "types";
import { requestBackend } from "util/requests";
import { BsClock } from 'react-icons/bs';
import { AiOutlineCalendar } from 'react-icons/ai';
import { AiFillCloseCircle } from 'react-icons/ai';
import './styles.css';

type Props = {
    work: Work;
    onDeleteWork: Function;
}

const WorkCard = ({work, onDeleteWork} : Props) => {

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

    const handleDeleteWork = useCallback(() => {
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
                onDeleteWork();
        })
    }, [work.id ,onDeleteWork]);

    const returnTaskStatus = (status : string) => {
        if(status === "PENDING"){
            return (<p className="work-card-status-card" style={{backgroundColor:"#F66565"}}>{status}</p>);
        }
        else if(status === "WORKING"){
            return (<p className="work-card-status-card" style={{backgroundColor:"#FFDC8D"}}>{status}</p>);
        }
        else if(status === "COMPLETED"){
            return (<p className="work-card-status-card" style={{backgroundColor:"#0DAA2A"}}>{status}</p>);
        }
    }

    return(
        <div className="work-card-container">
            <div className="work-card-delete">
                <h2 onClick={() => handleDeleteWork()}><AiFillCloseCircle/></h2>
            </div>
            <div className="work-card-main-container">
                <div className="work-card-title">
                    <h6>{task?.title}</h6>
                    <span>{task && returnTaskStatus(task?.status)}</span>
                </div>
                <div className="work-card-content">
                    <p><BsClock style={{marginRight:"3px"}}/>{work.totalTime && convertTimeToHours(work.totalTime)}</p>
                    <span><AiOutlineCalendar style={{marginRight:"3px"}}/>Started at {convertDateTime(work.dateTimeStart)} <br /></span>
                    <span><AiOutlineCalendar style={{marginRight:"3px"}}/>Finished at {convertDateTime(work.dateTimeEnd)}</span>
                </div>
            </div>

        </div>
    );
}

export default WorkCard;