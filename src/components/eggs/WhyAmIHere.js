import React, {useState} from 'react';
import laughingGroup from '../../media/laughingGroup.png';

const options = ['Free Food', 'Lots of Libations', 'Convivial Conversation', 'Consummate Cake', 'Exciting Entertainment', 'Witnessing Whatever', 'Final Fireworks Finale', 'Hoping to Hookup', 'Had nothing better to Do', 'Didn’t want to get on Lisa’s Bad Side'];

const WhyAmIHere = () => {
    const [selected, setSelected] = useState([]);
    const [score, setScore] = useState(-1);

    const updateList = (idx) => {
        if (selected.includes(idx)) setSelected(selected.filter(s => s !== idx));
        else setSelected([...selected, idx]);
    }

    const result = (score) => {
        if (score >= 8) return 'You\'re a true friend. Enjoy the celebration.';
        else if (score >= 6) return 'We\'re happy that you came. Enjoy the celebration.';
        else if (score >= 3) return 'Really, that\'s all. Well, enjoy the celebration anyway.';
        else return 'Maybe you should have just stayed at home. Try to enjoy the celebration anyway.';
    }

    return (
        <div className="container calibri text-center mt-3">
            <img src={laughingGroup} alt="laughing" className="w-40vw mx-auto" />
            <h3 className="font-weight-bold">Why Am I Here (?)</h3>
            {   score < 0 ?
                <div>
                    <p>(Click all that apply)</p>
                    <div className="my-3" />
                    <div className="d-flex flex-column">
                        {options.map((option, idx) =>
                            <p className={`btn mx-auto ${selected.includes(idx) ? 'btn-green' : 'btn-outline-success'}`} onClick={() => updateList(idx)} key={idx}>{option}</p>
                        )}
                    </div>
                    <button className="btn bg-green" onClick={() => setScore(selected.length)}>Submit</button>
                </div> :
                <div className="">
                    <p>Result: {score}/10</p>
                    {result(score)}
                    <button className="btn bg-green d-block mx-auto" onClick={() => {setScore(-1); setSelected([])}}>Retake</button>
                </div>
            }

        </div>
    );
}

export default WhyAmIHere;