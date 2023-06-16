
import { useCallback, useContext, useEffect, useState } from 'react';
import './styles.css';
import { AuthContext } from 'AuthContext';
import { getTokenData, isAuthenticated } from 'util/auth';
import { SpringPage, Task, User } from 'types';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

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

    return(
        <div className="tasks-container">
            <h1>{user?.name}</h1>
            <div className='user-tasks-container'>
                <div className='tasks-status'>
                    <h3>Tasks pending</h3>
                    {tasksPending?.content.map(task => (
                        <p>{task.title}</p>
                    ))}
                </div>
                <div className='tasks-status'>
                    <h3>Tasks Working</h3>
                    {tasksWorking?.content.map(task => (
                        <p>{task.title}</p>
                    ))}
                </div>
                <div className='tasks-status'>
                    <h3>Tasks Completed</h3>
                    {tasksCompleted?.content.map(task => (
                        <p>{task.title}</p>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Tasks;