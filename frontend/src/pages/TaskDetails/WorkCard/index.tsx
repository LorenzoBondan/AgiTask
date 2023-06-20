import { AxiosRequestConfig } from "axios";
import { convertDateTime, convertTimeToHours } from "helpers";
import { useCallback, useEffect, useState } from "react";
import { User, Work } from "types";
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
    onDeleteWork: Function;
    userLogged: User;
}

const WorkCard = ({work, onDeleteWork, userLogged} : Props) => {

    const { handleSubmit, setValue } = useForm<Work>();

    const [error, setError] = useState<string | null>(null);

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

    if(formData.dateTimeEnd < formData.dateTimeStart){
        setError("End Date cannot be earlier than Start Date");
        return;
    }

    const params : AxiosRequestConfig = {
        method: "PUT",
        url : `/works/${work.id}`,
        data: formData,
        withCredentials: true
    };

    requestBackend(params)
        .then(response => {
            console.log('success', response.data);
            closeModal();
            onDeleteWork();
            setError('');
        })
        .catch((error) => {
            console.log(error);
            setError(error.message);
        })
        
    };

    const handleDateTimeStartChange = (selectedDateTime: Date[]) => {
        setDateTimeStart(selectedDateTime[0].toISOString());
    };
      
    const handleDateTimeEndChange = (selectedDateTime: Date[]) => {
        setDateTimeEnd(selectedDateTime[0].toISOString());
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
                    <p><BsClock style={{marginRight:"3px"}}/><strong>{work.totalTime && convertTimeToHours(work.totalTime)}</strong></p>
                </div>
                <div className="work-card-content-task work-card-content-buttons">
                    {work.employeeId === userLogged?.id && (<>
                        <AiFillCloseCircle onClick={() => handleDeleteWork()}/>
                        <AiFillEdit onClick={() => openModal()}/>
                        <Modal 
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="Example Modal"
                            overlayClassName="modal-overlay"
                            className="modal-content"
                            >
                            <form onSubmit={handleSubmit(onSubmitEdit)} className="work-edit-form">
                                <h4>Edit Work</h4>
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
                                    <button onClick={handleSubmit(onSubmitEdit)} className="btn">Submit</button>
                                </div>
                            </form>
                        </Modal>
                    </>)}
                </div>
            </div>
        </div>
    );
}

export default WorkCard;