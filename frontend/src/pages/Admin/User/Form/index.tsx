import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { requestBackend } from 'util/requests';
import { Role, User } from 'types';
import { toast } from 'react-toastify';

type UrlParams = {
    userId: string;
}

const Form = () => {

    const {userId} = useParams<UrlParams>();

    const isEditing = userId !== 'create';

    const { register, handleSubmit, formState: {errors}, setValue, control } = useForm<User>();

    useEffect(() => {
        if(isEditing){
            requestBackend({url:`/users/${userId}`, withCredentials:true})
                .then((response) => {
                    const user = response.data as User;

                    setValue('name', user.name);
                    setValue('imgUrl', user.imgUrl);
                    setValue('password', user.password);
                    setValue('email', user.email);
                    setValue('commentsId', user.commentsId);
                    setValue('notifications', user.notifications);
                    setValue('commentsId', user.commentsId);
                    setValue('groupsId', user.groupsId);
                    setValue('works', user.works);
                    setValue('tasksId',user.tasksId);
                    setValue('tasksFollowingId', user.tasksFollowingId);
                    setValue('roles', user.roles);
                    setValue('totalWorkTime',user.totalWorkTime);
                    setValue('totalTasksCompleted', user.totalTasksCompleted);
                })
        }
        
    }, [isEditing, userId, setValue]);

    const history = useHistory();

    const [selectRoles, setSelectRoles] = useState<Role[]>();

    useEffect(() => {
        requestBackend({url: '/roles', params: {page: 0, size: 50, }, withCredentials: true})
            .then(response => {
                setSelectRoles(response.data.content)
        })
    }, []);

    const onSubmit = (formData : User) => {

        const params : AxiosRequestConfig = {
            method: isEditing? "PUT" : "POST",
            url : isEditing? `/users/${userId}` : "/users",
            data: formData,
            withCredentials: true
        };

        requestBackend(params)
            .then(response => {
                console.log('Sucesso', response.data);
                history.push("/admin/users");
            })
            .catch(() => {
                toast.error('Error');
            })
    };

    const handleCancel = () => {
        history.push("/admin/users")
    }

    return(
        <div className="edit-profile-form-container">
            <div className="base-card post-card-form-card">
                <h1>Edit Profile</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row post-crud-inputs-container'>
                        <div className='post-crud-inputs-left-container'>
                            <div className='margin-bottom-30'>
                                <label htmlFor="">Name</label>
                                <input 
                                    {...register("name", {
                                    required: 'Campo obrigatório',
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.name ? 'is-invalid' : ''}`}
                                    placeholder="Name"
                                    name="name"
                                />
                                <div className='invalid-feedback d-block'>{errors.name?.message}</div>
                            </div>
                        </div>
                        <div className='margin-bottom-30'>
                            <label htmlFor="">Img Url</label>  
                                <input 
                                    {...register("imgUrl", {
                                    required: 'Campo obrigatório',
                                    pattern: { 
                                        value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                                        message: 'Insira uma URL válida'
                                    }
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.imgUrl ? 'is-invalid' : ''}`}
                                    placeholder="URL of course's image"
                                    name="imgUrl"
                                />
                                <div className='invalid-feedback d-block'>{errors.imgUrl?.message}</div>
                        </div>
                        <div className='margin-bottom-30'>
                            <label htmlFor="" style={{color:"white"}}>Roles</label> 
                                <Controller 
                                    name = 'roles'
                                    rules = {{required: true}}
                                    control = {control}
                                    render = {( {field} ) => (
                                        <Select 
                                            {...field}
                                            options={selectRoles}
                                            classNamePrefix="users-crud-select"
                                            placeholder="Roles"
                                            isMulti
                                            getOptionLabel={(role: Role) => role.authority}
                                            getOptionValue={(role: Role) => role.id.toString()}
                                        />    
                                    )}
                                />
                                {errors.roles && (
                                    <div className='invalid-feedback d-block'>Campo obrigatório</div>
                                )}
                        </div>
                        <div className='post-crud-buttons-container'>
                            <button 
                                className='btn btn-outline-danger post-crud-buttons'
                                onClick={handleCancel}
                                >
                                CANCEL
                            </button>
                            <button className='btn btn-primary text-white post-crud-buttons'>SAVE</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;