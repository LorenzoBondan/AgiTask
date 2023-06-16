
import { FaSitemap } from 'react-icons/fa';
import { AiOutlineLaptop } from 'react-icons/ai';
import { FaWrench } from 'react-icons/fa';
import { FaUserFriends } from 'react-icons/fa';
import { FaBullhorn } from 'react-icons/fa';
import { FaChartBar } from 'react-icons/fa';
import { FaCode } from 'react-icons/fa';
import { FaMoneyBill } from 'react-icons/fa';

import './styles.css';

const Utilized = () => {

    return(
        <div className="utilized-container">
            <h3>Where AgiTask can be used</h3>
            <div className='row'>
                <div className="col-sm-12 col-lg-6 col-xl-3 utilized-column">
                    <div className='utilized-item'>
                        <p>Central Services</p>
                        <i><FaSitemap/></i>
                    </div> 
                </div>
                <div className="col-sm-12 col-lg-6 col-xl-3 utilized-column">
                    <div className='utilized-item'>
                        <p>IT</p>
                        <i><AiOutlineLaptop/></i>
                    </div> 
                </div>
                <div className="col-sm-12 col-lg-6 col-xl-3 utilized-column">
                    <div className='utilized-item'>
                        <p>Human Resources</p>
                        <i><FaUserFriends/></i>
                    </div> 
                </div>
                <div className="col-sm-12 col-lg-6 col-xl-3 utilized-column">
                    <div className='utilized-item'>
                        <p>Maintence</p>
                        <i><FaWrench/></i>
                    </div> 
                </div>
                <div className="col-sm-12 col-lg-6 col-xl-3 utilized-column">
                    <div className='utilized-item'>
                        <p>Marketing</p>
                        <i><FaBullhorn/></i>
                    </div> 
                </div>
                <div className="col-sm-12 col-lg-6 col-xl-3 utilized-column">
                    <div className='utilized-item'>
                        <p>Projects</p>
                        <i><FaChartBar/></i>
                    </div> 
                </div>
                <div className="col-sm-12 col-lg-6 col-xl-3 utilized-column">
                    <div className='utilized-item'>
                        <p>Development</p>
                        <i><FaCode/></i>
                    </div> 
                </div>
                <div className="col-sm-12 col-lg-6 col-xl-3 utilized-column">
                    <div className='utilized-item'>
                        <p>Finances</p>
                        <i className="item-logo"><FaMoneyBill/></i>
                    </div> 
                </div>
                
            </div>
        </div>
    );
}

export default Utilized;