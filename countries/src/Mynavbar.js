import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';


const Mynavbar = ({updateCountire}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchType = () => {
    if (document.getElementById('select-type').value === '1')
      return 'capital';
    else if (document.getElementById('select-type').value === '2')
      return 'language';
    else
      return 'name';
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">AllCountries</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          > 
                <NavDropdown title="Region" id="navbarScrollingDropdown">
                  <NavDropdown.Item onClick={() => updateCountire(0,0)}>All</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => updateCountire('region', 'africa')}>Africa</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => updateCountire('region', 'europe')}>Europe</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => updateCountire('region', 'asia')}>Asia</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => updateCountire('region', 'americas')}>Americas</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => updateCountire('region', 'oceania')}>Oceania</NavDropdown.Item>
                </NavDropdown>
                <Navbar.Brand href="#home">Search by</Navbar.Brand>
                <Form.Select id='select-type'>
                  <option value="0">Name</option>
                  <option value="1">Capital</option>
                  <option value="2">Language</option>
                </Form.Select>
          </Nav>
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Search"className="me-2" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
            <Button variant="outline-success" onClick={() => updateCountire(searchType(), searchTerm)}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default Mynavbar;