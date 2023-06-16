
import { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { requestBackend } from 'util/requests';
import './styles.css';
import { User } from 'types';


const RegisterForm = () => {

    const { register, handleSubmit, formState: {errors} } = useForm<User>();

    const history = useHistory();

    const onSubmit = (formData : User) => {
        
        formData.roles = [ {id:1, authority:"ROLE_OPERATOR"} ]; 
        formData.imgUrl = "https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg";

        const params : AxiosRequestConfig = {
            method: "POST",
            url : "/users",
            data: formData,
            withCredentials: false
        };

        requestBackend(params)
            .then(response => {
                console.log('Success', response.data);
                history.push("/auth/login");
            })
    };

    const handleCancel = () => {
        history.push("/home")
    }

    return(
        <div className="register-container">

            <div className="base-card user-register-form-card">
                <h1>REGISTER</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row user-crud-inputs-container'>
                        <div className='user-crud-inputs-left-container'>

                            <div className='margin-bottom-30'>
                                <label htmlFor="" style={{color:"black"}}>Name</label>
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

                            <div className='margin-bottom-30'>
                                <label htmlFor="" style={{color:"black"}}>Email</label>
                                <input 
                                    {...register("email", {
                                    pattern: { 
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Insira um Email válido'
                                        }
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder="Email"
                                    name="email"
                                />
                                <div className='invalid-feedback d-block'>{errors.email?.message}</div>
                            </div>


                            <div className='margin-bottom-30'>
                                <label htmlFor="" style={{color:"black"}}>Password</label>
                                <input 
                                    {...register("password", {
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.password ? 'is-invalid' : ''}`}
                                    placeholder="Password"
                                    name="password"
                                />
                                <div className='invalid-feedback d-block'>{errors.password?.message}</div>

                            </div>
                        </div>

                        <div className='user-buttons-container'>
                            <button 
                                className='btn btn-outline-danger user-crud-buttons'
                                onClick={handleCancel}
                                >
                                CANCEL
                            </button>
                            <button className='btn btn-primary text-white user-crud-buttons'>REGISTER</button>
                        </div>
                    </div>
                </form>
            
            </div>
        </div>
    );
}

export default RegisterForm;