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
import FlatPicker from 'react-flatpickr';
import "flatpickr/dist/themes/material_orange.css";

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

  
  const [dateTimeStart, setDateTimeStart] = useState('');
  const [dateTimeEnd, setDateTimeEnd] = useState('');

  const onSubmitEdit = (formData : Work) => {

    const correctTime = (dateTimeStart: string): string => {
        const startDate = new Date(dateTimeStart);
        startDate.setHours(startDate.getHours() - 3);
        return startDate.toISOString();
    };

    formData.dateTimeStart = correctTime(dateTimeStart);
    formData.dateTimeEnd = correctTime(dateTimeEnd);

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

    const handleDateTimeStartChange = (selectedDateTime: string | Date[]) => {
        if (Array.isArray(selectedDateTime)) {
          if (selectedDateTime.length > 0) {
            const selectedDate = selectedDateTime[0];
            setDateTimeStart(selectedDate.toISOString());
          } else {
            setDateTimeStart('');
          }
        } else {
            setDateTimeStart(selectedDateTime);
        }
        console.log("start: " + dateTimeStart);
    };

    const handleDateTimeEndChange = (selectedDateTime: string | Date[]) => {
        if (Array.isArray(selectedDateTime)) {
          if (selectedDateTime.length > 0) {
            const selectedDate = selectedDateTime[0];
            setDateTimeEnd(selectedDate.toISOString());
          } else {
            setDateTimeEnd('');
          }
        } else {
            setDateTimeEnd(selectedDateTime);
        }
        console.log("end: ", dateTimeEnd);
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
                            <label htmlFor="">Start Date</label>
                            <FlatPicker
                              name="dateTimeStart"
                              value={dateTimeStart}
                              onChange={(selectedDateTime: Date[]) => handleDateTimeStartChange(selectedDateTime)}
                              options={{
                                  enableTime: true,
                                  dateFormat: 'Y-m-d h:m',
                                  mode:'single'
                              }}
                              className="base-input time-input"
                            />

                            <label htmlFor="">End Date</label>
                            <FlatPicker
                              name="dateTimeEnd"
                              value={dateTimeEnd}
                              onChange={(selectedDateTime: Date[]) => handleDateTimeEndChange(selectedDateTime)}
                              options={{
                                  enableTime: true,
                                  dateFormat: 'Y-m-d h:m',
                                  mode:'single',
                                  
                              }}
                              className="base-input time-input"
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