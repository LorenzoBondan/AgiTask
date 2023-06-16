import logo from 'assets/images/AT-logo-with-title.png'
import { NavLink } from 'react-router-dom';
import './styles.css';

const Banner = () => {
    return(
        <div className='home-content-container'>
            <div className='home-form-container'>
                <h1>Agile and efficient management for high-performance teams.</h1>
                <h3>The AgiTask combines all the tools that teams need to work with tranquility and efficiency in a single, user-friendly platform.</h3>
                <span className='separator'></span>
                <NavLink to="/auth">
                    <button className='btn btn-primary'>Sign in</button>
                </NavLink>
            </div>
            <div className='home-logo-container base-card'>
                <div className='fixer'></div>
                <img src={logo} alt="" />
            </div>
        </div>
    );
}

export default Banner;