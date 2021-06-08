import React from 'react';
import coupleRun from '../../media/coupleRun.png';

const MagicalMemories = () => {
    return (
        <div className="container text-center mt-3">
            <img src={coupleRun} alt="couple" className="w-40vw mx-auto"/>
            <h2 className="font-weight-bold">Magical Memories (?)</h2>
            <h4 className="caveat">Enter your thoughts or feelings below,</h4>
            <h4 className="caveat">To capture this day, for us to know.</h4>
            <h4 className="caveat">Anything appropriate that comes to mind,</h4>
            <h4 className="caveat">Or slightly indecent, if you’re so inclined.</h4>
            <div className="my-5"/>
            <textarea className="text-center magical-textarea"></textarea>
        </div>
    )
}

export default MagicalMemories;