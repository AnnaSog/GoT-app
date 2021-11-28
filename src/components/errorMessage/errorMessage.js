import React from 'react';
import './errorMessage.css'

const ErrorMessage = () => {
    return( 
        <>
            <img src={process.env.PUBLIC_URL + '/img/START-ELSE.jpg'} alt='error'></img>
            <span className='error'> Something goes wrong </span>
        </>
        
    )
}

export default ErrorMessage;