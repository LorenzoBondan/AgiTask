
import './styles.css';
import { User } from 'types';
import NotificationCard from './NotificationCard';
import { useCallback, useEffect, useState } from 'react';
import { getTokenData } from 'util/auth';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

type Props = {
    onReadNotification : Function;
}

const Notifications = ({onReadNotification} : Props) => {

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

    const handleChangeRead = () => {
        getUser();
        onReadNotification();
    }

    return(
        <div className="notifications-container">
            <div className='notifications-column'>
                {user && user.notifications.sort( (a,b) => a.moment < b.moment ? 1 : -1).map(notification => (
                    <NotificationCard notification={notification} onRead={handleChangeRead} key={notification.id}/>
                ))}
            </div>
        </div>
    );
}

export default Notifications;