import { useCallback, useEffect, useState } from 'react';
import './styles.css';
import { getTokenData } from 'util/auth';
import { PieChartConfig, SpringPage, Task, User } from 'types';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import TaskCard from 'Components/TaskCard';
import { BsListTask } from 'react-icons/bs';
import { buildTasksByStatusChart } from 'helpers';
import PieChartCard from 'Components/pie-chart-card';
import TaskFilter, { TaskFilterData } from 'Components/TaskFilter';

type ControlComponentsData = {
    filterData: TaskFilterData;
}

const Tasks = () => {

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

    /* filter */

    const [controlComponentsData, setControlComponentsData] = useState<ControlComponentsData>({filterData: { title: '' },});
    
    const handleSubmitFilter = (data : TaskFilterData) => {
        setControlComponentsData({filterData: data});
    }

    /**/

    const [tasksPending, setTasksPending] = useState<SpringPage<Task>>();

    const [tasksWorking, setTasksWorking] = useState<SpringPage<Task>>();

    const [tasksCompleted, setTasksCompleted] = useState<SpringPage<Task>>();

    const getTasksPending = useCallback(async () => {
        const params: AxiosRequestConfig = {
            method: "GET",
            url: `/tasks/status/PENDING`,
            params: {
                title: controlComponentsData.filterData.title
            },
            withCredentials: true
          }
    
          requestBackend(params)
            .then(response => {
                setTasksPending(response.data);
            })
            .catch(error => {
              console.log("erro: " + error);
            });
    }, [controlComponentsData.filterData.title]);

    const getTasksWorking = useCallback(async () => {
        const params: AxiosRequestConfig = {
            method: "GET",
            url: `/tasks/status/WORKING`,
            params: {
                title: controlComponentsData.filterData.title
            },
            withCredentials: true
          }
    
          requestBackend(params)
            .then(response => {
                setTasksWorking(response.data);
            })
            .catch(error => {
              console.log("erro: " + error);
            });
    }, [controlComponentsData.filterData.title]);

    const getTasksCompleted = useCallback(async () => {
        const params: AxiosRequestConfig = {
            method: "GET",
            url: `/tasks/status/COMPLETED`,
            params: {
                title: controlComponentsData.filterData.title
            },
            withCredentials: true
          }
    
          requestBackend(params)
            .then(response => {
                setTasksCompleted(response.data);
            })
            .catch(error => {
              console.log("erro: " + error);
            });
    }, [controlComponentsData.filterData.title]);

    useEffect(() => {
        getTasksPending();
        getTasksWorking();
        getTasksCompleted();
    }, [getTasksPending, getTasksWorking, getTasksCompleted]);

    const getAllTasks = () => {
        getTasksPending();
        getTasksWorking();
        getTasksCompleted();
        getTasksByStatus();
    }

    /**/

    const [tasksByStatus, setTasksByStatus] = useState<PieChartConfig | undefined>();

    const getTasksByStatus = useCallback(async () => {
        try {
          const params: AxiosRequestConfig = {
            method: "GET",
            url: `/tasks/byStatus`,
            withCredentials: true
          };
    
          const response = await requestBackend(params);
          const tasksByStatusChart = buildTasksByStatusChart(response.data);
          setTasksByStatus(tasksByStatusChart);
        } catch (error) {
          console.log("erro: " + error);
        }
      }, []);

    useEffect(() => {
        getTasksByStatus();
    }, [getTasksByStatus]);
    
    return(
        <div className="tasks-container">
            <div className='tasks-filter'>
                <TaskFilter onSubmitFilter={handleSubmitFilter}/>
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
                            <TaskCard taskId={task.id} creatorId={task.creatorId} userLoggedId={user?.id} onUpdateStatus={getAllTasks} key={task.id}/>
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
                            <TaskCard taskId={task.id} creatorId={task.creatorId} userLoggedId={user?.id} onUpdateStatus={getAllTasks} key={task.id}/>
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
                            <TaskCard taskId={task.id} creatorId={task.creatorId} userLoggedId={user?.id} onUpdateStatus={getAllTasks} key={task.id}/>
                        ))}
                    </div>
                    }
                </div>
                {tasksByStatus && (
                    <PieChartCard
                        name="Tasks Status"
                        labels={tasksByStatus.labels}
                        series={tasksByStatus.series}
                    />
                )}
            </div>
        </div>
    );
}

export default Tasks;