import { useForm } from 'react-hook-form';
import {ReactComponent as SearchIcon} from 'assets/images/search-icon.svg';
import './styles.css';

export type UserFilterData = {
    name : string;
}

type Props = {
    onSubmitFilter : (data: UserFilterData) => void;
}

const UserFilter = ( {onSubmitFilter} : Props ) => {

    const { register, handleSubmit, setValue } = useForm<UserFilterData>();

    const onSubmit = (formData : UserFilterData) => {
        onSubmitFilter(formData);
    };

    const handleFormClear = () => {
        setValue('name', '');
    }

    return(
        <div className="base-card user-filter-container">
            <form onSubmit={handleSubmit(onSubmit)} className='user-filter-form'>
                <div className='user-filter-name-container'>
                    <input 
                        {...register("name")}
                        type="text"
                        className={`form-control text-dark`}
                        placeholder="User's name"
                        name="name"
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

export default UserFilter;