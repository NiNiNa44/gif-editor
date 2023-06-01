import {Nav, Navbar, NavLink, NavItem, Container} from 'react-bootstrap';
import giraffe from '../assets/giraffe.svg';

const NavigationBar = () => {
    return (
        
        <Navbar expand='sm' bg="light">
            <Container>
                <Navbar.Brand href="/">
                    <img id='logo' src={giraffe}/>
                    Giraffe Editor
                </Navbar.Brand>
                <Nav className="justify-content-end">
                <NavItem>
                    <NavLink href="/">About</NavLink>
                </NavItem>
                    <NavLink href="/upload">Gif Editor</NavLink>
                    <NavLink href="/">Help</NavLink>
                    <NavLink href="/">Contact</NavLink>
                </Nav>
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