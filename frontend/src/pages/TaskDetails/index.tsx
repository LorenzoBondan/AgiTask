
import { useParams } from 'react-router-dom';
import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { Comment, Task, User, Work } from 'types';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { getTokenData } from 'util/auth';
import { convertDateTime } from 'helpers';
import { Nav, Tab } from 'react-bootstrap';
import { BiCommentDetail } from 'react-icons/bi';
import { AiOutlineTool } from 'react-icons/ai';
import CommentCard from './CommentCard';
import { useForm } from 'react-hook-form';
import { AiOutlineSend } from 'react-icons/ai';
import WorkCard from './WorkCard';
import Modal from 'react-modal';
import FlatPicker from 'react-flatpickr';
import "flatpickr/dist/themes/material_orange.css";

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

  const { register: registerWork, handleSubmit: handleSubmitWork, formState: { errors: errorsWork }, setValue: setValueWork } = useForm<Work>();

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
                                <img src={follower.imgUrl} alt="" key={follower.id}/>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='task-container-first-container-details'>

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
                  </Nav>

                  <Tab.Content id="slideInUp">
                    <Tab.Pane eventKey="comments">
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

                    <Tab.Pane eventKey="works">
                      <div className='task-comments-row'>
                        {user && task?.works.map(work => (
                          <WorkCard userLogged={user} work={work} onDeleteWork={getTask} key={work.id}/>
                        ))}
                      </div>
                      <div className='new-work-button-container'>
                          <button className='btn btn-primary' onClick={openModal}>Add New Work</button>
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

                  </Tab.Content>
                </Tab.Container>
            </div>
        </div>
    );
}

export default TaskDetails;