import { Table, Row, Col } from 'react-bootstrap';
import CourseRow from "./CourseRow";

function CoursesTable(props) {

    let array = props.courses;
    
    if(props.courseSearch !== 'no' && props.courseSearch.length !== 0){
        array = array.filter((course) => props.courseSearch.includes(course));
    }
    
   
    return(<>
            {props.local === false ? <><br/><br/><br/><br/></> : <div/>}
            <Row>
            <Col xs={11}><div className="d-flex justify-content-center"><h2 class='text-success'>{props.local === false ? 'Available courses' : 'Your study plan'}</h2></div></Col>
            </Row>
            <br/>
            <Table striped={true} size="sm" borderless> 
            <thead>
                <Row>
                    <Col xs={1}>
                        <div className="d-flex justify-content-start">
                            <h4>Code</h4>
                        </div>
                    </Col>
                    <Col xs={2}>
                        <div className="d-flex justify-content-center">
                            <h4>Name</h4>
                        </div>
                    </Col>
                    <Col xs={1}>
                        <div className="d-flex justify-content-center">
                            <h4>CFU</h4>
                        </div>
                    </Col>
                    {
                        props.tag === 'normal' ?
                        <><Col xs={3}>
                            <div className="d-flex justify-content-center">
                                <h4>Enrolled students</h4>
                            </div>
                        </Col>
                        <Col xs={3}>
                            <div className="d-flex justify-content-center">
                                <h4>Maximum students</h4>
                            </div>
                        </Col></>
                        : <><Col xs={2}>
                            <div className="d-flex justify-content-center">
                                <h4>Attending</h4>
                            </div>
                        </Col>
                        <Col xs={2}>
                            <div className="d-flex justify-content-center">
                                <h4>Seats</h4>
                            </div>
                        </Col></>
                    }
                    
                </Row>
            </thead>
            <tbody>
                {   
                    array.map((cs) => 
                    <CourseRow course={cs} key={cs.code} tag={props.tag} disabled={props.disabled} setChanges={props.setChanges} setLocalCourses={props.setLocalCourses} />)
                }
            </tbody>
        </Table>
            </>
        );
}

export default CoursesTable;