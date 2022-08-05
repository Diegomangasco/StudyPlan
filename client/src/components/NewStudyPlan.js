import {Form, Modal, Button, Spinner} from 'react-bootstrap';
import {useState} from 'react';
import API from '../API';
import { useNavigate } from "react-router-dom";

function NewStudyPlan(props){

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showErrorForm, setShowErrorForm] = useState(false);
    const handleCloseErrorForm = () => {setShowErrorForm(false)};
    const handleShowErrorForm = () => setShowErrorForm(true);
    const [partTime, setPartTime] = useState(-1);

    const stdId = props.student.id;
    const name = props.student.name;
    const surname = props.student.surname;
    const username = props.student.username;

    return <>
            {
            loading === true ?
            <><br/><br/><br/><div className='d-flex justify-content-center'><Spinner animation='border' size='xl' className='mr-2'/> </div></>
            :
            <><Modal show={props.show} onHide={async () => {
                setLoading(true);
                await API.logOut();
                setLoading(false);
                props.setLoggedIn(false);
                props.setMessage('');
                props.setTypeNav(1); 
                props.setShow(false); 
                navigate('/login');
            }}>
                <Modal.Header closeButton>
                <Modal.Title>Create a new Study Plan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>StudentId: {stdId}</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Name: {name}</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Surname: {surname}</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>email: {username}</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label>Rating</Form.Label>
                        <Form.Select id="ptSelector" defaultValue={partTime}
                            onChange={(e) => {
                                setPartTime(parseInt(e.target.value));
                            }}>
                                <option>Select an option</option>
                                <option value="0">Full Time</option>
                                <option value="1">Part Time</option>
                        </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={async (e) => {
                    setLoading(true);
                    await API.logOut();
                    setLoading(false);
                    props.setLoggedIn(false);
                    props.setMessage('');
                    props.setTypeNav(1); 
                    props.setShow(false); 
                    navigate('/login');
                }}>
                    Close
                </Button>
                <Button variant="primary" onClick={(e) => { 
                    if(partTime === -1){
                        handleShowErrorForm();
                    }
                    else{
                        if(partTime === 1){
                            props.setPartTime([20, 40])
                        }
                        else{
                            props.setPartTime([60, 80])
                        }
                        props.setShow(false);
                    }
                }}>
                    Save Changes
                </Button>
                </Modal.Footer>
                </Modal>
                <Modal show={showErrorForm} onHide={handleCloseErrorForm}>
                <Modal.Header closeButton>
                    <Modal.Title ><h2>You miss the Part Time option!</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>Please insert if you want a Study Plan in Part Time or Full Time mode</Modal.Body>
                <Modal.Footer><Button variant='primary' onClick={(e) => {
                    handleCloseErrorForm();
                }}>Ok</Button></Modal.Footer>
            </Modal></>
            }
        </>
}
export default NewStudyPlan;
