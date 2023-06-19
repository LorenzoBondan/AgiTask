import { Group, User } from "types";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "util/requests";
import { useCallback, useEffect, useState } from "react";
import { getTokenData } from "util/auth";
import logo from 'assets/images/AT-logo-with-title.png';
import Select from "react-select";

const CreateGroup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Group>();
  const history = useHistory();

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

  const onSubmit = async (formData: Group) => {
    if (user) {
      formData.totalWorkTime = 0;
    
      if(!formData.users.includes(user)){
        formData.users.push(user);
      }

      try {
        const params: AxiosRequestConfig = {
          method: "POST",
          url: "/groups",
          data: formData,
          withCredentials: true,
        };

        await requestBackend(params);
        history.push("/profile");
      } catch (error) {
        console.log("Error: " + error);
      }
    }
  };

  const handleCancel = () => {
    history.push("/tasks");
  };

  const [selectFollowers, setSelectFollowers] = useState<User[]>();

  useEffect(() => {
    requestBackend({ url: "/users", withCredentials: true }).then(
      (response) => {
        setSelectFollowers(response.data.content);
      }
    );
  }, []);

  return (
    <div className="create-task-container">
      <h1>Create New Group</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="base-card post-card-form-card">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row post-crud-inputs-container">
              <div className="post-crud-inputs-left-container">
                <div className="margin-bottom-30">
                  <label htmlFor="">Name</label>
                  <input
                    {...register("name", {
                      required: "Campo obrigatório",
                    })}
                    type="text"
                    className={`form-control base-input ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    placeholder="Name"
                    name="name"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.name?.message}
                  </div>
                </div>
              </div>
              <div className="post-crud-inputs-left-container">
                <div className="margin-bottom-30">
                  <label htmlFor="">
                    Users
                  </label>
                  <Controller
                    name="users"
                    rules={{ required: false }}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={selectFollowers?.sort((a, b) =>
                          a.name > b.name ? 1 : -1
                        )}
                        classNamePrefix="followers-crud-select"
                        placeholder="Users"
                        isMulti
                        getOptionLabel={(c: User) => c.name}
                        getOptionValue={(c: User) => c.id.toString()}
                      />
                    )}
                  />
                  {errors.users && (
                    <div className="invalid-feedback d-block">
                      Campo obrigatório
                    </div>
                  )}
                </div>
              </div>
              <div className="post-crud-buttons-container">
                <button
                  className="btn btn-outline-secondary post-crud-buttons"
                  onClick={handleCancel}
                >
                  CANCEL
                </button>
                <button
                  className="btn btn-primary text-white post-crud-buttons"
                  onClick={handleSubmit(onSubmit)}
                >
                  SAVE
                </button>
              </div>
            </div>
          </form>
          <div className="new-task-image-container">
            <img src={logo} alt="" />
            <div className="new-task-status-container">
                <p className='update-task-status' 
                    style={{backgroundColor:"#F66565"}} 
                ></p>
                <p className='update-task-status' 
                    style={{backgroundColor:"#FECB33"}} 
                ></p>
                <p className='update-task-status' 
                    style={{backgroundColor:"#0DAA2A"}} 
                ></p>
            </div>
           </div>
        </div>
      </form>
    </div>
  );
};

export default CreateGroup;
