import { useNavigate } from "react-router-dom";
import { Formik,ErrorMessage} from 'formik';
import { EmployeeFormInterface } from "../utils/interfaces";

const EmployeeForm = (props:EmployeeFormInterface) => {
  const navigate = useNavigate(); //hook for re-direct

    return (
    <>      
    <div className="emp-form">
      <h1>{props.mode==="create" ? "Add a New Employee":"Edit Employee"}</h1>

      <Formik
        initialValues={{
          name: props.employee.name|| "",
          phone: props.employee.phone|| "",
          email: props.employee.email|| "",
          address: props.employee.address|| "",
          date_of_birth: props.employee.date_of_birth|| "",
          role: props.employee.role|| "",
          dept: props.employee.dept|| "",
          gender: props.employee.gender|| "",
        }}
        validate={(values:any) => {
          const errors:any = {};
          if (!values.name) {
            errors.name = 'Required';
          } else if (values.name.length<2){  
            errors.name="Name must be at least 2 characters long.";  
          }
        
          if (!values.email) {
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }
        
          if (!values.phone) {
            errors.phone = 'Required';
          } else if (/^(\+88)?\d{10,11}$/.test(values.phone)===false){  
            errors.phone="Invalid phone number";  
          }
        
          if (!values.address) {
            errors.address = 'Required';
          } else if (values.address.length<4){  
            errors.address="Address must be at least 4 characters long.";  
          }
        
          if (!values.dept) {
            errors.dept = 'Required';
          } else if (values.dept.length<2){  
            errors.dept="Department must be least 2 characters long.";  
          }
        
          if (!values.role) {
            errors.role = 'Required';
          } else if (values.role.length<4){  
            errors.role="Position must be at least 4 characters long.";  
          }
        
          return errors;
        }}
        onSubmit={(values) => {
          props.handleSubmit(values);
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
          /* and other goodies {errors.email && touched.email && errors.email} */
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name: </label>
              <input 
                type="text" 
                name="name"
                required 
                onChange={handleChange}
                value={values.name}
              />
            </div>
            <ErrorMessage name="name" className="error" component="div" />

            <div>
              <label>Phone: </label>
              <input 
                type="tel" 
                name="phone"
                required 
                value={values.phone}
                onChange={handleChange}
              />
            </div>
            <ErrorMessage name="phone" className="error" component="div" />

            <div>
              <label>Email: </label>
              <input 
                type="email"
                name="email" 
                required 
                value={values.email}
                onChange={handleChange}
              />
            </div>
            <ErrorMessage name="email" className="error" component="div" />

            <div>
              <label>Address: </label>
              <textarea name="address"
                required 
                value={values.address}
                onChange={handleChange}>
              </textarea>
            </div>
            <ErrorMessage name="address" className="error" component="div" />
            <div>
              <label>Date of Birth: </label>
              <input 
                type="date"
                placeholder="dd-mm-yyyy"
                name="date_of_birth" 
                required 
                value={values.date_of_birth}
                onChange={handleChange}
              />
            </div>
            <ErrorMessage name="date_of_birth" className="error" component="div" />
            <div>
              <label>Position: </label>
              <input 
                type="text" 
                name="role"
                required 
                value={values.role}
                onChange={handleChange}
              />
            </div>
            <ErrorMessage name="role" className="error" component="div" />
            <div>
              <label>Department: </label>
              <input 
                type="text" 
                name="dept"
                required 
                value={values.dept}
                onChange={handleChange}
              />
            </div>
            <ErrorMessage name="dept" className="error" component="div" />

            <div>
              <label>Gender: </label>
              <select name="gender" value={values.gender} onChange={handleChange}>
                <option disabled value="">Choose your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select> 
            </div>
            <ErrorMessage name="gender" className="error" component="div" />

          <div className="mt-2">
          {props.mode==="edit" && <button className="btn btn--dark" type="button" onClick={()=>navigate(`/employee/${props.employee.id}/details`)}>Go Back</button>}
          <button type="submit" className="btn btn--success" disabled={isSubmitting}>Submit</button>
          </div>
        </form>
        )}
      </Formik>
      </div>
      </>
    );
}

export default EmployeeForm;