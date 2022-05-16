import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeForm = (props) => {
  const navigate = useNavigate(); //hook for re-direct
  const [inputs, setInputs] = useState({
      name: props.employee.name|| "",
      phone: props.employee.phone|| "",
      email: props.employee.email|| "",
      address: props.employee.address|| "",
      date_of_birth: props.employee.date_of_birth|| "",
      role: props.employee.role|| "",
      dept: props.employee.dept|| "",
      gender: props.employee.gender|| "",
    });
  
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
    function submitForm(e){
      e.preventDefault();
      let error="";
      if (inputs.name.length<2) error+="Name must be at least 2 characters long.";  
      if(/^(\+88)?\d{10,11}$/.test(inputs.phone)==false){  
          if (!error)error+="Invalid phone number";
          else  error+="\nInvalid phone number";
      }
      if(inputs.address.length<4){  
          if (!error) error+="Address must be at least 4 characters long.";
          else  error+="\nAddress must be at least 4 characters long.";
      }
      if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputs.email)===false){ 
          if (!error) error+="Invalid email address";
          else  error+="\nInvalid email address";
      }
      if(inputs.dept.length<2){  
        if (!error) error+="Department must be least 2 characters long.";
        else  error+=error+"\nDepartment must be at least 2 characters long.";
      }
      if(inputs.role.length<4){  
        if (!error) error+="Position must be at least 4 characters long.";
        else  error+="\nPosition must be at least 4 characters long.";
        
      }
      if (error) {
        alert(error);
      } else {
        props.handleSubmit(inputs)
      }
    }
    return (  
    <div className="emp-form">
      <form onSubmit={submitForm}>
        <label>Name: </label>
        <input 
          type="text" 
          name="name"
          required 
          value={inputs.name}
          onChange={handleChange}
        /><br/>
        <label>Phone: </label>
        <input 
          type="tel" 
          name="phone"
          required 
          value={inputs.phone}
          onChange={handleChange}
        /><br/>
        <label>Email: </label>
        <input 
          type="email"
          name="email" 
          required 
          value={inputs.email}
          onChange={handleChange}
        /><br/>
        <label>Address: </label>
        <textarea name="address"
          required 
          value={inputs.address}
          onChange={handleChange} /><br/>
        <label>Date of Birth: </label>
        <input 
          type="date"
          placeholder="dd-mm-yyyy"
          name="date_of_birth" 
          required 
          value={inputs.date_of_birth}
          onChange={handleChange}
        /><br/>
        <label>Position: </label>
        <input 
          type="text" 
          name="role"
          required 
          value={inputs.role}
          onChange={handleChange}
        /><br/>
        <label>Department: </label>
        <input 
          type="text" 
          name="dept"
          required 
          value={inputs.dept}
          onChange={handleChange}
        /><br/>
        <label>Gender: </label>
        <select name="gender" value={inputs.gender} onChange={handleChange}>
          <option disabled value="">Choose your gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select><br/>
        <button onClick={()=>navigate(-1)}>Go Back</button>
        <button type="submit">Submit</button>
        
      </form>
      </div>
    );
}
 
export default EmployeeForm;