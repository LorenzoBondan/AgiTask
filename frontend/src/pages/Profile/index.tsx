
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './styles.css';
import { User } from 'types';
import { getTokenData } from 'util/auth';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { BsClock } from 'react-icons/bs';
import { BsListTask } from 'react-icons/bs';
import { AiOutlineTool } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { FaCrown } from 'react-icons/fa';
import { BsFillGearFill } from 'react-icons/bs';
import { MdGroups } from 'react-icons/md';
import GroupCard from './GroupCard';
import { NavLink } from 'react-router-dom';
import plusIcon from 'assets/images/plus.png';
import { convertTimeToHours } from 'helpers';

type MonthOption = {
    value: string;
    label: string;
  };

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

  // filter by month

  const [selectedMonth, setSelectedMonth] = useState<string>('');

  const months: MonthOption[] = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  const [totalWorkedTimeByMonth, setTotalWorkedTimeByMonth] = useState<number>();

  const getTotalWorkedTimeByMonth = useCallback(() => {
      const params : AxiosRequestConfig = {
        method:"GET",
        url: `/works/${user?.id}/totalTime/${selectedMonth}`,
        withCredentials:true
      }
      requestBackend(params) 
        .then(response => {
            setTotalWorkedTimeByMonth(response.data);
        })
  }, [user?.id, selectedMonth])

  useEffect(() => {
    getTotalWorkedTimeByMonth();
  }, [getTotalWorkedTimeByMonth]);



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
                        <p><BsClock style={{marginRight:"3px"}}/>{user && convertTimeToHours(user?.totalWorkTime)}</p>
                        <div className='profile-card-user-info-bottom-container'>
                            <p><BsListTask style={{marginRight:"3px"}}/><strong>{user?.tasksId.length}</strong></p>
                            <p><AiOutlineTool style={{marginRight:"3px"}}/><strong>{user?.works.length}</strong></p>
                            <p><BiCommentDetail style={{marginRight:"3px"}}/><strong>{user?.commentsId.length}</strong></p>
                        </div>
                    </div>
                    <div className='profile-edit-button-container'>
                        <button className='btn btn-primary'><BsFillGearFill style={{marginRight:"5px"}}/> Edit Profile</button>
                    </div>
                </div>

                <div className='profile-card-second-container'>
                    <div className='profile-card-groups-container'>
                        <h3><MdGroups style={{marginRight:"3px"}}/>Groups</h3>
                        <NavLink to="/create">
                            <button className='btn'><img src={plusIcon} alt="" />New Group</button>
                        </NavLink>
                    </div>
                    <div className='profile-card-groups'>
                        {user?.groupsId.map(groupId => (
                            <GroupCard groupId={groupId} onLeaveGroup={getUser}/>
                        ))}
                    </div>
                </div>

                <div className='profile-card-third-container'>
                    <div className='profile-card-filter-container'>
                        <h1>{totalWorkedTimeByMonth}</h1>
                        <select className='base-input' value={selectedMonth} onChange={handleSelectChange}>
                            <option value="">Selecione um mês</option>
                            {months.map((month) => (
                                <option key={month.value} value={month.value}>
                                {month.label}
                                </option>
                            ))}
                            </select>
                    </div>
                    <div className='profile-card-results-container'>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;