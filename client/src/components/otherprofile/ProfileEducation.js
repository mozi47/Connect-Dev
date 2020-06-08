import React from 'react'
import Moment from "react-moment"

const ProfileEducation = ({education:{school, degree, to, from, fieldofstudy, description}}) => {
    return (
        <div>
            <h3 className="text-dark">{school}</h3>
            <p>
                <Moment format="DD/MM/YYYY">from</Moment> - {!to ? "Now":<Moment format="DD/MM/YYYY">{to}</Moment>}
            </p>
            <p>
                <strong>Degree</strong> {degree}
            </p>
            <p>
                <strong>Field of Study</strong> {fieldofstudy}
            </p>
            <p>
                <strong>Description</strong> {description}
            </p>
            
        </div>
    )
}

export default ProfileEducation
