import {Nav, Navbar, NavLink, NavItem, Container} from 'react-bootstrap';
import giraffe from '../assets/giraffe.svg';

const NavigationBar = () => {
    return (
        
        <Navbar expand='sm' className='navbar-custom'>
            <Container>
                <Navbar.Brand href="/">
                    <img id='logo' src={giraffe} width='60' height='60'/>
                    Giraffe Editor
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
                    <Nav>
                        <NavLink href="/">About</NavLink>
                        <NavLink href="/gif-converter">Gif Converter</NavLink>
                        <NavLink href="/">Contact</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        
    );
}

export default NavigationBar;

/*<div>
            <MDBNavbar  style={{display:"flex", flexDirection:"row"}}>
                <MDBContainer fluid>
                <MDBNavbarItem>
                    <MDBNavbarLink href="/">About</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                    <MDBNavbarLink href="/upload">Gif Editor</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                    <MDBNavbarLink href="/">Help</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                    <MDBNavbarLink href="/">Contact</MDBNavbarLink>
                </MDBNavbarItem>
                </MDBContainer>
            </MDBNavbar>
        </div>
    */