import React, {useEffect} from 'react';

const IDo = () => {
    useEffect(() => {document.title = 'I Do | Solstice 2021'});

    return (
        <div className="container calibri mt-3">
            <h1 className="text-center">I Do</h1>
        </div>
    )
}

export default IDo;