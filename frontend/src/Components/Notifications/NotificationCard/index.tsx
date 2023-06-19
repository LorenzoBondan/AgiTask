
import { Notification } from 'types';
import './styles.css';
import { convertDateTime } from 'helpers';
import { useCallback, useState } from 'react';

import { BsEye } from 'react-icons/bs'; 
import { FiClock } from 'react-icons/fi';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

type Props = {
    notification: Notification;
    onRead : Function;
}

const NotificationCard = ({notification, onRead} : Props) => {

    const verifyIfIsChanged = () => {
        if(notification.read){
            return true;
        }
        else{
            return false;
        }
    }

    const [isChecked, setIsChecked] = useState(verifyIfIsChanged());

    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
      if(isChecked){
        updateReadStatus();
      }
    };

    const updateReadStatus = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"PUT",
          url: `/notifications/${notification.id}/read`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            onRead();
          })
    }, [notification.id, onRead])

    return(
        <div className={isChecked ? "notification-card-container" : "notification-card-container notification-card-container-unread"}>
            <div className='notification-card-content'>
                <h6>{notification.description}</h6>
                <p><FiClock style={{marginRight:"3px"}}/>{convertDateTime(notification.moment)}</p>
            </div>
            <div className='notification-card-button'>
                <BsEye style={{marginRight:"3px"}}/>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
            </div>
        </div>
    );
}

export default NotificationCard;