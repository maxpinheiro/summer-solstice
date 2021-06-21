import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import dancing from "../media/dancing.png";

const List = () => {
    useEffect(() => {document.title = 'List | Solstice 2021'});

    return (
        <div className="text-center calibri">
            <div className="my-5" />
            <Link to="easter-egg/whats-going-on" className="d-block mb-2">What's Going On (?)</Link>
            <Link to="easter-egg/why-am-i-here" className="d-block my-2">Why Am I Here (?)</Link>
            <Link to="easter-egg/memories" className="d-block my-2">Memories (?)</Link>
            <Link to="easter-egg/what-did-they-do" className="d-block my-2">I Do (?)</Link>
            <Link to="easter-egg/virgin" className="d-block my-2">Virgin Sacrifice (?)</Link>
            <Link to="easter-egg/today" className="d-block my-2">Today (?)</Link>
            <Link to="easter-egg/question-mark" className="d-block my-2">Why Not (?)</Link>
            <Link to="easter-egg/thanks" className="d-block my-2">Too Much (?)</Link>
            <Link to="easter-egg/i-do" className="d-block my-2">First Time (?)</Link>
            <Link to="easter-egg/davey-moore" className="d-block my-2">?</Link>
            <Link to="easter-egg/magical-memories" className="d-block my-2">Thoughts (?)</Link>
            <Link to="easter-egg/heart" className="d-block my-2">Thanks (?)</Link>
            <Link to="easter-egg/whos-who" className="d-block my-2">Who's Who (?)</Link>
            <div className="my-4" />
            <img src={dancing} alt="dancing" className="w-40vw mx-auto" />
        </div>
    )
}

export default List;