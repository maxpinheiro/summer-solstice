import React, {useEffect} from 'react';
import solsticeNewbiesCover from "../../media/solsticeNewbiesCover.png";
import solsticeNewbies from "../../media/solsticeNewbies.mp4";

const Virgin = () => {
    useEffect(() => {document.title = 'Virgin | Solstice 2021'});

    return (
        <div className="container calibri mt-3">
            <video width="100%" height="100%" controls poster={solsticeNewbiesCover}>
                <source src={solsticeNewbies} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default Virgin;