import logo from '../profile.jpg';
import styles from './Employee.module.css';
import axInstance from '../useAxios';
import {Link, useLocation} from 'react-router-dom';
import { useState,useEffect } from 'react';
import Delete from '../components/Delete';

const Employee = () => {
    const {state:{id}} = useLocation();
    const [modal,setModal]= useState(false);
    const [employee,setEmployee] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axInstance.get(`${id}`)
        .then(function (response) {
            setEmployee(response.data);
            setError(null);
        })
        .catch((err) => {
            setError(err.message);
            setEmployee(null);
        });
      }, []);

    function toggleModal(){
        setModal(!modal);
    }
    
    return (
        <>
        <p className={styles.back}><Link to="/"><i className="fa fa-arrow-left"></i> Back to Home</Link></p>
        {error && <h2 style={{color:"red",textAlign:"center" }}>{error}</h2>}
        {employee && <div className={styles.detail}>
            <div className={styles.options}>
                <Link to={`edit`} className="btn-dark" state={{ employee }}><i className="fa fa-pencil"></i></Link>

                <button className="btn-danger" onClick={toggleModal}>
                <i className="fa fa-trash"></i>
                </button>
            </div>
            {modal && <Delete id={employee.id} toggleModal={toggleModal}/>}
            <header className={styles.card_header}>
                <img src={logo} alt="Logo" className={styles.profile} style={{margin:"0.3rem 0.4rem 0"}}/>
                <h1>{employee.name} - {employee.id}</h1>
            </header>
            <hr/>
            <div className={styles.info}>
            <table>
            <thead>
            <h2>Personal info</h2>
            </thead>
            <tbody>
            <tr>
                <td>Phone</td>
                <td>{employee.phone}</td>
            </tr>
            <tr>
                <td>Email</td>
                <td>{employee.email}</td>
            </tr>
            <tr>
                <td>Address</td>
                <td>{employee.address}</td>
            </tr>
            <tr>
                <td>Gender</td>
                <td>{employee.gender}</td>
            </tr>
            <tr>
                <td>Date of Birth</td>
                <td>{employee.date_of_birth}</td>
            </tr>
            </tbody>
            </table>
            <table>
            <thead>
            <h2>Professional info</h2>
            </thead>
            <tbody>
            <tr>
                <td>Department</td>
                <td>{employee.dept}</td>
            </tr>
            <tr>
                <td>Position</td>
                <td>{employee.role}</td>
            </tr>
            </tbody>
            </table>  
            </div>
        </div>
}
        </>
    );
}
 
export default Employee;