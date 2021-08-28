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
        const newEmailPassword = emailPassword.trim().split("&");
        const newUserNamePassword = usernamePassword.trim().split("&");
    
        if(typeof window !== "undefined") {
            if(localStorage.getItem("userDetails")) {
                    const user = JSON.parse(localStorage.getItem("userDetails"));
                    setEmail(user.email.trim());
                    setUsername(user.username.trim());
                    setPassword(user.password.trim());
                } else{
                    setError("User Not Found");
                    return 
                }
            }

        if(newEmailPassword[0].trim() === email.trim() && newEmailPassword[1].trim() === password.trim() && newUserNamePassword[0].trim() === username.trim() && newUserNamePassword[1].trim() === password.trim()){
            console.log("welcome bro matching");
            if(typeof window !== "undefined" && localStorage.getItem("userDetails")) {
                 props.history.push("/dashboard"); 
              }else{
                setError("Incorrect Details");
                return;
              }
            }else{
                setError("Incorrect Details");
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

        const showError = () => (
            <div  style={{ color: 'red', display: error ? "" : 'none' }}> {error} </div>
            )

        return (
            <form className="Form">
                <h3 className="title">Log In</h3>
               
                {showError}
               
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
export default Signup