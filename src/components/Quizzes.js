import React, { useState } from 'react';
import { proxy } from 'valtio'
import quizzes from '../media/quizzes.json';
import Error404 from "./404";
import bird from '../media/bird.png';

const colors = ['bg-orange', 'bg-yellow', 'bg-green'];
const state = proxy({colorIdx: Math.floor(Math.random() * colors.length)});

const Quiz = ({gender, addScore}) => {
    const [question, setQuestion] = useState(-1);
    const [score, setScore] = useState(0);
    const color = () => {const c = colors[state.colorIdx]; state.colorIdx = (state.colorIdx + 1) % colors.length; return c;};

    return (
        <div className="calibri">
            <div className="py-3"/>
            {question === -1 ?
                <div>
                    <img src={bird} alt="bird" className="w-40vw mx-auto img-bw"/>
                    <p className="text-2rem">{gender === 'men' ? 'Bachelor\'s' : 'Bachelorette\'s'} Quest</p>
                    <p>(Whosoever shall score the highest on this trivia trial will be granted the distinction of serving as {gender === 'men' ? 'Scott\'s Best Man' : 'Lisa\'s Maid of Honor'} today. Good luck.)</p>
                    <button className={`btn text-2rem ${color()}`} onClick={() => {setScore(0); setQuestion(0);}}>Start</button>
                </div> :
                <div>
                    { question < quizzes[gender]["questions"].length ?
                        <div>
                            <p className="text-2rem">Question {question + 1}: {quizzes[gender]["questions"][question]["question"]}</p>
                            { quizzes[gender]["questions"][question]["options"].map(option => (
                                <div key={option}>
                                    <button className={`multiple-choice-btn ${color()}`}
                                            onClick={() => {
                                                setQuestion(question + 1);
                                                setScore(score + (option === quizzes[gender]["questions"][question]["answer"] ? 1 : 0))
                                            }}>{option}</button>
                                </div>
                            )) }
                        </div> :
                        <div className="text-2rem">
                            <div className="h-20vh" />
                            <p>Your score: {score}</p>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default class Quizzes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: "",
        }
    }

    componentDidMount() {
        const gender = this.props.match.params.gender;
        this.setState({gender});

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        return (
            <div className="text-center">
                { (["men", "women"]).includes(this.state.gender) ?
                    <div>
                        <Quiz gender={this.state.gender} />
                    </div> :
                    <Error404 message="No quiz found here!" />
                }
            </div>
        );
    }

}