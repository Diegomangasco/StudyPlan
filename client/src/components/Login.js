import { Col, Button, Row, Alert, Form, Spinner } from 'react-bootstrap';
import API from '../API';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login(props){

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (event) => {
        event.preventDefault();
        const credentials = { username, password };
        setUsername(username);
        setPassword(password);
        handleLogin(credentials);
    };
    
    const handleLogin = async (credentials) => {
        try {
            setLoading(true);
            const user = await API.logIn(credentials);
            setLoading(false);
            props.setLoggedIn(true);
            props.setMessage({msg: `Welcome, ${user.name}!`, type: 'success'});
            props.setTypeNav(2);
            navigate('/studyPlan');
        }catch(err) {
            console.log(err);
            props.setMessage({msg: err, type: 'danger'});
            setLoading(false);
        }
    };

    useEffect(() => {
        const logout = async () => {
            if(props.loggedIn === true){
                await API.logOut();
                props.setLoggedIn(false);
                props.setTypeNav(1);
            }
            else{
                props.setTypeNav(1);
            }
        }
        logout();
    })

    return <>
        {loading === true 
        ? <><br/><br/><br/><div className='d-flex justify-content-center'><Spinner animation='border' size='xl' className='mr-2'/> </div></>
        :
        <>
        <br/>
        <br/>
        <br/>
        <br/>
        <Row>
            <Col xs={5}></Col>
            <Col xs={6}><h2>Login</h2></Col>
        </Row>
        <br/>
        {
            props.message && 
            <>
                <Row>
                    <Col xs={3}></Col>
                    <Col xs={6}>
                        <Alert variant={props.message.type} onClose={() => props.setMessage('')} dismissible>{props.message.msg}</Alert>
                    </Col>
                    <Col xs={3}></Col>
                </Row>
            </>
        }
        {
            !props.message &&
            <Col xs={11} className='d-flex justify-content-center'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId='username'>
                        <Form.Label>email</Form.Label>
                        <Form.Control type='email' value={username} placeholder='Enter the email' onChange={ev => setUsername(ev.target.value)} required={true} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' value={password} placeholder ='Insert the password' onChange={ev => setPassword(ev.target.value)} required={true} />
                    </Form.Group>
                    <br/>
                    <Row>
                        <Col xs={4}></Col>
                        <Col>
                            <Button type="submit">Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        }
        </>
    }
    </>
}
export default Login;