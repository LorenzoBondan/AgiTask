
import { useCallback, useContext, useEffect, useState } from 'react';
import './styles.css';
import { AuthContext } from 'AuthContext';
import { getTokenData, isAuthenticated } from 'util/auth';
import { SpringPage, Task, User } from 'types';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import TaskCard from 'Components/TaskCard';

import { BsListTask } from 'react-icons/bs';

const Tasks = () => {

    // getting the email
    const { authContextData, setAuthContextData } = useContext(AuthContext);

    useEffect(() => {
        if(isAuthenticated()){
        setAuthContextData({
            authenticated: true,
            tokenData: getTokenData()
        })
        }
        else{
        setAuthContextData({
            authenticated: false,
        })
        }
    }, [setAuthContextData]);

    let email: string;

    authContextData.authenticated && (
        authContextData.tokenData?.user_name && (
        email = authContextData.tokenData?.user_name)) 

    // then, getting the user Id by email

    const [user, setUser] = useState<User>();

    const getUser = useCallback(async () => {
        try {
        const params: AxiosRequestConfig = {
            method: "GET",
            url: `/users/email/${email}`,
            withCredentials: true
    };

        const response = await requestBackend(params);
            setUser(response.data);
            } catch (error) {
            console.log("error: " + error);
            }
    }, []);

    useEffect(() => {
        getUser();
    }, [getUser]);

    const [tasksPending, setTasksPending] = useState<SpringPage<Task>>();

    const [tasksWorking, setTasksWorking] = useState<SpringPage<Task>>();

    const [tasksCompleted, setTasksCompleted] = useState<SpringPage<Task>>();

    const getTasksPending = useCallback(async () => {
        const params: AxiosRequestConfig = {
            method: "GET",
            url: `/tasks/status/PENDING`,
            withCredentials: true
          }
    
          requestBackend(params)
            .then(response => {
                setTasksPending(response.data);
            })
            .catch(error => {
              console.log("erro: " + error);
            });
    }, []);

    const getTasksWorking = useCallback(async () => {
        const params: AxiosRequestConfig = {
            method: "GET",
            url: `/tasks/status/WORKING`,
            withCredentials: true
          }
    
          requestBackend(params)
            .then(response => {
                setTasksWorking(response.data);
            })
            .catch(error => {
              console.log("erro: " + error);
            });
    }, []);

    const getTasksCompleted = useCallback(async () => {
        const params: AxiosRequestConfig = {
            method: "GET",
            url: `/tasks/status/COMPLETED`,
            withCredentials: true
          }
    
          requestBackend(params)
            .then(response => {
                setTasksCompleted(response.data);
            })
            .catch(error => {
              console.log("erro: " + error);
            });
    }, []);

    useEffect(() => {
        getTasksPending();
        getTasksWorking();
        getTasksCompleted();
    }, [getTasksPending, getTasksWorking, getTasksCompleted]);

    const getAllTasks = () => {
        getTasksPending();
        getTasksWorking();
        getTasksCompleted();
    }
    
    return(
        <div className="tasks-container">
            <div className='tasks-container-navbar'>
                <div className='tasks-container-first'>
                    <img src={user?.imgUrl} alt="" />
                    <h1>{user?.name}'s Tasks</h1>
                </div>
                <div className='tasks-container-second'>
                    <p><BsListTask style={{marginRight:"3px"}}/>{user?.tasks.length}</p>
                </div>
            </div>
            
            <div className='user-tasks-container'>
                <div className='tasks-status'>
                    <div className='task-status-top' style={{backgroundColor:"#F66565"}}></div>
                    <div className='tasks-status-title'>
                        <h3>Tasks Pending</h3>
                        <h3><BsListTask style={{marginRight:"3px"}}/>{tasksPending?.numberOfElements}</h3>
                    </div>
                    {tasksPending?.numberOfElements !== 0 && 
                    <div className='tasks-zone'>
                        {user && tasksPending?.content.map(task => (
                            <TaskCard task={task} creatorId={task.creatorId} userLoggedId={user?.id} onUpdateStatus={getAllTasks}/>
                        ))}
                    </div>
                    }
                </div>
                <div className='tasks-status'>
                    <div className='task-status-top' style={{backgroundColor:"#FECB33"}}></div>
                    <div className='tasks-status-title'>
                        <h3>Tasks Working</h3>
                        <h3><BsListTask style={{marginRight:"3px"}}/>{tasksWorking?.numberOfElements}</h3>
                    </div>
                    {tasksWorking?.numberOfElements !== 0 && 
                    <div className='tasks-zone'>
                        {user && tasksWorking?.content.map(task => (
                            <TaskCard task={task} creatorId={task.creatorId} userLoggedId={user?.id} onUpdateStatus={getAllTasks}/>
                        ))}
                    </div>
                    }
                </div>
                <div className='tasks-status'>
                    <div className='task-status-top' style={{backgroundColor:"#0DAA2A"}}></div>
                    <div className='tasks-status-title'>
                        <h3>Tasks Completed</h3>
                        <h3><BsListTask style={{marginRight:"3px"}}/>{tasksCompleted?.numberOfElements}</h3>
                    </div>
                    {tasksCompleted?.numberOfElements !== 0 && 
                    <div className='tasks-zone'>
                        {user && tasksCompleted?.content.map(task => (
                            <TaskCard task={task} creatorId={task.creatorId} userLoggedId={user?.id} onUpdateStatus={getAllTasks}/>
                        ))}
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Tasks;