
import { Comment, Task, User } from 'types';
import './styles.css';
import { convertDateTime } from 'helpers';
import { getTokenData } from 'util/auth';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { useCallback, useEffect, useState } from 'react';
import { BsFillTrash3Fill } from 'react-icons/bs';

type Props = {
    comment: Comment;
    onDelete: Function;
}

const CommentCard = ({comment, onDelete} : Props) => {

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

    const [task, setTask] = useState<Task | null>(null);

    const getTask = useCallback(async () => {
      try {
        if (comment) {
          const params: AxiosRequestConfig = {
            method: "GET",
            url: `/tasks/${comment.taskId}`,
            withCredentials: true,
          };
  
          const response = await requestBackend(params);
          setTask(response.data);
        }
      } catch (error) {
        console.log("Error: " + error);
      }
    }, [comment]);
  
    useEffect(() => {
        getTask();
    }, [getTask]);

    const iAmTheAuthor = () => {
        if(comment.author.id === user?.id){
            return true;
        }
        else{
            return false;
        }
    }

    const iAmTheTaskAuthor = () => {
        if(task?.creatorId === user?.id){
            return true;
        }
        else{
            return false;
        }
    }

    const handleDeleteComment = useCallback(() => {
        if(!window.confirm(`Are you sure that you want to delete this comment?`)){
            return;
        }
        const params : AxiosRequestConfig = {
            method:"DELETE",
            url: `/comments/${comment.id}`,
            withCredentials:true
          }
          requestBackend(params) 
            .then(response => {
                onDelete();
        })
    }, [comment.id ,onDelete]);
    
    return(
        <div className={iAmTheAuthor() ? "comment-card-container-author" : "comment-card-container"}>
            <div className='comment-card-top-container'>
                <div className='comment-card-image'>
                    <img src={comment.author.imgUrl} alt="" /> 
                </div>
                <div className='comment-card-author'>
                    <div className='comment-card-author-content'>
                        <h6>{comment.author.name}</h6>
                        <div className='comment-card-author-bottom'>
                            <p>{convertDateTime(comment.dateTime)}</p>
                        </div>
                    </div>

                    {(iAmTheAuthor() || iAmTheTaskAuthor()) && 
                        <div className='comment-card-buttons'>
                            <BsFillTrash3Fill onClick={() => handleDeleteComment()}/>
                        </div>
                    }
                </div>
            </div>
            <div className='comment-card-content'>
                <p>{comment.text}</p>
            </div>
        </div>
    );
}

export default CommentCard;