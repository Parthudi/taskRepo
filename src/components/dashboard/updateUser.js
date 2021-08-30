import React, { useState, useContext  } from "react";
import { withRouter } from "react-router-dom";
import validator from "validator";
import "./userStyle.css";

function UpdateUser(props) {
  const [error, setError] = useState("");
  const [disablebutton, setDisableButton] = useState(true);
  const [focusfield, setfocusfield] = useState("");
  const [dataa, setDataa] = useState(props.user);
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

    const updateUser = (data) => {
        return(
            <form onSubmit={(e) => updateHandleOnSubmit(e,data)} autoComplete="off" className="updateform">

                <div className="form-group">
                    <label className="label"> First Name </label>
                    <input type="text" name="firstname" className="form-control" onFocus={() => setfocusfield("firstname")} onBlur={() => setfocusfield("")} placeholder="Enter First Name" defaultValue={data.first_name} onChange={(e) => handleOnChange(e)} />
                    <p style={{color:"red"}}>{focusfield==="firstname" && fname ? fname : ""}  </p>
                </div>

                <div className="form-group">
                    <label className="label"> Last Name </label>
                    <input type="text" name="lastname"  className="form-control" onFocus={() => setfocusfield("lastname")}  onBlur={() => setfocusfield("")} placeholder="Enter Last Name"  defaultValue={data.last_name} onChange={(e) => handleOnChange(e)} />
                    <p style={{color:"red"}}>{focusfield==="lastname" && lname ? lname : ""}  </p>
                </div>

                <div className="form-group">
                    <label className="label"> Email </label>
                    <input type="text" name="email" className="form-control" onFocus={() => setfocusfield("email")}  onBlur={() => setfocusfield("")} placeholder="Enter Email"  defaultValue={data.email} onChange={(e) => handleOnChange(e)} />
                    <p style={{color:"red"}}>{focusfield==="email" && e ? e : ""}  </p>
                </div>

                <div className="form-group">
                    <label className="label"> File URL </label>
                    <input type="text" name="file"   className="form-control" onFocus={() => setfocusfield("file")}  onBlur={() => setfocusfield("")} placeholder="Enter File URL"  defaultValue={data.avatar} onChange={(e) => handleOnChange(e)} />
                    <p style={{color:"red"}}>{focusfield==="file" && f ? f : ""}  </p>
                </div>  

                <button className="btn btn-lg btn-primary">
                    <strong> Update </strong>            
                </button>     
            </form>
        )
    }

    const updateHandleOnSubmit = async(e, data) => {
        e.preventDefault();
        try{
            console.log(data.id);
            const updateUser = await fetch(`https://reqres.in/api/users/${data.id}`,{
                   method: "PATCH",
                   body: JSON.stringify({email, firstname , lastname, file})
                 }).then(response => response.json());
                 console.log("response ding ding  : , " + JSON.stringify(updateUser));
                 if(updateUser && updateUser.updatedAt){
                     console.log("done");
                     window.location.reload();
                 }else{
                   setError("Something Went Wrong");
                   throw Error("Fill the Valid Details Only");
                 }
          }catch(error){
              setError(error.message);
          }
    }

    const showError = () => (
        <div  style={{ color: 'red', display: error ? "" : 'none' }}> {error} </div>
        )

  return (
    <div>
        {showError()}
        {updateUser(props.user)}
    </div>
  );
}

export default withRouter(UpdateUser);
