import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {AiFillHome , AiOutlineHeart} from 'react-icons/ai';
import {TbBrandMessenger} from 'react-icons/tb';
import {CgAddR} from 'react-icons/cg';
import {ImCompass2} from 'react-icons/im';
import classes from './header.module.css'
import { useContext, useEffect } from 'react';
import { AccontContext } from '../../components/AccountContext';
import SearchBox from '../../components/Forms/SearchBox';

function Header(props) {
  const navigate = useNavigate();

  const logoutHandler= () => {
    localStorage.clear();
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    navigate('/')
  }

  return (
    <>
      {['sm'].map((expand) => (
        <Navbar key={expand} bg="light"  expand={expand} className="mb-3 border border-bottom">
          <Container>
          <Link to="/home"><Navbar.Brand ><img src='/images/logo.png' alt="logo"/></Navbar.Brand></Link>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    InstaGAAM
                    </Offcanvas.Title>
                
              </Offcanvas.Header>
              <Offcanvas.Body>
                <SearchBox />
                <Nav className="pe-3">
                  <Link to='/home' className='nav-link'><AiFillHome /></Link>
                  <Link to='/home' className='nav-link'><TbBrandMessenger /></Link>
                  <Link to='/upload' className='nav-link'><CgAddR /></Link>
                  <Link to='/home' className='nav-link'><ImCompass2 /></Link>
                  <Link to='/home' className='nav-link'><AiOutlineHeart /></Link>                  
                  <NavDropdown
                    title={
                      <div className={ classes.dp_area +' rounded-circle overflow-hidden'}> 
                        <img src={(props.userData?.dp_path !== undefined && props.userData?.dp_path !== null) ? props.userData?.dp_path : '/images/profilepic.jpg'} alt='ProfilePic' className='w-100'/>
                      </div>
                    }
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <Link className='dropdown-item' to={'/profile/'+ props.userData?.user_id}>Profile</Link>
                    <NavDropdown.Divider />
                    <NavDropdown.Item  onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;