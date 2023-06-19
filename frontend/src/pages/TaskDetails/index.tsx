
import { useParams } from 'react-router-dom';
import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { Task, User } from 'types';
import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL, requestBackend } from 'util/requests';
import { getTokenData } from 'util/auth';
import { convertDateTime } from 'helpers';

type UrlParams = {
    taskId: string;
}

const TaskDetails = () => {

    const { taskId } = useParams<UrlParams>();

    const [task, setTask] = useState<Task>();

    useEffect(() => {
        axios
        .get(`${BASE_URL}/tasks/${taskId}`)
        .then((response) => {
            setTask(response.data);
            window.scrollTo(0,0);
        })
    }, [taskId]);

    const [user, setUser] = useState<User | null>(null);

  const getUser = useCallback(async () => {
    try {
      const email = getTokenData()?.user_name;

      if (email) {
        const params: AxiosRequestConfig = {
          method: "GET",
          url: `/users/email/${email}`,
          withCredentials: true,
        };

        const response = await requestBackend(params);
        setUser(response.data);
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const [creator, setCreator] = useState<User | null>(null);

  const getCreator = useCallback(async () => {
    try {
      if (task) {
        const params: AxiosRequestConfig = {
          method: "GET",
          url: `/users/${task.creatorId}`,
          withCredentials: true,
        };

        const response = await requestBackend(params);
        setCreator(response.data);
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  }, [task]);

  useEffect(() => {
    getCreator();
  }, [getCreator]);

    return(
        <div className="task-details-container">

            <div className='task-details-first-container'>
                <div className='task-details-first-container-top'>
                    <h5>{task?.title}</h5>
                    <p>{task?.description}</p>
                    <span>Created at: {task && convertDateTime(task?.startDate)}</span>
                </div>
                <div className='task-container-first-container-buttons'>
                    <button className='btn btn-start'>Start</button>
                    <button className='btn btn-finish'>Finish</button>
                </div>
                <div className='task-container-first-container-followers'>
                    <h4>Creator</h4>
                    <div className='task-creator'>
                        <div className='task-creator-img'>
                            <img src={creator?.imgUrl} alt="" />
                        </div>
                        <div className='task-creator-info'>
                            <h6>{creator?.name}</h6>
                            <p>AgiTask</p>
                            <p>{creator?.email}</p>
                        </div>
                    </div>
                    <div className='task-followers'>
                        <p>Followers</p>
                        <div className='task-followers-row'>
                            {task?.followers.map(follower => (
                                <img src={follower.imgUrl} alt="" />
                            ))}
                        </div>
                    </div>
                </div>
                <div className='task-container-first-container-details'>

                </div>
            </div>

            <div className='task-details-second-container'>
                <div className='task-container-second-container-top'>

                </div>
                <div className='task-container-second-container-content'>

                </div>
            </div>

        </div>
    );
}

export default TaskDetails;