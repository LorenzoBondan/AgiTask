
import { useCallback, useEffect, useState } from 'react';
import './styles.css';
import { User } from 'types';
import { getTokenData } from 'util/auth';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

import { BsListTask } from 'react-icons/bs';
import { AiOutlineTool } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { FaCrown } from 'react-icons/fa';

const Profile = () => {

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
        <div className="profile-container">
            <div className='profile-card base-card'>
                <div className='profile-card-first-container'>
                    <div className='profile-card-image-container'>
                        <img src={user?.imgUrl} alt="" />
                    </div>
                    <div className='profile-card-user-info-container'>
                        <h3>{user?.name}</h3>
                        <h6>{user?.email}</h6>
                        {user?.roles.map(role => (
                            <span><FaCrown style={{marginRight:"3px", color:"#FECB33"}}/>{role.authority.substring(5).charAt(0).toUpperCase() + role.authority.substring(6).toLowerCase()}</span>
                        ))}
                        <div className='profile-card-user-info-bottom-container'>
                            <p><BsListTask style={{marginRight:"3px"}}/><strong>{user?.tasksId.length}</strong></p>
                            <p><AiOutlineTool style={{marginRight:"3px"}}/><strong>{user?.works.length}</strong></p>
                            <p><BiCommentDetail style={{marginRight:"3px"}}/><strong>{user?.commentsId.length}</strong></p>
                        </div>
                    </div>
                    <div className='profile-edit-button-container'>
                        <button className='btn btn-primary'>Edit Profile</button>
                    </div>
                </div>
                <div className='profile-card-second-container'>

                </div>
            </div>
        </div>
    );
}

export default Profile;