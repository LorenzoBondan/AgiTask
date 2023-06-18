import { AxiosRequestConfig } from "axios";
import { convertTimeToHours } from "helpers";
import { useCallback, useEffect, useState } from "react";
import { Task, Work } from "types";
import { requestBackend } from "util/requests";
import './styles.css';

type Props = {
    work: Work;
}

const WorkCard = ({work} : Props) => {

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

    return(
        <div className="work-card-container">
            <div className="work-card-title">
                <h1>{task?.title}</h1>
            </div>
            <div className="work-card-content">
                <p>Total worked time: {convertTimeToHours(work.totalTime)}</p>
            </div>
        </div>
    );
}

export default WorkCard;