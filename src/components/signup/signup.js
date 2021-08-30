import React,{useState} from 'react';
import validator from "validator";
import '../formStyle.css';

const SignUp = (props) => {

        const [disablebutton, setDisableButton] = useState(true);
        const [error, setError] = useState("");
        const [focusfield, setfocusfield] = useState("");
        const [errorvalues, setErrorValues] = useState({
            fname: "",
            lname: "",
            uname: "",
            e: "",
            p: "",
            cp: ""
        })
        const [values, setValues] = useState({
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            password: "",
            confirmpassword: ""
        })

        const {fname, lname, uname , e, p, cp} = errorvalues;
        const {firstname, lastname, username , email, password, confirmpassword} = values;

      const handleOnSubmit = (event) => {
            event.preventDefault()
            
            if(password === confirmpassword){
                if(typeof window !== "undefined") {
                    localStorage.setItem('userDetails', JSON.stringify(values))
                  }
                if(localStorage.getItem("userDetails")) {
                    props.history.push('/login'); 
                }else{
                      setError("Something Went Wrong Please Try Again After SomeTimes");
                  } 
            }else{
                setErrorValues({cp: "Password And Confirm Password Didnt Match"});
            }
     
      }

    const handleOnChange = async(event) => {
        const name = event.target.name;
        setValues({ ...values, [name] : event.target.value});
        validateUserForm();
    }
    
    const validateUserForm = () => {
        const regularExpression  = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
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
        if(focusfield==="username" && username.length < 3){
            setErrorValues({uname: "UserName Should Contain Atleast 3 characters"});
            return;
        }
        if(focusfield==="email" && email && email != null && email !== "" && !validator.isEmail(email)){
            setErrorValues({e: "Email Invalid"});
            return;
        }

        if(focusfield==="password" && password.length < 6  && !regularExpression.test(password)) {
            setErrorValues({p: "Weak Password"});
            return;
        }
        // if(focusfield==="confirmpassword" && password !== confirmpassword){
        //     setErrorValues({cp: "Password And Confirm Password Didnt Match"});
        //     return;
        // }
        if(error.length == 0){
            setDisableButton(false);
        }
    }

    const signUpForm = () => {
        return(
            <form className="Form" autoComplete="off">
                <h3 className="title"> Sign Up </h3>

                <div className="form-group">
                    <label className="label"> First Name </label>
                    <input type="text" name="firstname" onFocus={() => setfocusfield("firstname")} onBlur={() => setfocusfield("")} className="form-control" placeholder="Enter First Name" value={firstname} onChange={(e) => handleOnChange(e)} />
                    <p style={{color:"red"}}>{focusfield==="firstname" && fname ? fname : ""}  </p>
                </div>

                <div className="form-group">
                    <label className="label"> Last Name </label>
                    <input type="text" name="lastname" onFocus={() => setfocusfield("lastname")}  onBlur={() => setfocusfield("")}  className="form-control" placeholder="Enter Last Name"  value={lastname} onChange={(e) => handleOnChange(e)} />
                    <p style={{color:"red"}}>{focusfield==="lastname" && lname ? lname : ""}  </p>
                </div>

                <div className="form-group">
                    <label className="label"> User Name </label>
                    <input type="text" name="username" onFocus={() => setfocusfield("username")}  onBlur={() => setfocusfield("")}  className="form-control" placeholder="Enter User Name"  value={username} onChange={(e) => handleOnChange(e)} />
                    <p style={{color:"red"}}>{focusfield==="username" && uname ? uname : ""}  </p>
                </div>

                <div className="form-group">
                    <label className="label"> Email </label>
                    <input type="text" name="email"  onFocus={() => setfocusfield("email")}  onBlur={() => setfocusfield("")}  className="form-control" placeholder="Enter Email"  value={email} onChange={(e) => handleOnChange(e)} />
                    <p style={{color:"red"}}>{focusfield==="email" && e ? e : ""}  </p>
                </div>

                <div className="form-group">
                    <label className="label"> Password </label>
                    <input type="password" name="password"  onFocus={() => setfocusfield("password")}  onBlur={() => setfocusfield("")}  className="form-control" placeholder="Enter Password"  value={password} onChange={(e) => handleOnChange(e)} />
                    <p style={{color:"red"}}>{focusfield==="password" && p ? p : ""}  </p>
                </div>

                <div className="form-group">
                    <label className="label"> Confirm Password </label>
                    <input type="password" name="confirmpassword" onFocus={() => setfocusfield("confirmpassword")} onBlur={() => setfocusfield("")}  className="form-control" placeholder="Enter email & Password"  value={confirmpassword} onChange={(e) => handleOnChange(e)} />
                    <p style={{color:"red"}}>{focusfield==="confirmpassword" && cp ? cp : ""}  </p>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1"  value={firstname} onChange={(e) => handleOnChange(e)} />
                        <label className="custom-control-label alignRemember" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit"  disabled={disablebutton} style={{cursor : disablebutton ? "not-allowed" : "pointer"}} className="btn btn-info btn-lg btn-block" onClick={(e) => handleOnSubmit(e)}> Sign in </button>
            </form>
            )
        }

 

    return(
        <div>
            {signUpForm()}
        </div>
    )
}

export default SignUp