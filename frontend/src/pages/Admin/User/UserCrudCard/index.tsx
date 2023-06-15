

import { Link } from 'react-router-dom';
import { requestBackend } from 'util/requests';
import { AxiosRequestConfig } from 'axios';
import { User } from 'types';
import './styles.css';

type Props = {
  user : User;
  onDelete : Function;
}

function UserCrudCard( {user, onDelete} : Props ) {

  const handleDelete = (userId : number) => {
    
    if(!window.confirm("Are you sure that you want to delete the user?")){ // messagebox
      return;
    }

    const params : AxiosRequestConfig = {
      method:"DELETE",
      url: `/users/${userId}`,
      withCredentials: true
    }

    requestBackend(params).then(() => {
      onDelete();
    })
  }


    return (
      <>
        <div className='base-card user-crud-card'>

            <div className='user-crud-card-top-container'>
              <img src={user.imgUrl} alt="" />
              <h3>{user.name}</h3>
            </div>

            <div className='user-crud-card-buttons-container'>
              <Link to={`/admin/users/${user.id}`}>
                  <button className='btn btn-outline-secondary user-crud-card-button'>
                    EDIT
                  </button>
                </Link>
              <button className='btn btn-outline-danger user-crud-card-button delete-button'
                onClick={() => handleDelete(user.id)}
                >
                  DELETE
                </button>
            </div>
        </div>
        
      </>
    );
  }

  export default UserCrudCard;