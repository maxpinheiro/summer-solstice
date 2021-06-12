import React, {useState} from "react";
import { proxy } from 'valtio'
import quizzes from '../../media/quizzes.json';
import bird from '../../media/birdFlower.png';

const colors = ['bg-orange', 'bg-yellow', 'bg-green'];
const state = proxy({colorIdx: Math.floor(Math.random() * colors.length)});

const map = (input, input_start, input_end, output_start, output_end) => output_start + ((output_end - output_start) / (input_end - input_start)) * (input - input_start);

const Bq = () => {
    const [question, setQuestion] = useState(-1);
    const [score, setScore] = useState(0);
    const [tiebreakerScore, setTiebreakerScore] = useState(-1);
    const [guess, setGuess] = useState(50);
    const color = () => {const c = colors[state.colorIdx]; state.colorIdx = (state.colorIdx + 1) % colors.length; return c;};

    return (
        <div className="text-center calibri">
            <div className="py-3"/>
            {question === -1 ?
                <div>
                    <img src={bird} alt="bird" className="w-40vw mx-auto img-bw"/>
                    <p className="text-2rem">Bachelorette's Quest</p>
                    <p>(Whosoever shall score the highest on this trivia trial will be granted the distinction of serving as Lisa's Maid of Honor today. Good luck.)</p>
                    <button className={`btn text-2rem ${color()}`} onClick={() => {setScore(0); setQuestion(0);}}>Start</button>
                </div> :
                <div>
                    { question < quizzes["women"]["questions"].length ?
                        <div>
                            <p className="text-2rem">Question {question + 1}: {quizzes["women"]["questions"][question]["question"]}</p>
                            { quizzes["women"]["questions"][question]["options"].map(option => (
                                <div key={option}>
                                    <button className={`multiple-choice-btn ${color()}`}
                                            onClick={() => {
                                                setQuestion(question + 1);
                                                setScore(score + (option === quizzes["women"]["questions"][question]["answer"] ? 1 : 0))
                                            }}>{option}</button>
                                </div>
                            )) }
                        </div> :
                        <div>
                            {
                                tiebreakerScore === -1 ?
                                    <div>
                                        <p className="text-2rem">Tie Breaker: Lisa chose a number between 1-100. What is it?</p>
                                        <p className="text-4rem font-weight-bold">{guess}</p>
                                        <div className="my-5" />
                                        <input type="range" min={1} max={100} step={1} value={guess} onChange={e => setGuess(e.target.value)}/>
                                        <div className="my-5" />
                                        <button className={`btn text-2rem`} style={{backgroundColor: `hsl(${map(guess, 1, 100, 8, 300)}, 100%, 50%)`}} onClick={() => setTiebreakerScore(Math.abs(guess - 69))}>Submit</button>
                                    </div> :
                                    <div className="text-2rem">
                                        <div className="h-20vh" />
                                        <p>Your score: {score}</p>
                                        <p>Tiebreaker score: {tiebreakerScore}</p>
                                    </div>
                            }
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Bq;