import {Col, Row} from 'react-bootstrap';
import API from '../API';
import { useEffect, useState } from 'react';

function Addictional(props) {

    const [inc, setInc] = useState([]);
    const [prep, setPrep] = useState('');

    useEffect(() => {
        const getCourses = async () => {
            let prep = {};
            if(props.prep !== null){
                prep = await API.readCourse(props.prep);
                setPrep({code: prep.code, name: prep.name});
            }
            else{
                setPrep('No preparatory course');
            }
            if(props.inc !== null && props.inc.length !== 0){
                let i = 0;
                let incomp = {};
                let array = [];
                for(; i<props.inc.length; i++){
                    incomp = await API.readCourse(props.inc[i]);
                    array.push({code: incomp.code, name: incomp.name});
                }
                setInc(array);
            }
            else{
                setInc([false, 'No incompatibilities']);
            }
        }
        getCourses();
    }, []);

    return <>
        <Col xs={7}>
            <ul>
                <li>Incompatibilities: {inc[0] === false ? inc[1] : <List elements={inc}></List>}</li>
                <li>Preparatory course: {prep === 'No preparatory course' ? prep : <List elements={Array(prep)}></List>} </li>
            </ul>
        </Col>
    </>
}

function List (props){
    let list = [];
    props.elements.forEach((element) => {
        list.push(<li> {element.code + ' ' + element.name} </li>)
    });
    return <>
        <ul>
           {list}
        </ul>
    </>
}

export default Addictional;