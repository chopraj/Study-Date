import React from 'react'
import {Link} from 'react-router-dom'

export const Landing = () => 
        <section className="landing">
        <div className='dark-overlay'>
            <div className="inner">
                <h1 className="title">Study Date</h1>
                <p className="lead">Login/Register to connect with other students, find a tutor that fits your needs, get your questions answered, and ace your classes!</p>
                <div className="buttons">
                    <Link to="/login" className="btn ">Login</Link>
                    <Link to="/register" className="btn ">Register</Link>
                 </div>
            </div>
        </div> 
    </section>
