import {Row, OverlayTrigger, Tooltip, Button, Col, Collapse} from 'react-bootstrap';
import { useState } from 'react';
import Addictional from './Addictional';


function CourseRow(props){

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {props.map(c => c.code).includes(code) === true ? 
            (props.filter(c => c.code === code).map(c => c.feature).pop() === 0 ? 'Course already present' :
            (props.filter(c => c.code === code).map(c => c.feature).pop() === 1 ? 'Incompatible course' : 
            (props.filter(c => c.code === code).map(c => c.feature).pop() === 2 ? 'Need preparatory course' : 'Course full'))
            ) : 'Add course'}
        </Tooltip>
      );
    const renderTooltip2 = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {props.map(c => c.code).includes(code) === true 
            ? 'Is a preparatory course'
            : 'Delete course'}
        </Tooltip>
    );

    const renderTooltip3 = () => (
        <Tooltip id="button-tooltip" {...props}>
            Constraints
        </Tooltip>
    );

    const [button, setButton] = useState(false);
    const [open, setOpen] = useState(false);

    const code = props.course.code;
    const name = props.course.name;
    const cfu = props.course.cfu;
    const maxStd = props.course.maxStudents === null ? '-' : props.course.maxStudents;
    const enrStd = props.course.enrolledStudents;
    const incompatibilities = props.course.incompatibilities;
    const preparatory = props.course.preparatoryCourse;
    
    return <>
            { props.tag === 'normal' ?
                <Row>
                <th scope="row"></th>
                <Col xs={1}>{code}</Col>
                <Col xs={2}><div className='d-flex justify-content-start'>{name}</div></Col>
                <Col xs={1}><div className='d-flex justify-content-center'>{cfu}</div></Col>
                <Col xs={3}><div className='d-flex justify-content-center'>{enrStd}</div></Col>
                <Col xs={3}><div className='d-flex justify-content-center'>{maxStd}</div></Col>
                <Col xs={2}>
                    <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip3()}
                    >
                    <div>
                    <Button variant="secondary" 
                        onClick={() => {
                            setOpen(!open);
                            setButton(!button);
                            }  
                        }
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                    >
                        {
                            !button &&
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z"/>
                                <path fill-rule="evenodd" d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"/>
                            </svg>
                        }
                        {
                            button &&
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-up" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z"/>
                                <path fill-rule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"/>
                            </svg> 
                        }
                    </Button>
                    </div>
                    </OverlayTrigger>
                </Col>
                {
                    button &&
                    <Collapse in={open}>
                        <Addictional inc={incompatibilities} prep={preparatory}></Addictional>
                    </Collapse>
                }
                </Row>
                :
                <Row>
                    <th scope="row"></th>
                    <Col xs={1}>
                        {props.disabled.map(c => c.code).includes(code) === true 
                        ? <p class="text-danger">{code}</p>
                        : <p class="text-body">{code}</p>}
                    </Col>
                    <Col xs={2}><div className='d-flex justify-content-start'>
                        {props.disabled.map(c => c.code).includes(code) === true 
                        ? <p class="text-danger">{name}</p>
                        : <p class="text-body">{name}</p>}
                    </div></Col>
                    <Col xs={1}><div className='d-flex justify-content-center'>
                        {props.disabled.map(c => c.code).includes(code) === true 
                        ? <p class="text-danger">{cfu}</p>
                        : <p class="text-body">{cfu}</p>}
                    </div></Col>
                    <Col xs={2}><div className='d-flex justify-content-center'>
                        {props.disabled.map(c => c.code).includes(code) === true 
                        ? <p class="text-danger">{enrStd}</p>
                        : <p class="text-body">{enrStd}</p>}
                    </div></Col>
                    <Col xs={2}><div className='d-flex justify-content-center'>
                        {props.disabled.map(c => c.code).includes(code) === true 
                        ? <p class="text-danger">{maxStd}</p>
                        : <p class="text-body">{maxStd}</p>}    
                    </div></Col>
                    <Col xs={2}>
                        <OverlayTrigger
                        placement="left"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip3()}
                        >
                        <div>
                        <Button variant="secondary" 
                            onClick={() => {
                                setOpen(!open);
                                setButton(!button);
                            }  
                            }
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                        >
                            {
                                !button &&
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-down" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z"/>
                                    <path fill-rule="evenodd" d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"/>
                                </svg>
                            }
                            {
                                button &&
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-up" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z"/>
                                    <path fill-rule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                </svg> 
                            }
                        </Button>
                        </div>
                        </OverlayTrigger>
                    </Col>
                    <Col xs={2}>
                        {
                            props.tag === 'add'
                            ?
                            <OverlayTrigger
                            placement="left"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip(props.disabled)}
                            >
                                <div>
                                <Button variant='primary' 
                                disabled={props.disabled.map(c => c.code).includes(code) === true ? true : false}
                                onClick={async () => {
                                    props.setLocalCourses((oldValue) => {
                                        let newValue = oldValue;
                                        newValue.push(props.course);
                                        return newValue.sort((e1, e2) => e1.name.localeCompare(e2.name));
                                    })
                                    props.setChanges((old) => !old);
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                    </svg>
                                </Button>
                                </div>
                            </OverlayTrigger> 
                            : 
                            <OverlayTrigger
                            placement="left"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip2(props.disabled)}
                            >
                                <div>
                                <Button variant='danger' 
                                disabled={props.disabled.map(c => c.code).includes(code) === true ? true : false}
                                onClick={async () => {
                                    props.setLocalCourses((oldValue) => {
                                        let newValue = oldValue;
                                        newValue = newValue.filter((c) => c.code!==code);
                                        return newValue.sort((e1, e2) => e1.name.localeCompare(e2.name));
                                    })
                                    props.setChanges((old) => !old);
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                                </div>
                            </OverlayTrigger>
                        }
                    </Col>
                    {
                        button &&
                        <Collapse in={open}>
                            <Addictional inc={incompatibilities} prep={preparatory}></Addictional>
                        </Collapse>
                    }
                </Row>
            }
    </>
}

export default CourseRow;