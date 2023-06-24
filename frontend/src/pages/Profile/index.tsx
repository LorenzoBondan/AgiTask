
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './styles.css';
import { User, Work } from 'types';
import { getTokenData } from 'util/auth';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { BsClock } from 'react-icons/bs';
import { BsListTask } from 'react-icons/bs';
import { AiOutlineTool } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { FaCrown } from 'react-icons/fa';
import { BsFillGearFill } from 'react-icons/bs';
import { BsFillBarChartFill } from 'react-icons/bs';
import { MdVerified } from 'react-icons/md';
import { MdGroups } from 'react-icons/md';
import { MdOutlineTask } from 'react-icons/md';
import GroupCard from './GroupCard';
import { NavLink } from 'react-router-dom';
import plusIcon from 'assets/images/plus.png';
import { convertTimeToHours } from 'helpers';
import WorkCard from './WorkCard';
import { Tooltip as ReactTooltip } from 'react-tooltip'

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

  function getCurrentMonth() {
    const currentDate = new Date();
    return currentDate.getMonth() + 1;
  }

  const [selectedMonth, setSelectedMonth] = useState<string>(getCurrentMonth().toString());

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

  function getCurrentYear() {
    const currentDate = new Date();
    return currentDate.getFullYear();
  }

  const [selectedYear, setSelectedYear] = useState<string>(getCurrentYear().toString());

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedYear(event.target.value);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  const [totalWorkedTimeByMonth, setTotalWorkedTimeByMonth] = useState<number>();

  const getTotalWorkedTimeByMonth = useCallback(() => {
    if(user){
      const params : AxiosRequestConfig = {
        method:"GET",
        url: `/works/${user?.id}/totalTime/${selectedYear}/${selectedMonth}`,
        withCredentials:true
      }
      requestBackend(params) 
        .then(response => {
            setTotalWorkedTimeByMonth(response.data);
        })
    }
  }, [user, selectedMonth, selectedYear])

  useEffect(() => {
    getTotalWorkedTimeByMonth();
  }, [getTotalWorkedTimeByMonth]);

  // find works by employee and month

  const [worksByEmployeeAndMonth, setWorksByEmployeeAndMonth] = useState<Work[]>([]);

  const getWorksByEmployeeAndMonth = useCallback(() => {
      const params : AxiosRequestConfig = {
        method:"GET",
        url: `/works/${user?.id}/totalWorks/${selectedYear}/${selectedMonth}`,
        withCredentials:true
      }
      requestBackend(params) 
        .then(response => {
            setWorksByEmployeeAndMonth(response.data);
        })
  }, [user?.id, selectedMonth, selectedYear])

  useEffect(() => {
    if (user?.id && selectedMonth) {
      getWorksByEmployeeAndMonth();
    }
  }, [user?.id, selectedMonth, getWorksByEmployeeAndMonth]);

  const updateWhenDeleteWork = () => {
    getUser();
    getWorksByEmployeeAndMonth();
  }
  
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
                        <div className='profile-card-user-info'>
                          <p data-tooltip-id={`myTooltip`} data-tooltip-content="Total Worked Time"><BsClock style={{marginRight:"3px"}}/>{user && convertTimeToHours(user?.totalWorkTime)}</p>
                          <p data-tooltip-id={`myTooltip`} data-tooltip-content="Total Tasks Completed"><MdVerified style={{marginRight:"3px", color:"#0DAA2A"}}/><strong>{user?.totalTasksCompleted}</strong></p>
                        </div>
                        <div className='profile-card-user-info-bottom-container'>
                            <p data-tooltip-id={`myTooltip`} data-tooltip-content="Total Tasks"><BsListTask style={{marginRight:"3px"}}/><strong>{user?.tasksId.length}</strong></p>
                            <p data-tooltip-id={`myTooltip`} data-tooltip-content="Total Works"><AiOutlineTool style={{marginRight:"3px"}}/><strong>{user?.works.length}</strong></p>
                            <p data-tooltip-id={`myTooltip`} data-tooltip-content="Total Comments"><BiCommentDetail style={{marginRight:"3px"}}/><strong>{user?.commentsId.length}</strong> </p>
                            <ReactTooltip id={'myTooltip'} place="top" />
                        </div>
                    </div>
                    <div className='profile-edit-button-container'>
                        <button className='btn btn-primary'><BsFillGearFill style={{marginRight:"5px"}}/> Edit Profile</button>
                    </div>
                </div>
                <div className='profile-card-second-container'>
                    <div className='profile-card-groups-container'>
                        <h3><MdGroups style={{marginRight:"3px"}}/>Groups</h3>
                        <NavLink to="/createGroup">
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
                        <h6><BsFillBarChartFill style={{marginRight:"3px"}}/>Your Personal Data</h6>
                        <div className='profile-card-filter-inputs'>
                          <input type="text" className='base-input year-input' value={selectedYear} onChange={handleYearChange}/>
                          <select className='base-input month-input' value={selectedMonth} onChange={handleSelectChange}>
                              {months.map((month) => (
                                  <option key={month.value} value={month.value}>
                                  {month.label}
                                  </option>
                              ))}
                          </select>
                        </div>
                    </div>
                    <div className='profile-card-results-container'>
                        <div className='profile-card-results-top'>
                          <h4><BsClock style={{marginRight:"3px"}}/>Total worked time: <strong>{totalWorkedTimeByMonth && convertTimeToHours(totalWorkedTimeByMonth)}</strong></h4>
                          <h4><MdOutlineTask style={{fontSize:"20px"}}/> Works registered: <strong>{worksByEmployeeAndMonth.length}</strong></h4>
                        </div>
                        <div className='row profile-card-works'>
                          <div className='col-lg-6'>
                            {worksByEmployeeAndMonth.slice(0, Math.ceil(worksByEmployeeAndMonth.length / 2)).map(work => (
                              <WorkCard work={work} onDeleteWork={updateWhenDeleteWork} key={work.id}/>
                            ))}
                          </div>
                          <div className='col-lg-6'>
                            {worksByEmployeeAndMonth.slice(Math.ceil(worksByEmployeeAndMonth.length / 2)).map(work => (
                              <WorkCard work={work} onDeleteWork = {updateWhenDeleteWork} key={work.id}/>
                            ))}
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;