import { NavLink } from 'react-router-dom';
import { BsListTask } from 'react-icons/bs';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { AiOutlinePlus } from 'react-icons/ai';
import { useCallback, useEffect, useState } from 'react';
import { User } from 'types';
import { getTokenData } from 'util/auth';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import './styles.css';
import Notifications from 'Components/Notifications';

const TopNavbar = () => {

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
  
    const [showNotifications, setShowNotifications] = useState(false);
    
    const openAndCloseNotifications = () => {
        if(showNotifications){
          setShowNotifications(false);
        }
        else{
          setShowNotifications(true);
        }
    }

    useEffect(() => {
      getUser();
    }, [getUser]);

    return(
        <div className='top-navbar-main-container'>
          <div className='tasks-container-navbar'>
              <NavLink to="/profile">
                  <div className='tasks-container-first'>
                      <img src={user?.imgUrl} alt="" />
                      <h1>{user?.name}</h1>
                  </div>
              </NavLink>
              <div className='tasks-container-second'>
                  <p onClick={() => openAndCloseNotifications()}>
                    <IoIosNotificationsOutline className='top-navbar-icon' />
                    {user && user?.notifications.filter(notification => !notification.read).length > 0 && <span className='notification-badge'>{user?.notifications.filter(notification => !notification.read).length}</span>}
                  </p>
                  
                  <NavLink to="/create">
                      <p><AiOutlinePlus className='top-navbar-icon'/></p>
                  </NavLink>
                  <NavLink to="/tasks">
                      <p><BsListTask className='top-navbar-icon'/></p>
                  </NavLink>
              </div>
          </div>
          {showNotifications && 
            <div className='top-navbar-notifications-container'>
              {user && <Notifications/>}
            </div>
          }
        </div>
    );
}

export default TopNavbar;