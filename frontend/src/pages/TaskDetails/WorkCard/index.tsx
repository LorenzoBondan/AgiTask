import { AxiosRequestConfig } from "axios";
import { convertDateTime, convertTimeToHours } from "helpers";
import { useCallback, useEffect, useState } from "react";
import { Task, User, Work } from "types";
import { requestBackend } from "util/requests";
import { BsClock } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { AiFillEdit } from 'react-icons/ai';
import Modal from 'react-modal';
import './styles.css';
import { useForm } from "react-hook-form";

type Props = {
    work: Work;
    task: Task;
    onDeleteWork: Function;
}

const WorkCard = ({task, work, onDeleteWork} : Props) => {

    const { register, handleSubmit, formState: {errors}, setValue, control } = useForm<Work>();

    useEffect(() => {
        if(work){
            requestBackend({url:`/works/${work.id}`, withCredentials:true})
                .then((response) => {
                    const work = response.data as Work;

                    setValue('dateTimeStart', work.dateTimeStart);
                    setValue('dateTimeEnd', work.dateTimeEnd);
                    setValue('employeeId', work.employeeId);
                    setValue('taskId', work.taskId);
                    setValue('totalTime', work.totalTime);
                })
        }
        
    }, [work, setValue]);

    const [creator, setCreator] = useState<User | null>(null);

    const getCreator = useCallback(async () => {
      try {
        if (work) {
          const params: AxiosRequestConfig = {
            method: "GET",
            url: `/users/${work.employeeId}`,
            withCredentials: true,
          };
  
          const response = await requestBackend(params);
          setCreator(response.data);
        }
      } catch (error) {
        console.log("Error: " + error);
      }
    }, [work]);
  
    useEffect(() => {
      getCreator();
    }, [getCreator]);

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

    
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(){
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  const onSubmitEdit = (formData : Work) => {

    const params : AxiosRequestConfig = {
        method: "PUT",
        url : `/works/${work.id}`,
        data: formData,
        withCredentials: true
    };

    requestBackend(params)
        .then(response => {
            console.log('success', response.data);
        })
        .catch((error) => {
            console.log(error);
        })
        closeModal();
        onDeleteWork();
    };

    return(
        <div className="work-card-container-task">

            <div className="work-card-main-container-task">
                <div className="work-user-task">
                    <img src={creator?.imgUrl} alt="" />
                    <h6>{creator?.name}</h6>
                </div>
                <div className="work-card-content-task">
                    <span>Date Time Start</span>
                    <p><BsClock style={{marginRight:"3px"}}/>{convertDateTime(work.dateTimeStart)}</p>
                </div>
                <div className="work-card-content-task">
                    <span>Date Time End</span>
                    <p><BsClock style={{marginRight:"3px"}}/>{convertDateTime(work.dateTimeEnd)}</p>
                </div>
                <div className="work-card-content-task">
                    <span>Total Time</span>
                    <p><BsClock style={{marginRight:"3px"}}/><strong>{convertTimeToHours(work.totalTime)}</strong></p>
                </div>
                <div className="work-card-content-task work-card-content-buttons">
                    <AiFillCloseCircle onClick={() => handleDeleteWork()}/>
                    <AiFillEdit onClick={() => openModal()}/>
                    <Modal 
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        overlayClassName="modal-overlay"
                        className="modal-content"
                        >

                        <form onSubmit={handleSubmit(onSubmitEdit)}>
                            <input 
                                {...register("dateTimeStart", {
                                required: 'Campo obrigatório',
                                })}
                                type="text"
                                className={`form-control base-input ${errors.dateTimeStart ? 'is-invalid' : ''}`}
                                placeholder="Date Time Start"
                                name="dateTimeStart"
                            />
                            <input 
                                {...register("dateTimeEnd", {
                                required: 'Campo obrigatório',
                                })}
                                type="text"
                                className={`form-control base-input ${errors.dateTimeEnd ? 'is-invalid' : ''}`}
                                placeholder="Date Time End"
                                name="dateTimeEnd"
                            />
                            <button onClick={handleSubmit(onSubmitEdit)}>Submit</button>
                        </form>

                        
                        <button onClick={closeModal}>Close</button>
                    </Modal>
                </div>
            </div>

        </div>
    );
}

export default WorkCard;