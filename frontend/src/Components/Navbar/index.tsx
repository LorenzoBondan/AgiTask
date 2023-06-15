import { NavLink } from 'react-router-dom';
import { getTokenData, hasAnyRoles, isAuthenticated } from 'util/auth';
import logo from 'assets/images/sn-logo.png'
import { AiOutlineHome } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { HiOutlineUsers } from 'react-icons/hi';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { RxInstagramLogo } from 'react-icons/rx';
import { CgFeed } from 'react-icons/cg';
import './styles.css';
import { useContext, useEffect } from 'react';
import { AuthContext } from 'AuthContext';
import { removeAuthData } from 'util/storage';
import history from 'util/history';


const Navbar = () => {

    const { authContextData, setAuthContextData } = useContext(AuthContext);

    useEffect(() => {
        if(isAuthenticated()){
          setAuthContextData({
            authenticated: true,
            tokenData: getTokenData()
          })
        }
        else{
          setAuthContextData({
            authenticated: false,
          })
        }
      }, [setAuthContextData]);

      const handleLogoutClick = (event : React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault(); 
        
        removeAuthData(); 
    
        setAuthContextData({
          authenticated: false,
        })
    
        history.replace('/'); 
    }

    return(
        <nav className='admin-nav-container'>
            <div className='navbar-title'>
                <img src={logo} alt="logo" />
                <h1 className='title'><div style={{color:"#E74A7D"}}>Social</div><div style={{color:"#7D5889"}}>Network</div></h1>
            </div>

            <ul className='ul-container'>
                {isAuthenticated() ? (
                <>
                <li>
                    <NavLink to="/feed" className='admin-nav-item'>
                        <CgFeed style={{color:"#7D5889", marginRight:"8px"}}/>
                        <p>Feed</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/create" className='admin-nav-item'>
                        <RxInstagramLogo style={{color:"#7D5889", marginRight:"8px"}}/>
                        <p>New Post</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile" className='admin-nav-item'>
                        <CgProfile style={{color:"#7D5889", marginRight:"8px"}}/>
                        <p>Profile</p>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/users" className='admin-nav-item'>
                        <HiOutlineUsers style={{color:"#7D5889", marginRight:"8px"}}/>
                        <p>Users</p>
                    </NavLink>
                </li>

                { hasAnyRoles(['ROLE_ADMIN']) && ( 
                    <li>
                        <NavLink to="/admin" className='admin-nav-item'>
                            <MdOutlineAdminPanelSettings style={{color:"#7D5889", marginRight:"8px"}}/>
                            <p>Admin</p>
                        </NavLink>
                    </li>   
                )}
                </>
                ) : (
                    <li>
                        <NavLink to="/home" exact className='admin-nav-item'>
                            <AiOutlineHome style={{color:"#7D5889", marginRight:"8px"}}/>
                            <p>Home</p>
                        </NavLink>
                    </li>   
                
                )}

                { authContextData.authenticated ? (
                    <li>
                        <NavLink to="/" className='login-nav-item' onClick={handleLogoutClick}>
                            <CgProfile style={{color:"#7D5889", marginRight:"8px"}}/>
                                <p>Logout</p>
                        </NavLink>
                    </li>
                    ) : (
                        <li>
                            <NavLink to="/auth/login" className='login-nav-item'>
                                <CgProfile style={{color:"#7D5889", marginRight:"8px"}}/>
                                <p>Login</p>
                            </NavLink>
                        </li>
                    )
                }

            </ul>
        </nav>
        

    );
}

export default Navbar;