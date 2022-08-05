import {Navbar, Col, Button, Form, Modal, Spinner} from 'react-bootstrap';
import {useState} from 'react';
import API from '../API';
import { useNavigate } from "react-router-dom";


function NavigationBar(props){

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [okLogout, setOkLogout] = useState(false);

    return <>
        {loading === true 
        ? <><br/><br/><br/><div className='d-flex justify-content-center'><Spinner animation='border' size='xl' className='mr-2'/> </div></>
        : <>
            <Navbar
            className="navbar fixed-top navbar-expand-lg navbar-dark bg-warning">
            <Col xs={2}>
                <div className='d-flex justify-content-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-book-half" viewBox="0 0 16 16">
                        <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                    </svg>
                    <h4>Study Plan</h4>
                </div>
            </Col>
            <Col xs={2}></Col>
            <Col xs={4}>
                {props.typeNav === 0 ? 
                <Form className="d-flex justify-content-start">
                    <Form.Control 
                        id="searchForm" 
                        placeholder="Search an available course" 
                        variant='form-control me-2'
                        onChange={(e) => {
                            props.setCourseSearch(e.target.value);
                    }}/>
                </Form>
                : (props.typeNav === 1 ? <div/>
                : <div className='d-flex justify-content-center'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cpu" viewBox="0 0 16 16">
                    <path d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
                </svg>
                <h4>Computer Engineering</h4>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-laptop" viewBox="0 0 16 16">
                    <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z"/>
                </svg>
                </div>)
                }
            </Col>
            <Col xs={3}></Col>
            <Col xs={1}>
                {props.typeNav === 0 ? 
                <Button 
                variant="success"
                onClick={() => {props.setTypeNav(1); navigate('/login');}}>
                    Login
                </Button>
                : (
                    props.typeNav === 1 ?
                    <Button 
                    variant="info"
                    onClick={() => {props.setTypeNav(0); navigate('/');}}>
                        Go Back
                    </Button>
                    :
                    <Button 
                    variant="danger"
                    onClick={() => {
                        setOkLogout(true);
                    }}>
                        Logout
                    </Button>
                )
                }
            </Col>
            <br/>
            </Navbar>

            <Modal show={okLogout} onHide={() => setOkLogout(false)}>
                <Modal.Header closeButton>
                <Modal.Title><h3>Logout</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        Are you sure to logout from your personal study plan?<br/>All unsaved changes will be lost!
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={async (e) => {
                    setLoading(true);
                    await API.logOut();
                    setLoading(false);
                    props.setLoggedIn(false);
                    props.setMessage('');
                    props.setTypeNav(1); 
                    setOkLogout(false);
                    navigate('/login');
                }}>
                    Ok
                </Button>
                <Button variant="primary" onClick={(e) => {setOkLogout(false);}}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    }
    </>
}

export default NavigationBar;