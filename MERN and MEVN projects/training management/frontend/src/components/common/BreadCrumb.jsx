import React from 'react'
import {useNavigate,Link} from 'react-router-dom';
function BreadCrumb(props) {
    const navigate= useNavigate();
    return (
        <nav aria-label="breadcrumb" className="w-75 mx-auto mb-3">
            <ol className="breadcrumb">
                <li className="breadcrumb-item ">
                    {props.to?(
                    <Link to={props.to} className="link-primary text-decoration-none">{props.prev}</Link>):(
                    <span role="button" onClick={()=>navigate(-1)} className="link-primary text-decoration-none">{props.prev}</span>
                    )}
                </li>
                <li className="breadcrumb-item active" aria-current="page">{props.current}</li>
            </ol>
        </nav>
    )
}

export default BreadCrumb