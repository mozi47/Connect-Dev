import React from 'react'
import Moment from "react-moment"

const ProfileExperience = ({experience:{company, title, to, from, description}}) => {
    return (
        <div>
            <h3 className="text-dark">{company}</h3>
            <p>
                <Moment format="DD/MM/YYYY">from</Moment> - {!to ? "Now":<Moment format="DD/MM/YYYY">{to}</Moment>}
            </p>
            <p>
                <strong>Postion</strong> {title}
            </p>
            <p>
                <strong>Description</strong> {description}
            </p>
            <p>
                <strong>Postion</strong> {title}
            </p>
        </div>
    )
}

export default ProfileExperience
