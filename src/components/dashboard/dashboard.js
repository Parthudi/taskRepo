import React, {useEffect, useState} from 'react'
import Layout from '../layout/layout'
import MUIDataTable from "mui-datatables";
import {Grid} from "@material-ui/core";
import AddUser from "../dashboard/addUser";

const Dashboard = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [dataa, setDataa] = useState([]);
    const [addUser, setAddUser] = useState(false); 

    const user = JSON.parse(localStorage.getItem("userDetails"));

    const usersData = () => {
        setIsLoading(true);
         fetch(`https://reqres.in/api/users?page=2`,{
            method: "GET"
          }).then(res => res.json()).then(resp => (setDataa(resp.data)))
        setIsLoading(false);
      }

    useEffect(() => {
        usersData();
    } , []);

        const adminProfile = () => {
            return (
                <div className="card mb-5">
                <h3 className="card-header"> User Informaton</h3>
                <ul className="list-group">
                    <li className="list-group-item"> Name:  <b> {user.username} </b> </li>
                </ul>
            </div>
            )}

        let datatableData = [];

        dataa.forEach(element => {
            datatableData.push(
                [`${element.id}` ,`${element.email}`,  `${element.first_name}` , `${element.last_name}` ,`${element.avatar}`] 
                )
            }) 
        const columns = ["Id" , "Email" , "First Name" ,"Last Name", "Avatar link"];
        
        return(
            <div>
              {!addUser ?
            (
            <div>
                <Layout title="Dashboard" description={`Hellow ${user.username}, have a good day`} className="container-fluid"> 
                        <div className="row">
                            <div className="col-9">
                                {adminProfile()}
                            </div>
                        </div>
                </Layout>
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
                                selectableRows: 'none',
                            }}
                            />
                        </Grid>
                    </div>
            
            <button onClick={() => setAddUser(true)}  className="btn btn-info  btn-block"> Add Users </button>
                </div>) :
                <AddUser /> }

        </div>
        )
}   

export default Dashboard