import React from 'react';
import quizzes from '../../media/quizzes.json';

const WhosWho = () => {
    return (
        <div className="container calibri">
            <p className="text-2rem font-weight-bold text-center">Who's Who (?)</p>
            {quizzes["whos-who"]["questions"].map(({question, options, answer}, idx) => (
                <div key={idx}>
                    <p>{idx + 1}. {question}</p>
                </div>
            ))}
        </div>
    );
}

export default WhosWho;