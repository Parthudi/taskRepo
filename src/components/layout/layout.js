import React from 'react'
import Menu from '../dashboard/menu'
import './layout.css'

const Layout = (props) => {
    return(
        <div>
            <Menu />
            <div className="jumbotron">
                <h2> {props.title} </h2>
                <p className="lead"> {props.description} </p>
            </div>
        </div>
    )
}

export default Layout