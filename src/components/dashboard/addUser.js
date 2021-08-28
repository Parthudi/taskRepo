import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import validator from "validator";

function AddUser(props) {

  const [error, setError] = useState("");
  const [disablebutton, setDisableButton] = useState(true);
  const [focusfield, setfocusfield] = useState("");
  const [errorvalues, setErrorValues] = useState({
    fname: "",
    lname: "",
    e: "",
})
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    file: ""
})

const {fname, lname, e, f} = errorvalues;
const {firstname, lastname, email, file} = values;

const handleOnChange = async(event) => {
    const name = event.target.name;
    setValues({ ...values, [name] : event.target.value});
    validateUserForm();
}

const validateUserForm = () => {
    if(focusfield==="firstname" && firstname.length < 3){
        setErrorValues({fname: "Firstname Should Contain Atleast 3 characters"});
        return;
    }else{
        setErrorValues({fname: ""});
    }
    if(focusfield==="lastname" && lastname.length < 3){
        setErrorValues({lname: "LastName Should Contain Atleast 3 characters"});
        return;
    }
    if(focusfield==="email" && email && email != null && email !== "" && !validator.isEmail(email)){
        setErrorValues({e: "Email Invalid"});
        return;
    }

    if(error.length == 0){
        setDisableButton(false);
    }
}

    const handleOnSubmit = async(event) => {
        event.prevenDefault();
        try{
          const addUser = await fetch(`https://reqres.in/api/users`,{
                 method: "POST",
                 body: JSON.stringify({email, firstname , lastname, file})
               }).then(response => response.json());
        
               if(error) {
                 setError("Something Went Wrong");
                 throw Error("Fill the Valid Details Only");
               }
       }catch(error){
         console.log("JSON.setr : " +JSON.stringify(error));
          setError(error.message);
         }
     }

    const addUserForm = () => {
        return(
            <form className="Form" autoComplete="off">
                <h3 className="title"> Add User </h3>

                <div className="form-group">
                    <label className="label"> First Name </label>
                    <input type="text" name="firstname" className="form-control" onFocus={() => setfocusfield("firstname")} onBlur={() => setfocusfield("")} placeholder="Enter First Name" value={firstname} onChange={(e) => handleOnChange(e)} />
                    <p style={{color:"red"}}>{focusfield==="firstname" && fname ? fname : ""}  </p>
                </div>

                <div className="form-group">
                    <label className="label"> Last Name </label>
                    <input type="text" name="lastname"  className="form-control" onFocus={() => setfocusfield("lastname")}  onBlur={() => setfocusfield("")} placeholder="Enter Last Name"  value={lastname} onChange={(e) => handleOnChange(e)} />
                    <p style={{color:"red"}}>{focusfield==="lastname" && lname ? lname : ""}  </p>
                </div>

                <div className="form-group">
                    <label className="label"> Email </label>
                    <input type="text" name="email" className="form-control" onFocus={() => setfocusfield("email")}  onBlur={() => setfocusfield("")} placeholder="Enter Email"  value={email} onChange={(e) => handleOnChange(e)} />
                    <p style={{color:"red"}}>{focusfield==="email" && e ? e : ""}  </p>
                </div>

                <div className="form-group">
                    <label className="label"> File URL </label>
                    <input type="text" name="file"   className="form-control" onFocus={() => setfocusfield("file")}  onBlur={() => setfocusfield("")} placeholder="Enter File URL"  value={file} onChange={(e) => handleOnChange(e)} />
                    <p style={{color:"red"}}>{focusfield==="file" && f ? f : ""}  </p>
                </div>

                <button type="submit"  className="btn btn-info btn-lg btn-block" onClick={(e) => handleOnSubmit(e)}> Add User </button>
            </form>
            )
        }

        const showError = () => (
            <div  style={{ color: 'red', display: error ? "" : 'none' }}> {error} </div>
            )

  return (
    <React.Fragment>
        {showError()}
        {addUserForm()}
    </React.Fragment>
  );
}

export default withRouter(AddUser);
