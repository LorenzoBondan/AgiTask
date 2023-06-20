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

type Props = {
    work: Work;
    task: Task;
    onDeleteWork: Function;
}

const WorkCard = ({task, work, onDeleteWork} : Props) => {

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
                        <h2>Hello</h2>
                        <button onClick={closeModal}>Close</button>
                    </Modal>
                </div>
            </div>

        </div>
    );
}

export default WorkCard;