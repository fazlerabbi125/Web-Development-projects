import logo from '../../assets/images/profile.jpg';
import styles from './Employee.module.css';
import {useAxios} from '../../hooks/useAxios';
import {Link, useParams} from 'react-router-dom';
import { useState } from 'react';
import Delete from '../../components/Delete';

const Employee = () => {
    const {id} = useParams();
    const [modal,setModal]= useState(false);
    const { data:employee, error, isLoading}=useAxios(`${id}`)

    function toggleModal(){
        setModal(!modal);
    }
    
    return (
        <>
        <p className={styles.back}><Link to="/"><i className="fa fa-arrow-left"></i> Back to Home</Link></p>
        {isLoading && <h2 className="loading">Loading <i className="fa fa-spinner fa-spin"></i></h2>}
        {error && <h2 className="error">{error}</h2>}
        {!error && employee && <div className={styles.detail}>
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