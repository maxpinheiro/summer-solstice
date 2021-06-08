import React from 'react';
import veteransCover from "../../media/veteransCover.png";
import veterans from "../../media/veterans.mp4";

const Memories = () => {
    return (
        <div className="container calibri mt-3">
            <video width="100%" height="100%" controls poster={veteransCover}>
                <source src={veterans} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default Memories;