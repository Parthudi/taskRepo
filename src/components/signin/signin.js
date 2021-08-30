import React, {useState} from 'react'
import '../formStyle.css'

const Signup = (props) => {
    const [disablebutton, setDisableButton] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [values, setValues] = useState({
        emailPassword: "",
        usernamePassword: "",
    });
    
    const {usernamePassword , emailPassword} = values;

    const handleOnSubmit = async event => {
        event.preventDefault();
        const newEmailPassword = emailPassword.split("&");
        const newUserNamePassword = usernamePassword.split("&");
        if(newEmailPassword.includes("&") && newUserNamePassword.includes("&")){
            if(typeof window !== "undefined") {
                if(localStorage.getItem("userDetails")) {
                        const user = JSON.parse(localStorage.getItem("userDetails"));
                        setEmail(user.email);
                        setUsername(user.username);
                        setPassword(user.password);
                    } else{
                        setError("User Not Found");
                        return 
                    }
                }
    
                console.log(newEmailPassword[0].toLowerCase().trim() === email.toLowerCase().trim())
                console.log(newEmailPassword[1].toLowerCase().trim() === password.toLowerCase().trim()) 
                console.log(newUserNamePassword[0].toLowerCase().trim() === username.toLowerCase().trim())
                console.log(newUserNamePassword[1].toLowerCase().trim() === password.toLowerCase().trim());
    
            if(newEmailPassword[0].toLowerCase().trim() === email.toLowerCase().trim() && newEmailPassword[1].toLowerCase().trim() === password.toLowerCase().trim() && newUserNamePassword[0].toLowerCase().trim() === username.toLowerCase().trim() && newUserNamePassword[1].toLowerCase().trim() === password.toLowerCase().trim()){
                console.log("welcome bro matching");
                if(typeof window !== "undefined" && localStorage.getItem("userDetails")) {
                     props.history.push("/dashboard"); 
                  }else{
                    setError("Incorrect Details");
                    console.log(error);
                    return;
                  }
                }
            }
            else{
                setError("Incorrect Details, Please Differentiate Both Values With '&' Operator");
                console.log(error);
                return;
            }
        }

        const handleOnChange = (event) => {
            setValues({ ...values, [event.target.name] : event.target.value});
            validateUserForm();
        }
    
        const validateUserForm = () => {
            setDisableButton(false);
        
            if(!usernamePassword.includes("&") && !usernamePassword.includes("&")){
                setError("Input Field have 2 values to insert so please specify & between both.");
            }
           
            if(error.length == 0){
                setDisableButton(true);
            }
        }

        const loginForm = () => {
            return(
                <form className="Form">
                <h3 className="title">Log In</h3>
                {showError()}
               
                <div className="form-group">
                    <label className="label">Email & Password</label>
                    <input type="email" name="emailPassword" className="form-control" placeholder="Enter email & Password" value={emailPassword} onChange={(e) => handleOnChange(e)} />
                </div>

                <div className="form-group">
                    <label className="label">Username & Password</label>
                    <input type="text" name="usernamePassword" className="form-control" placeholder="Enter userName & Password " value={usernamePassword} onChange={(e) => handleOnChange(e)} />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label alignRemember" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" disabled={disablebutton} style={{cursor : disablebutton ? "not-allowed" : "pointer"}}  onClick={(e) => handleOnSubmit(e)} className="btn btn-info btn-lg btn-block">Sign in</button>
            </form>
            )
        }

        const showError = () => (
            <div className="errorMessage" style={{ color: 'red', display: error ? "" : 'none'}}> {error} </div>
            )

        return (
            <div>
                {loginForm()}
            </div>
        )       
}
export default Signup