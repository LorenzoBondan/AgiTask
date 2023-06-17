
import { useForm } from 'react-hook-form';
import {ReactComponent as SearchIcon} from 'assets/images/search-icon.svg';

export type TaskFilterData = {
    title : string;
}

type Props = {
    onSubmitFilter : (data: TaskFilterData) => void;
}

const TaskFilter = ( {onSubmitFilter} : Props ) => {

    const { register, handleSubmit, setValue } = useForm<TaskFilterData>();

    const onSubmit = (formData : TaskFilterData) => {
        onSubmitFilter(formData);
    };

    const handleFormClear = () => {
        setValue('title', '');
    }

    return(
        <div className="base-card user-filter-container">
            <form onSubmit={handleSubmit(onSubmit)} className='user-filter-form'>
                <div className='user-filter-name-container'>
                    <input 
                        {...register("title")}
                        type="text"
                        className={`form-control text-dark`}
                        placeholder="Task Title"
                        name="title"
                    />
                    <button className='user-filter-button-search-icon'>
                        <SearchIcon/>
                    </button>
                </div>

                <div className='user-filter-bottom-container'>
                    <button onClick={handleFormClear} className='btn btn-outline-secondary btn-user-filter-clear'>
                        CLEAR <span className='btn-user-filter-word'>FILTER</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TaskFilter;