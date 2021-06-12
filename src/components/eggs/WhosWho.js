import React, {useEffect, useState} from 'react';
import quizzes from '../../media/quizzes.json';
import { Test, QuestionGroup, Question, Option } from 'react-multiple-choice';

const results = [
    "Who invited you, oh my, oh my!.  Go out and give it another try.  (Try again later.)",
    "Why that’s not too bad, you’re off to a good start, but better you can do, before you depart .  (Try again later.)",
    "Well, if that’s the best you can do, you can get a consummate cookie too?  (See Scott or Lisa in her tutu.)",
    "Wow, you really got around! A special prize you just found. A consummate cookie for you “to go”.   (See Scott or Lisa after the show.)"
];

const WhosWho = () => {
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(-1);

    const grade = (answers) => Object.entries(answers).filter(([question, answer]) => answer === quizzes["whos-who"]["questions"][parseInt(question)]["answer"]).length;

    useEffect(() => {document.title = 'Who\'s Who | Solstice 2021'});

    return (
        <div className="container calibri">
            {
                score < 0 ?
                <div className="text-center">
                    <p className="text-2rem font-weight-bold text-center">Who's Who (?)</p>
                    <Test onOptionSelect={selectedOptions => setAnswers({ selectedOptions })} style={{ width: "100%" }}>
                        {quizzes["whos-who"]["questions"].map(({question, options, answer}, idx) => (
                            <QuestionGroup questionNumber={idx} >
                                <Question><p className="text-center font-weight-bold">{idx+1}. {question}</p></Question>
                                {options.map(option => <Option value={option}>{option}</Option>)}
                                <div className="my-3" />
                            </QuestionGroup>
                        ))}
                    </Test>
                    <button className="btn bg-green" onClick={() => setScore(grade(answers.selectedOptions))}>Submit</button>
                </div> :
                <div className="text-center">
                    <p className="text-1-1/2rem">Score: {score} / 12</p>
                    <p className="text-1rem">{results[Math.floor((score / 12) * 3.99)]}</p>
                    <button className="btn bg-green" onClick={() => {setScore(-1); setAnswers({})}}>Retry</button>
                </div>
            }
            <div className="h-20vh" />
            <div className="h-20vh" />
        </div>
    );
}

export default WhosWho;