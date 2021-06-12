import React, {useEffect, useState} from 'react';
import coupleRun from '../../media/coupleRun.png';

const MagicalMemories = () => {
    const [message, setMessage] = useState("");
    const [sent, setSent] = useState(false);
    const sendMessage = (message) => {
        window.emailjs.send('solstice_memories', 'template_nkfb7ks', {message})
            .then(res => {console.log('Email sent successfully!'); setSent(true);})
            .catch(err => console.log('Oh well, you failed. Here some thoughts on the error that occurred:', err))
    }

    useEffect(() => {document.title = 'Magical Memories | Solstice 2021'});

    return (
        <div className="container text-center mt-3">
            <img src={coupleRun} alt="couple" className="w-40vw mx-auto"/>
            <h2 className="font-weight-bold">Magical Memories (?)</h2>
            { !sent ?
                <div>
                    <h4 className="caveat">Enter your thoughts or feelings below,</h4>
                    <h4 className="caveat">To capture this day, for us to know.</h4>
                    <h4 className="caveat">Anything appropriate that comes to mind,</h4>
                    <h4 className="caveat">Or slightly indecent, if you’re so inclined.</h4>
                    <div className="my-5"/>
                    <textarea className="text-center magical-textarea" value={message} onChange={e => setMessage(e.target.value)} />
                    <button className="btn bg-orange my-5" onClick={() => sendMessage(message)}>Send your Memories to the Pinheiro's</button>
                </div>
                :
                <div className="caveat">
                    <p className="text-1-1/2rem">Memories Sent Successfully!</p>
                    <p className="text-1rem">Your message: {message}</p>
                </div>
            }

        </div>
    )
}

export default MagicalMemories;