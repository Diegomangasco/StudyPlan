import { Col, Row, ButtonGroup, ToggleButton, Modal, Button, Form, Spinner } from 'react-bootstrap';
import API from '../API';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import CoursesTable from './CoursesTable';
import NewStudyPlan from './NewStudyPlan';

function StudyPlan(props){

    const navigate = useNavigate();

    const [firstTime, setFirstTime] = useState(false);
    const [loading, setLoading] = useState(true);
    const [localCourses, setLocalCourses] = useState([]);
    const [oldLocalCourses, setOldLocalCourses] = useState([]);
    const [courses, setCourses] = useState([]);
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({});
    const [cfu, setCfu] = useState(0);
    const [partTime, setPartTime] = useState([]);
    const [disabled, setDisabled] = useState([]);
    const [disabledLocal, setDisabledLocal] = useState([]);
    const [changes, setChanges] = useState(false);
    const [recharge, setRecharge] = useState(false);
    const [okSave, setOkSave] = useState(false);
    const [okDelete, setOkDelete] = useState(false);
    const [okPartTimeU, setOkPartTimeU] = useState(false);
    const [okPartTimeO, setOkPartTimeO] = useState(false);


    const buttons = [
        {name: "Save", value: 1},
        {name: "Restore", value: 2},
        {name: "Delete", value: 3}
    ];

    useEffect(() => {
        const getUser = async () => {
            const user = await API.getUserInfo();
            if(user.id !== undefined){
                setUser(user);
                if(user.part_time === null){
                    setLoading(false);
                    setFirstTime(true);
                    setShow(true);
                }
                else{
                    if(user.part_time === 1){
                        setPartTime([20, 40])
                    }
                    else{
                        setPartTime([60, 80])
                    }
                    setLoading(false);
                }
            }
        }
        getUser();
    }, [])

    useEffect(() => {
        const getCourses = async () => {
            setLoading(true);
            const list = await API.readStdCourses();
            const list2 = await API.readCourses();
            const array = [...list];
            const array2 = [...list2];
            setCourses(list2);
            setLocalCourses(list);
            setOldLocalCourses(array);
            let i = 0;
            let sum = 0;
            for(; i<list.length; i++){
                sum+=list[i].cfu;
            }
            setCfu(sum);
            let j = 0;
            let courseFeatures = [];
            for(i=0; i<list.length; i++){
                courseFeatures.push({code: list[i].code, feature: 0});
                for(j=0; j<list[i].incompatibilities.length; j++){
                    courseFeatures.push({code: list[i].incompatibilities[j], feature: 1});
                }
            }
            let prep = [];
            for(j=0; j<list2.length; j++){
                if(list2[j].preparatoryCourse !== undefined && list2[j].preparatoryCourse != null){
                    if(list.map(c => c.code).includes(list2[j].preparatoryCourse) === false){
                        prep.push({code: list2[j].code, feature: 2})
                    }
                }
            }
            let maxStd = [];
            for(j=0; j<list2.length; j++){
                if(list2[j].maxStudents != null){
                    if(list2[j].maxStudents === list2[j].enrolledStudents){
                        if(courseFeatures.map(c => c.code).includes(list2[j].code) === false && prep.map(c => c.code).includes(list2[j].code) === false)
                            maxStd.push({code: list2[j].code, feature: 3})
                    }
                }
            }
            setDisabled(courseFeatures.concat(prep.concat(maxStd)));

            let prepLocal = [];
            for(i=0; i<list.length; i++){
                if(list[i].preparatoryCourse !== undefined && list[i].preparatoryCourse != null){
                    prepLocal.push({code: list[i].preparatoryCourse});
                }
            }
            setDisabledLocal(prepLocal);
            setLoading(false);
        }
        getCourses();
    }, [recharge])

    useEffect(() => {
        const changeFE = () => {
            setLoading(true);
            let i = 0;
            let sum = 0;
            for(; i<localCourses.length; i++){
                sum+=localCourses[i].cfu;
            }
            setCfu(sum);
            let j = 0;
            let courseFeatures = [];
            for(i=0; i<localCourses.length; i++){
                courseFeatures.push({code: localCourses[i].code, feature: 0});
                for(j=0; j<localCourses[i].incompatibilities.length; j++){
                    courseFeatures.push({code: localCourses[i].incompatibilities[j], feature: 1});
                }
            }
            let prep = [];
            for(j=0; j<courses.length; j++){
                if(courses[j].preparatoryCourse !== undefined && courses[j].preparatoryCourse != null){
                    if(localCourses.map(c => c.code).includes(courses[j].preparatoryCourse) === false){
                        prep.push({code: courses[j].code, feature: 2})
                    }
                }
            }
            let maxStd = [];
            for(j=0; j<courses.length; j++){
                if(courses[j].maxStudents != null){
                    if(courses[j].maxStudents === courses[j].enrolledStudents){
                        maxStd.push({code: courses[j].code, feature: 3})
                    }
                }
            }
            setDisabled(courseFeatures.concat(prep.concat(maxStd)));
            let prepLocal = [];
            for(i=0; i<localCourses.length; i++){
                if(localCourses[i].preparatoryCourse !== undefined && localCourses[i].preparatoryCourse != null){
                    prepLocal.push({code: localCourses[i].preparatoryCourse});
                }
            }
            setDisabledLocal(prepLocal);
            setLoading(false);
        }
        changeFE();
    }, [changes]);

    return(
        <>
        <br/>
        <br/>
        <br/>
        <br/>
        <Row>
            <Col xs={3}>
                <div className="d-flex justify-content-start">
                    <h3>Current CFU: <div className="d-flex justify-content-center text-primary">{cfu}</div>
                    </h3>
                </div>
            </Col>
            <Col xs={3}>
                <div className="d-flex justify-content-start">
                    <h3>Minimum CFU: <div className="d-flex justify-content-center text-warning">{partTime[0]}</div>
                    </h3>
                </div>
            </Col>
            <Col xs={3}>
                <div className="d-flex justify-content-start">
                    <h3>Maximum CFU: <div className="d-flex justify-content-center text-danger">{partTime[1]}</div>
                    </h3>
                </div>
            </Col>
            <Col xs={3}>
                <div className="d-flex justify-content-center">
                <ButtonGroup size="lg" vertical>
                    <div className='btn-group-vertical gap-2'>
                        <ToggleButton
                        key={buttons[0].value}
                        id={`button-${buttons[0].value}`}
                        type="button"
                        variant='outline-primary'
                        name="button"
                        value={buttons[0].value}
                        onClick={async (e) => {
                            if(cfu < partTime[0]){
                                setOkPartTimeU(true);
                            }
                            else if(cfu > partTime[1]){
                                setOkPartTimeO(true);
                            }
                            else{
                                if(firstTime === false){
                                    await API.updateStdPlan(oldLocalCourses, localCourses);
                                    setOkSave(true);
                                }
                                else{
                                    await API.updateStdPlan([], localCourses);
                                    await API.createNewStdPlan(partTime[0] === 20 ? 1 : 0);
                                    setFirstTime(false);
                                    setOkSave(true);
                                }
                            }
                        }}
                        >
                            <div className="d-flex justify-content-center">{buttons[0].name}</div>
                        </ToggleButton>

                        <ToggleButton
                        key={buttons[1].value}
                        id={`button-${buttons[1].value}`}
                        type="button"
                        variant='outline-warning'
                        name="button"
                        value={buttons[1].value}
                        onClick={(e) => {
                            setRecharge((old) => !old);
                        }}
                        >
                            <div className="d-flex justify-content-center">{buttons[1].name}</div>
                        </ToggleButton>

                        <ToggleButton
                        key={buttons[2].value}
                        id={`button-${buttons[2].value}`}
                        type="button"
                        variant='outline-danger'
                        name="button"
                        value={buttons[2].value}
                        onClick={(e) => {
                            setOkDelete(true);
                        }}
                        >
                            <div className="d-flex justify-content-center">{buttons[2].name}</div>
                        </ToggleButton>
                    </div>
                </ButtonGroup>
                </div>
            </Col>
        </Row>
        <br/>
        <br/>
        {loading === true ? <><br/><br/><br/><div className='d-flex justify-content-center'><Spinner animation='border' size='xl' className='mr-2'/> </div></>
        :
        <>{
            show === true 
            ? <NewStudyPlan setLoggedIn={props.setLoggedIn} setMessage={props.setMessage} setTypeNav={props.setTypeNav} show={show} setShow={setShow} student={user} setPartTime={setPartTime} />
            : <CoursesTable local={true} courseSearch={'no'} courses={localCourses} tag={'delete'} setChanges={setChanges} disabled={disabledLocal} setLocalCourses={setLocalCourses}/>
        }
            <CoursesTable local={false} courseSearch={'no'} courses={courses} tag={'add'} disabled={disabled} setChanges={setChanges} setLocalCourses={setLocalCourses}/>
        </>
        }
            <Modal show={okSave} onHide={() => {setOkSave(false); setRecharge((old) => !old);}}>
                <Modal.Header closeButton>
                <Modal.Title><h3>Successfully updated</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                       Your study plan has been correctly updated
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={(e) => {setOkSave(false); setRecharge((old) => !old);}}>
                    Ok
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={okDelete} onHide={() => setOkDelete(false)}>
                <Modal.Header closeButton>
                <Modal.Title><h3>Delete the study plan</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        Your study plan will be deleted
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={async (e) => {
                    await API.deleteStdPlan(oldLocalCourses);
                    setRecharge((old) => !old);
                    setOkDelete(false); 
                    setShow(true);
                }}>
                    Ok
                </Button>
                <Button variant="primary" onClick={(e) => {setOkDelete(false);}}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={okPartTimeU} onHide={() => setOkPartTimeU(false)}>
                <Modal.Header closeButton>
                <Modal.Title><h3>Error in CFU number</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        Your credits number is not sufficient for your study plan part time option
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={(e) => setOkPartTimeU(false)}>
                    Ok
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={okPartTimeO} onHide={() => setOkPartTimeO(false)}>
                <Modal.Header closeButton>
                <Modal.Title><h3>Error in CFU number</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        Your credits number is too high for your study plan part time option
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={(e) => setOkPartTimeO(false)}>
                    Ok
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}
export default StudyPlan;
