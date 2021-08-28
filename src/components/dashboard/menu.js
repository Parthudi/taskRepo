import React, {Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'

//history-> current url path
const isActive = (history, path) => {
    if(history.location.pathname === path){
        return { color:"yellow" }
        }
}

const Menu = (props) => {

    return(
        <ul className="nav nav-tabs  btn btn-info text-right" >
            <li className='nav-items' >
                <Link className='nav-link' style={isActive(props.history, '/dashboard')} to= '/user/dashboard'  >  
                        Dashboard
                </Link>
             </li>
            
            <div>
                <li className='nav-items'>
                    <span className='nav-link' style={{cursor : "pointer" ,color: 'while'}} onClick={() => props.history.push('/login')  } > 
                        Signout  
                    </span>
                </li>
                </div>                    
        </ul>
    )
}

export default withRouter(Menu)