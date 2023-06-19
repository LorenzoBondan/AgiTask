
import { useCallback, useEffect, useState } from 'react';
import './styles.css';
import { User } from 'types';
import { getTokenData } from 'util/auth';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import NotificationCard from './NotificationCard';

type Props = {
    user: User;
    onReadTask: Function;
}

const Notifications = ({user, onReadTask} : Props) => {

    return(
        <div className="notifications-container">
            <div className='notifications-column'>
                {user.notifications.map(notification => (
                    <NotificationCard notification={notification} onRead={() => onReadTask()}/>
                ))}
            </div>
        </div>
    );
}

export default Notifications;