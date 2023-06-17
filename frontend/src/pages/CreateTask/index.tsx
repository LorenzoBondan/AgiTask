import { Task, User } from 'types';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { useCallback, useEffect, useState } from 'react';
import { getTokenData, isAuthenticated } from 'util/auth';
import Select from 'react-select';
import './styles.css';

const CreateTask = () => {
  const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<Task>();
  const history = useHistory();

  const [user, setUser] = useState<User | null>(null);

  const getUser = useCallback(async () => {
    try {
      const email = getTokenData()?.user_name;

      if (email) {
        const params: AxiosRequestConfig = {
            method: 'GET',
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

  const onSubmit = async (formData: Task) => {
    if (user) {
      formData.status = "PENDING";
      formData.startDate = new Date().toISOString();
      formData.creatorId = user.id;

      console.log(formData);

      try {
        const params: AxiosRequestConfig = {
          method: "POST",
          url: "/tasks",
          data: formData,
          withCredentials: true
        };

        await requestBackend(params);
        history.push("/tasks");
      } catch (error) {
        console.log("Error: " + error);
      }
    }
  };

  const handleCancel = () => {
    history.push("/tasks");
  };

  const [selectFollowers, setSelectFollowers] = useState<User[]>();

  const followersIds = selectFollowers?.map(follower => follower.id);
  const followersNames = selectFollowers?.map(follower => follower.name);

  useEffect(() => {
      requestBackend({url: '/users', withCredentials: true})
          .then(response => {
            setSelectFollowers(response.data.content)
      })
  }, []);


  return (
    <div className="create-task-container">
      <h1>Create</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="base-card post-card-form-card">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row post-crud-inputs-container'>
                        <div className='post-crud-inputs-left-container'>

                            <div className='margin-bottom-30'>
                                <label htmlFor="">Title</label>
                                <input 
                                    {...register("title", {
                                    required: 'Campo obrigatório',
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.title ? 'is-invalid' : ''}`}
                                    placeholder="Title"
                                    name="title"
                                />
                                <div className='invalid-feedback d-block'>{errors.title?.message}</div>
                            </div>

                        </div>

                        <div className='post-crud-inputs-left-container'>

                        <div className='margin-bottom-30'>
                            <label htmlFor="">Description</label>
                            <input 
                                {...register("description", {
                                required: 'Campo obrigatório',
                                })}
                                type="text"
                                className={`form-control base-input ${errors.description ? 'is-invalid' : ''}`}
                                placeholder="Description"
                                name="description"
                            />
                            <div className='invalid-feedback d-block'>{errors.description?.message}</div>
                        </div>

                        </div>
                        
                        {followersNames && followersIds && 
                        <div className='margin-bottom-30'>
                            <label htmlFor="" style={{color:"white"}}>Followers</label> 
                            <Controller
  name="followersId"
  rules={{ required: 'Campo obrigatório' }}
  control={control}
  render={({ field }) => (
<Select
  {...field}
  options={(followersIds || []).map((id, index) => ({
    value: id,
    label: followersNames[index],
    key: id // Adicione uma chave única com base no ID ou outro identificador exclusivo
  }))}
  classNamePrefix="users-crud-select"
  placeholder="Followers"
  isMulti
  getOptionLabel={(follower: { value: number; label: string }) => follower.label}
  getOptionValue={(follower: { value: number; label: string }) => follower.value.toString()}
  value={field.value ? field.value.map((id: number) => ({ value: id, label: '', key: id })) : []}
/>

  )}
/>




                                {errors.followersId && (
                                    <div className='invalid-feedback d-block'>Campo obrigatório</div>
                                )}
                        </div>
                        }

                        <div className='post-crud-buttons-container'>
                            <button 
                                className='btn btn-outline-danger post-crud-buttons'
                                onClick={handleCancel}
                                >
                                CANCEL
                            </button>

                            <button className='btn btn-primary text-white post-crud-buttons' onClick={() => onSubmit}>SAVE</button>
                        </div>
                    </div>
                </form>
            
            </div>
      </form>
    </div>
  );
};

export default CreateTask;
