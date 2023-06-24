
import { useParams } from 'react-router-dom';
import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { Comment, Task, User, Work, WorkVariant } from 'types';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { getTokenData } from 'util/auth';
import { convertDateTime, convertTimeToHours } from 'helpers';
import { Nav, Tab } from 'react-bootstrap';
import { BiCommentDetail } from 'react-icons/bi';
import { FaPlay } from 'react-icons/fa';
import { FaStop } from 'react-icons/fa'; 
import { AiOutlineTool } from 'react-icons/ai';
import CommentCard from './CommentCard';
import { Controller, useForm } from 'react-hook-form';
import { AiOutlineSend } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaRegChartBar } from 'react-icons/fa';
import WorkCard from './WorkCard';
import Modal from 'react-modal';
import FlatPicker from 'react-flatpickr';
import "flatpickr/dist/themes/material_orange.css";
import Select from "react-select";
import Plus from 'assets/images/plus.png';
import { Tooltip as ReactTooltip } from 'react-tooltip'

import ApexCharts from 'apexcharts';

type UrlParams = {
  taskId: string;
}

const TaskDetails = () => {

  const { taskId } = useParams<UrlParams>();

  const [task, setTask] = useState<Task>();

  const getTask = useCallback(async () => {
    try {
      const params: AxiosRequestConfig = {
        method: "GET",
        url: `/tasks/${taskId}`,
        withCredentials: true,
      };
  
      const response = await requestBackend(params);
      setTask(response.data);
        
    } catch (error) {
      console.log("Error: " + error);
    }
  }, [taskId]);

  useEffect(() => {
    getTask();
  }, [getTask]);

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

  const { register: registerComment, handleSubmit: handleSubmitComment, formState: { errors: errorsComment }, setValue: setValueComment } = useForm<Comment>();

  const onSubmit = async (formData: Comment) => {
    if (user) {
      formData.author = user;
      formData.taskId = parseInt(taskId);
      const dateNow = new Date();
      dateNow.setHours(dateNow.getHours() - 3);
      formData.dateTime = dateNow.toISOString();

      try {
        const params: AxiosRequestConfig = {
          method: "POST",
          url: "/comments",
          data: formData,
          withCredentials: true,
        };
        await requestBackend(params);
      } catch (error) {
        console.log("Error: " + error);
      } 
      finally{
        getTask();
        setValueComment('text', '');
      }
    }
  };

  const { handleSubmit: handleSubmitWork } = useForm<Work>();

  const [error, setError] = useState<string | null>(null);

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(){
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);

    setDateTimeStart('');
    setDateTimeEnd('');
  }

  const [dateTimeStart, setDateTimeStart] = useState('');
  const [dateTimeEnd, setDateTimeEnd] = useState('');

  const onSubmitWork = (formData : Work) => {
    if(user && task){
      formData.employeeId = user?.id;
      formData.taskId = task?.id;
  
      const correctTime = (dateTimeStart: string): string => {
          const startDate = new Date(dateTimeStart);
          startDate.setHours(startDate.getHours() - 3);
          return startDate.toISOString();
      };

      formData.dateTimeStart = correctTime(dateTimeStart);
      formData.dateTimeEnd = correctTime(dateTimeEnd);

      if(formData.dateTimeEnd < formData.dateTimeStart){
          setError("End Date cannot be earlier than Start Date");
          return;
      }

      const params : AxiosRequestConfig = {
          method: "POST",
          url : `/works`,
          data: formData,
          withCredentials: true
      };

      requestBackend(params)
          .then(response => {
              console.log('success', response.data);
              closeModal();
              getTask();

              setError('');
          })
          .catch((error) => {
              console.log(error);
              setError(error.message);
          })
    }
  };

  const handleDateTimeStartChange = (selectedDateTime: Date[]) => {
    setDateTimeStart(selectedDateTime[0].toISOString());
  };
      
  const handleDateTimeEndChange = (selectedDateTime: Date[]) => {
    setDateTimeEnd(selectedDateTime[0].toISOString());
  };

  ////////

  const [isRecording, setIsRecording] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const [dateTimeStartRecorded, setDateTimeStartRecorded] = useState('');
  const [dateTimeEndRecorded, setDateTimeEndRecorded] = useState('');

  const formatTime = (milliseconds: number): string => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedHours = hours.toString().padStart(2, '0');
    
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    const countTime = () => {
      if (isRecording) {
        if (!startTime) {
          setStartTime(new Date());
        } else {
          const currentTime = new Date();
          const elapsedMilliseconds = currentTime.getTime() - startTime.getTime();
          setElapsedTime(elapsedMilliseconds);
        }
      } else {
        setStartTime(null);
        setElapsedTime(0);
      }
    };
  
    const timer = setInterval(countTime, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isRecording, startTime]);
    
  useEffect(() => {
    console.log("Data inicio: ", dateTimeStartRecorded);
  }, [dateTimeStartRecorded]);

  useEffect(() => {
    console.log("Data Fim: ", dateTimeEndRecorded);
  }, [dateTimeEndRecorded]);

  const handleStartRecording = () => {
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toISOString().substring(0, 19);
    setDateTimeStartRecorded(formattedDateTime);
    setIsRecording(true);
  };
    
  const handleStopRecording = () => {
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toISOString().substring(0, 19);
    setDateTimeEndRecorded(formattedDateTime);

    setIsRecording(false);
      
    if(user && task){

      const workData: WorkVariant = {
        employeeId: user?.id,
        taskId: task?.id,
        dateTimeStart: dateTimeStartRecorded,
        dateTimeEnd: formattedDateTime,
      };
    
      const params : AxiosRequestConfig = {
          method: "POST",
          url : `/works`,
          data: workData,
          withCredentials: true
      };
        
      try{
        requestBackend(params)
        .then(response => {
            console.log('success', response.data);
            getTask();

            setError('');
        })
      }
      catch(error){
        console.log(error);
      }
    }
  };

  //

  const { handleSubmit: handleSubmitTask, control: controlTask } = useForm<Task>();

  const [followersModalIsOpen, setFollowersModalIsOpen] = useState(false);

  function openFollowersModal(){
    setFollowersModalIsOpen(true);
  }
  
  function closeFollowersModal(){
    setFollowersModalIsOpen(false);
  }

  const onSubmitTask = (formData : Task) => {
    if(user && task){

      const params : AxiosRequestConfig = {
          method: "PUT",
          url : `/tasks/followers/${task.id}`,
          data: formData,
          withCredentials: true
      };
  
      requestBackend(params)
          .then(response => {
              console.log('success', response.data);
              closeFollowersModal();
              getTask();
  
              setError('');
          })
          .catch((error) => {
              console.log(error);
              setError(error.message);
          })
      }
  };

  const [selectFollowers, setSelectFollowers] = useState<User[]>([]);

  useEffect(() => {
    requestBackend({url: '/users', withCredentials: true})
        .then(response => {
          setSelectFollowers(response.data.content)
    })
    const usersWorkTime = task?.usersWorkTime || {};
    generateBarChart(usersWorkTime);
  }, [task?.usersWorkTime]);

  const generateBarChart = (data: Record<string, number>) => {
    const options = {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      series: [{
        data: Object.values(data),
      }],
      xaxis: {
        categories: Object.keys(data),
      },
    };
  
    const chart = new ApexCharts(document.querySelector('#chart'), options);
    chart.render();
  };

    return(
        <div className="task-details-container">
            <div className='task-details-first-container'>
                <div className='task-details-first-container-top'>
                    <h5>{task?.title}</h5>
                    <p>{task?.description}</p>
                    <span>Created at: {task && convertDateTime(task?.startDate)}</span>
                </div>
                <div className='task-container-first-container-buttons'>
                    <button className='btn btn-start' onClick={handleStartRecording}><FaPlay/> Start</button>
                    <button className='btn btn-finish' onClick={handleStopRecording}><FaStop/> Stop</button>
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
                              <div>
                                <img src={follower.imgUrl} alt="" key={follower.id} data-tooltip-content={follower.name} data-tooltip-id={`myTooltip-${follower.name}`}/>
                                <ReactTooltip id={`myTooltip-${follower.name}`} place="top"/>
                              </div>
                            ))}
                            
                            {task?.creatorId === user?.id && <>
                            <button onClick={openFollowersModal} className='add-followers-button'><img src={Plus} alt="" /></button>
                            <Modal 
                              isOpen={followersModalIsOpen}
                              onRequestClose={closeFollowersModal}
                              contentLabel="Example Modal"
                              overlayClassName="modal-overlay"
                              className="modal-content"
                              >
                              <form onSubmit={handleSubmitTask(onSubmitTask)} className="work-edit-form">
                                  <h4>Add or Remove Followers</h4>
                                  <div className="work-edit-input-container">
                                      <label htmlFor="">Followers</label>
                                      <Controller 
                                        name = 'followers'
                                        rules = {{required: false}}
                                        control = {controlTask}
                                        render = {( {field} ) => (
                                          <Select 
                                            {...field}
                                            options={selectFollowers}
                                            defaultValue={task?.followers}
                                            classNamePrefix="users-crud-select"
                                            placeholder="Followers"
                                            isMulti
                                            getOptionLabel={(user: User) => user.name}
                                            getOptionValue={(user: User) => user.id.toString()}
                                          />    
                                        )}
                                      />
                                  </div>
                                  {error && <p className="error-message">{error}</p>}
                                  <div className="work-edit-buttons">
                                      <button onClick={closeFollowersModal} className="btn">Close</button>
                                      <button className="btn">Submit</button>
                                  </div>
                            </form>
                        </Modal>
                        </>}
                        </div>
                    </div>
                </div>
                <div className='task-container-first-container-details'>
                  {isRecording && (
                    <p className='elapsed-time-line'>Elapsed Time: {formatTime(elapsedTime)}</p>
                  )}
                </div>
            </div>

            <div className='task-details-second-container'>
                <Tab.Container id="tasks-tabs" defaultActiveKey="comments">
                  <Nav variant="pills" className="nav-pills mb-2 mt-2" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="comments"><BiCommentDetail/></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="works"><AiOutlineTool/></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="data"><FaRegChartBar/></Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content id="slideInUp" className='heigth-100'>
                    <Tab.Pane eventKey="comments" className='heigth-100'>
                      <div className='task-comments-row'>
                        {task?.comments.sort( (a,b) => a.dateTime > b.dateTime ? 1 : -1).map(comment => (
                          <CommentCard comment={comment} onDelete={getTask} key={comment.id}/>
                        ))}
                      </div>
                      <div className='task-comment-form'>
                        <form onSubmit={handleSubmitComment(onSubmit)}>
                            <input
                              {...registerComment("text", {
                                required: "Campo obrigatório",
                              })}
                              type="text"
                              className={`form-control base-input ${
                                errorsComment.text ? "is-invalid" : ""
                              }`}
                              placeholder="Comment"
                              name="text"
                            />
                            <AiOutlineSend onClick={handleSubmitComment(onSubmit)}/>
                        </form>
                      </div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="works" className='heigth-100'>
                      <div className='task-comments-row'>
                        {user && task?.works.sort( (a,b) => a.dateTimeStart > b.dateTimeStart ? 1 : -1).map(work => (
                          <WorkCard userLogged={user} work={work} onDeleteWork={getTask} key={work.id}/>
                        ))}
                      </div>
                      <div className='new-work-button-container'>
                          <button className='btn' onClick={openModal}><AiOutlinePlus style={{marginRight:"5px"}}/> Add New Work</button>
                          <Modal 
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="Example Modal"
                            overlayClassName="modal-overlay"
                            className="modal-content"
                            >
                            <form onSubmit={handleSubmitWork(onSubmitWork)} className="work-edit-form">
                                <h4>Add Work</h4>
                                <div className="work-edit-input-container">
                                    <label htmlFor="">Start Date</label>
                                    <FlatPicker
                                        name="dateTimeStart"
                                        value={dateTimeStart}
                                        onChange={(selectedDateTimeStart: Date[]) => handleDateTimeStartChange(selectedDateTimeStart)}
                                        options={{
                                            enableTime: true,
                                            dateFormat: 'Y-m-d H:i',
                                            mode:'single',
                                            time_24hr: true,
                                        }}
                                        className="base-input time-input"
                                    />
                                </div>
                                <div className="work-edit-input-container">
                                    <label htmlFor="">End Date</label>
                                    <FlatPicker
                                        name="dateTimeEnd"
                                        value={dateTimeEnd}
                                        onChange={(selectedDateTimeEnd: Date[]) => handleDateTimeEndChange(selectedDateTimeEnd)}
                                        options={{
                                            enableTime: true,
                                            dateFormat: 'Y-m-d H:i',
                                            mode:'single',
                                            time_24hr: true,
                                        }}
                                        className="base-input time-input"
                                    />
                                </div>
                                {error && <p className="error-message">{error}</p>}
                                <div className="work-edit-buttons">
                                    <button onClick={closeModal} className="btn">Close</button>
                                    <button className="btn">Submit</button>
                                </div>
                            </form>
                        </Modal>
                      </div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="data" className='heigth-100'>
                      {task?.usersWorkTime && Object.entries(task.usersWorkTime)
                        .sort(([, timeA], [, timeB]) => timeB - timeA)
                        .map(([user, workTime]) => (
                          <p key={user}>{user} : {convertTimeToHours(workTime)}</p>
                        ))
                      }
                      <div id="chart"></div>
                    </Tab.Pane>

                  </Tab.Content>
                </Tab.Container>
            </div>
        </div>
    );
}

export default TaskDetails;