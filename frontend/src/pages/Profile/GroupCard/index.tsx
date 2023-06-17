
import { Group } from 'types';
import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { BsClock } from 'react-icons/bs';
import { HiUsers } from 'react-icons/hi';
import { MdLogout } from 'react-icons/md';
import { convertTimeToHours } from 'helpers';

type Props = {
    groupId : number;
    onLeaveGroup : Function;
}

const GroupCard = ({groupId, onLeaveGroup} : Props) => {

    // get Group by id
    const [group, setGroup] = useState<Group>();

    const getThisGroup = useCallback(() => {
        const params : AxiosRequestConfig = {
          method:"GET",
          url: `/groups/${groupId}`,
          withCredentials:true
        }
        requestBackend(params) 
          .then(response => {
            setGroup(response.data);
          })
    }, [groupId])

    useEffect(() => {
        getThisGroup();
    }, [getThisGroup]);

    const [showSelect, setShowSelect] = useState(false);
    
    const openAndCloseSelect = () => {
        if(showSelect){
            setShowSelect(false);
        }
        else{
            setShowSelect(true);
        }
    }

    const handleLeaveGroup = useCallback(() => {
        if(!window.confirm(`Are you sure that you want to leave this group?`)){
            return;
        }
        const params : AxiosRequestConfig = {
            method:"PUT",
            url: `/groups/leave/${groupId}`,
            withCredentials:true
        }
          requestBackend(params) 
            .then(response => {
              onLeaveGroup();
        })
    }, [groupId ,onLeaveGroup])

    return(
        <div className="group-card-container">
            <div className='group-card-title'>
                <h5>{group?.name}</h5>
                <p><BsClock style={{marginRight:"3px"}}/>{group && convertTimeToHours(group?.totalWorkTime)}Total Time Woked</p>
            </div>
            <div className='group-card-members'>
                <div className='group-card-members-title'>
                    <h6><HiUsers style={{marginRight:"3px"}}/>{group?.users.length} Members</h6>
                    <button onClick={() => openAndCloseSelect()}>{!showSelect ?  "View" : "Hide" }</button>
                </div>
                {showSelect && 
                    <div className='group-card-members-members'>
                        {group?.users.map(user => (
                            <div className='group-card-user'>
                                <img src={user.imgUrl} alt="" />
                                <p>{user.name}</p>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <div className='group-card-leave'>
                <i onClick={() => handleLeaveGroup()}><MdLogout/></i>
            </div>
        </div>
    );
}

export default GroupCard;