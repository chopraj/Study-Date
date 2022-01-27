import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const ProfileItem = ({profile: {
    user: {_id, email,name, avatar}, 
    bio, 
    hourlyrate, 
    skills, 
    contact_email,
    school
}}) => {
    return (
        <div className='profile'>
            <img src={avatar} alt='' className='round-img'/>
            <div className='profile-info'>
                    <h2 className='tutor-nameplate'>{name}</h2>
                    <p>StudyDate Tutor {school && <span>at {school}</span>}</p>
                    <p>Hourly Rate: <span>{hourlyrate}</span></p>
                    <a href={`mailto:${contact_email}`} className='viewprofilebtn'>
                        Contact
                    </a>
            </div>
            <div>
                {bio}
            </div>
            <ul className='listofskills'>
                    {skills.slice(0,4).map((skill, index) => (
                        <li key={index} className="text-primary">
                            <i className="fas fa-check"> { skill}</i>
                        </li>
                    ))}
            </ul>
        </div>
    )
}

ProfileItem.propTypes = {
profile: PropTypes.object.isRequired,

}

export default ProfileItem
