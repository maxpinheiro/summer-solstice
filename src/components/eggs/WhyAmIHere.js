import React, {useState, useEffect} from 'react';
import laughingGroup from '../../media/laughingGroup.png';

const options = ['Free Food', 'Lots of Libations', 'Convivial Conversation', 'Consummate Cake', 'Exciting Entertainment', 'Witnessing Whatever', 'Final Fireworks Finale', 'Hoping to Hookup', 'Had nothing better to Do', 'Didn’t want to get on Lisa’s Bad Side'];

const WhyAmIHere = () => {
    const [selected, setSelected] = useState([]);
    const [score, setScore] = useState(-1);

    const updateList = (idx) => {
        if (selected.includes(idx)) setSelected(selected.filter(s => s !== idx));
        else setSelected([...selected, idx]);
    }

    const percent = (score) => {
        if (score >= 8) return "h-100";
        else if (score >= 6) return "h-75%";
        else if (score >= 3) return "h-50%";
        else return "h-25%";
    }

    const submit = (score) => {setScore(score); window.scrollTo(0, 0);}

    useEffect(() => {document.title = 'Why Am I Here | Solstice 2021'});

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
                            <p className={`btn mx-auto ${selected.includes(idx) ? 'btn-success' : 'btn-outline-success'}`} onClick={() => updateList(idx)} key={idx}>{option}</p>
                        )}
                    </div>
                    <button className="btn bg-green mb-5" onClick={() => submit(selected.length)}>Submit</button>
                </div> :
                <div className="text-1-1/4rem">
                    <p className="mb-4">Your score: {score}/10</p>
                    <div className="row">
                        <div className="col-2">
                            <div className="px-2 meter-bg">
                                <div className="meter align-bottom ml-25%" style={{height: `${score * 10 + 5}%`}}/>
                            </div>
                        </div>
                        <div className="col-10 pl-0">
                            <p className={score >= 8 ? 'text-success font-weight-bold' : 'text-black-50'}>You're a true friend. Enjoy the celebration.</p>
                            <p className={(score >= 6 && score < 8) ? 'text-success font-weight-bold' : 'text-black-50'}>We're happy that you came. Enjoy the celebration.</p>
                            <p className={(score >= 3 && score < 6) ? 'text-success font-weight-bold' : 'text-black-50'}>Really, that's all. Well, enjoy the celebration anyway.</p>
                            <p className={`${score < 3 ? 'text-success font-weight-bold' : 'text-black-50'} mb-0`}>Maybe you should have just stayed at home. Try to enjoy the celebration anyway.</p>
                        </div>
                    </div>
                    <button className="btn bg-green d-block mx-auto my-3" onClick={() => {setScore(-1); setSelected([])}}>Retake</button>
                </div>
            }

        </div>
    );
}

export default WhyAmIHere;