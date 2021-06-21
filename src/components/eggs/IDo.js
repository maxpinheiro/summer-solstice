import React, {useEffect} from 'react';
import Iframe from 'react-iframe'

const IDo = () => {
    useEffect(() => {document.title = 'I Do | Solstice 2021'});

    return (
        <div className="container calibri mt-3">
            <h1 className="text-center">I Do</h1>
            <Iframe url="https://www.youtube.com/embed?v=Obq-QfeJWuY"
                    id="iDo"
                    className="mx-auto w-80vw"
                    display="initial"
                    position="relative"
            />
            <p>Click <a href="https://www.youtube.com/watch?v=Obq-QfeJWuY">here</a> if the embedded video is not working.</p>

        </div>
    )
}

export default IDo;