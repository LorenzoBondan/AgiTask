
import './styles.css';
import { User } from 'types';
import NotificationCard from './NotificationCard';
import { useCallback, useEffect, useState } from 'react';
import { getTokenData } from 'util/auth';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

const Notifications = () => {

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

    return(
        <div className="notifications-container">
            <div className='notifications-column'>
                {user && user.notifications.map(notification => (
                    <NotificationCard notification={notification} onRead={getUser} key={notification.id}/>
                ))}
            </div>
        </div>
    );
}

export default Notifications;