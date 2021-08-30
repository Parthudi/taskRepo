import React, {Fragment, useEffect, useState} from 'react'
import Layout from '../layout/layout'
import MUIDataTable from "mui-datatables";
import {Grid, Fab} from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import validator from "validator";
import  Edit  from "@material-ui/icons/Edit";
import UpdateUser from "./updateUser";

const Dashboard = (props) => {

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [disablebutton, setDisableButton] = useState(true);
    const [dataa, setDataa] = useState([]);
    const [focusfield, setfocusfield] = useState("");
    const [edituser, setEditUser] = useState({});
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
  const [addusermodel, setAddUserModel] = useState(false);

//   const {_id, first_name, last_name, _email} = edituser;
  const {fname, lname, e, f} = errorvalues;
  const {firstname, lastname, email, file} = values;

    const user = JSON.parse(localStorage.getItem("userDetails"));

    const usersData = () => {
        setIsLoading(true);
         fetch(`https://reqres.in/api/users?page=2`,{
            method: "GET"
          }).then(res => res.json()).then(resp => (setDataa(resp.data)));
        setIsLoading(false);
      }

    useEffect(() => {
        usersData();
    } , []);

    const handleOnChange = async(event) => {
        const name = event.target.name;
        setValues({ ...values, [name] : event.target.value});
        validateUserForm();
    }

    const validateUserForm = () => {
        setDisableButton(true);
        if(focusfield==="firstname" && firstname.length < 3){
            setErrorValues({fname: "Firstname Should Contain Atleast 3 characters"});
            return;
        }else{
            setErrorValues({fname: ""});
        }
        if(focusfield==="lastname" && lastname.length < 3){
            setErrorValues({lname: "LastName Should Contain Atleast 3 characters"});
            return;
        }else{
            setErrorValues({lname: ""});
        }
        if(focusfield==="email" && email && email != null && email !== "" && !validator.isEmail(email)){
            setErrorValues({e: "Email Invalid"});
            return;
        }else{
            setErrorValues({e: ""});
        }
        if(focusfield==="" && file.length == 0){
            setErrorValues({f: "Please Enter file URL"});
            return;
        }else{
            setErrorValues({f: ""});
        }
        if(error.length == 0 && firstname.length !== 0 && lastname.length !== 0 && email.length !== 0 && file.length !== 0){
            setDisableButton(false);
        }else{
            setDisableButton(true);
        }
    }
    
    const handleOnSubmit = async(e) => {
        e.preventDefault();
        try{
            const addUser = await fetch(`https://reqres.in/api/users`,{
                    method: "POST",
                    body: JSON.stringify({email, firstname , lastname, file})
                }).then(response => response.json());
        
                if(addUser && addUser.id){
                    console.log("done");
                    setAddUserModel(false);
                }else{
                    setError("Something Went Wrong");
                    throw Error("Fill the Valid Details Only");
                }
            }catch(error){
                setError(error.message);
            }
        }

        const userProfile = () => {
            return (
                <div className="card mb-5">
                <h3 className="card-header"> User Informaton</h3>
                <ul className="list-group">
                    <li className="list-group-item"> Name:  <b> {user.username} </b> </li>
                </ul>
            </div>
            )}

        // const updateUser = (i) => {
        //     setEditUser({_id: dataa[i].id, first_name: dataa[i].first_name, last_name: dataa[i].last_name, email_: dataa[i].email});
        //     console.log("data is arrived : " , edituser);
        //     props.history.push("/update")
        // }

        let datatableData = [];

        dataa.forEach((element,ind) => {
            datatableData.push(
                [`${element.id}` ,`${element.email}`, `${element.first_name}` , `${element.last_name}` ,`${element.avatar}`, <Fab size="small" onClick={() => setEditUser(dataa[ind])} key={ind}  aria-label="edit">
                <Edit /> 
              </Fab>   ] 
                )
            }) 
        const columns = ["Id" , "Email" , "First Name" ,"Last Name", "Avatar link", "Edit"];
        
        const addUserForm = (
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

            <button disabled={disablebutton} style={{cursor : disablebutton ? "not-allowed" : "pointer" }} className={`btn ${disablebutton ? "btn-secondary" : "btn-info"} btn-block`} onClick={(e) => handleOnSubmit(e)}> Add User </button>
        </form>
          );

        const handleAddUserOpen = () => {
            setAddUserModel(true);
          };
        
        const handleAddUserClose = () => {
            setAddUserModel(false);
            setDisableButton(true);
            setValues({ firstname: "",
            lastname: "",
            email: "",
            file: ""
            })
        };

        // const updateUser = (i) => {
        //     return(
        //         <form onSubmit={(e) => updateHandleOnSubmit(e)} autoComplete="off">
        //             <input type="text"   name="firstname"  defaultValue={dataa[i].first_name} onChange={(e) => handleOnChange(e)} />    
        //             <input type="text"  name="lastname"    defaultValue={dataa[i].last_name}  onChange={(e) => handleOnChange(e)} />   
        //             <input type="text"  name="email"       defaultValue={dataa[i].email}  onChange={(e) => handleOnChange(e)} />   
        //             <input type="text"  name="file"        defaultValue={dataa[i].file}  onChange={(e) => handleOnChange(e)} />    

        //             <button className="btn btn-lg btn-primary" >
        //                 <strong> Update </strong>            
        //             </button>     
        //         </form>
        //     )
        // } 
        
        // const handleUpdateUserOpen = () => {
        //     setReRender(false);
        //     setUpdateUserModel(true);
        //     };
    
        // const handleUpdateUserClose = () => {
        //     setUpdateUserModel(false);
        //     setDisableButton(true);
        //     setReRender(true);
        //     setValues({ firstname: "",
        //     lastname: "",
        //     email: "",
        //     file: ""
        //     })
        // };

        const updateHandleOnSubmit = async(e) => {
            e.preventDefault();
            try{
                console.log("element : " , e);
                const addUser = await fetch(`https://reqres.in/api/users/${e.id}`,{
                       method: "POST",
                       body: JSON.stringify({email, firstname , lastname, file})
                     }).then(response => response.json());
                     console.log("response ding ding  : , " + addUser);
                     if(addUser && addUser.id){
                         console.log("done");
                        //  setUpdateUserModel(false);
                     }else{
                       setError("Something Went Wrong");
                       throw Error("Fill the Valid Details Only");
                     }
              }catch(error){
                  setError(error.message);
              }
        }
        const Table = () => {
            return(
                <div style={{padding:"5rem", margin:"auto"}}>
                <Grid item xs={12}>
                        <MUIDataTable
                        title="All Users"
                        data={datatableData}
                        columns={columns}
                        options={{
                            filter: true,
                            print: false,
                            viewColumns: false,
                            selectableRows: "none"
                        }}
                        />
                    </Grid>
                </div>
            )
        }

        return(
            <Fragment>
                {Object.keys(edituser).length == 0 ?
                    (<div>
                        <Layout title="Dashboard" description={`Hellow ${user.username}, have a good day`} className="container-fluid"> 
                            <div className="row">
                                <div className="col-9">
                                    {userProfile()}
                                </div>
                            </div>
                        </Layout>
                    {Table()}
            
                    <Modal
                            open={addusermodel}
                            onClose={handleAddUserClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description">
                        { addUserForm }
                    </Modal>

                    <button onClick={handleAddUserOpen} className={`btn btn-info btn-block`}> Add Users </button>
                </div>) 
               : 
                <UpdateUser user={edituser} /> }
            </Fragment>
        )
    }

export default Dashboard