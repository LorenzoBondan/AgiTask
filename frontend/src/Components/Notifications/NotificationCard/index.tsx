import { Notification } from 'types';
import './styles.css';
import { convertDateTime } from 'helpers';
import { useCallback } from 'react';
import { BsEye } from 'react-icons/bs'; 
import { FiClock } from 'react-icons/fi';
import { AiOutlineCheck } from 'react-icons/ai';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

type Props = {
    notification: Notification;
    onRead : Function;
}

const NotificationCard = ({notification, onRead} : Props) => {

    const handleReadChange = () => {
      if(notification.read){
        updateUnreadStatus();
      }
      else{
        updateReadStatus();
      }
    };

    const updateReadStatus = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"PUT",
          url: `/notifications/${notification.id}/read`,
          withCredentials:true
        }
        try{
        requestBackend(params) 
          .then(response => {
            onRead();
          })
        }
        catch(error){
            console.log(error);
        }
    }, [notification.id, onRead])

    const updateUnreadStatus = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"PUT",
          url: `/notifications/${notification.id}/unread`,
          withCredentials:true
        }
        try{
        requestBackend(params) 
          .then(response => {
            console.log("unread");
            onRead();
          })
        }
        catch(error){
            console.log(error);
        }
    }, [notification.id, onRead])

    return(
        <div className={notification.read ? "notification-card-container" : "notification-card-container notification-card-container-unread"}>
            <div className='notification-card-content'>
                <h6>{notification.description}</h6>
                <p><FiClock style={{marginRight:"3px"}}/>{convertDateTime(notification.moment)}</p>
            </div>
            <div className='notification-card-button'>
                {notification.read && <AiOutlineCheck style={{marginRight:"2px"}} />}
                <BsEye onClick={handleReadChange} className='notification-card-eye' />
            </div>
        </div>
    );
}

export default NotificationCard;