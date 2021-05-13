import React from 'react';

const Error404 = ({message}) => {
    return (
        <div className="container text-center">
            <div className="h-20vh" />
            { message ?
                <div>404: {message}</div> :
                <div>404: Nothing found here!</div>
            }
        </div>
    )
}

export default Error404;