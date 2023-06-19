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
  
    useEffect(() => {
      getUser();
    }, [getUser]);

    return(
        <div className='tasks-container-navbar'>
            <NavLink to="/profile">
                <div className='tasks-container-first'>
                    <img src={user?.imgUrl} alt="" />
                    <h1>{user?.name}</h1>
                </div>
            </NavLink>
            <div className='tasks-container-second'>
                <p><IoIosNotificationsOutline className='top-navbar-icon' /></p>
                <NavLink to="/create">
                    <p><AiOutlinePlus className='top-navbar-icon'/></p>
                </NavLink>
                <NavLink to="/tasks">
                    <p><BsListTask className='top-navbar-icon'/>{user?.tasksId.length}</p>
                </NavLink>
            </div>
        </div>
    );
}

export default TopNavbar;