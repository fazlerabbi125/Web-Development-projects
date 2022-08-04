import logo from '../../assets/images/profile.jpg';
import styles from './EmployeeDetails.module.css';
import {useAxios} from '../../hooks/useAxios';
import {Link, useParams} from 'react-router-dom';
import { useState } from 'react';
import DeleteModal from '../../components/DeleteModal';
import Layout from '../../components/Layout';

const EmployeeDetails = () => {
    const {id}= useParams();
    const [modal,setModal]= useState(false);
    const { data:employee, error, isLoading}=useAxios(`${id}`)

    function toggleModal(){
        setModal(!modal);
    }
    
    return (
        <Layout>
        {isLoading && <h2 className="loading">Loading <i className="fa fa-spinner fa-spin"></i></h2>}
        {error && <h2 className="error">{error}</h2>}
        {!error && employee && <div className={`card ${styles['emp-detail']}`}>
            <div className={styles['emp-detail__options']}>
                <Link to={`/employee/${employee.id}/edit`} className="btn btn--dark rounded-circle pt-2 pb-2" state={{ employee }}><i className="fa fa-pencil"></i></Link>
                <button className="btn btn--danger rounded-circle pt-2 pb-2" onClick={toggleModal}>
                <i className="fa fa-trash"></i>
                </button>
            </div>
            {modal && <DeleteModal id={employee.id} toggleModal={toggleModal}/>}
            <header className={styles['emp-detail__header']}>
                <img src={logo} alt="Logo" className={styles['emp-detail__header__photo']}/>
                <h1>{employee.name} - {employee.id}</h1>
            </header>
            <div className={styles['emp-detail__body']}>
                <div className={styles['emp-detail__body__info']}>
                    <h2 className={styles['emp-detail__body__info__heading']}>Personal info</h2>
                    <table className={styles['emp-detail__body__info__table']}>
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
                </div>
                <div className={styles['emp-detail__body__info']}>
                    <h2 className={styles['emp-detail__body__info__heading']}>Professional info</h2>
                    <table className={styles['emp-detail__body__info__table']}>
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
        </div>
}
        </Layout>
    );
}

export default EmployeeDetails;