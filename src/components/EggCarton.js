import React from 'react';
import { Link } from "react-router-dom";
import easterEgg from '../media/easterEgg.png';
import Error404 from "./404";

import WhosWho from "./eggs/WhosWho";
import QuestionMark from "./eggs/QuestionMark";
import WhyAmIHere from "./eggs/WhyAmIHere";
import Bios from "./eggs/Bios";
import MagicalMemories from "./eggs/MagicalMemories";
import WhatDidTheyDo from "./eggs/WhatDidTheyDo";
import Heart from "./eggs/Heart";
import DaveyMoore from "./eggs/DaveyMoore";
import Today from "./eggs/Today";
import Thanks from "./eggs/Thanks";
import IDo from "./eggs/IDo";
import Virgin from "./eggs/Virgin";
import Memories from "./eggs/Memories";
import Bq from "./eggs/Bq";
import Btq from "./eggs/Btq";

const components = { WhosWho, QuestionMark, WhyAmIHere, Bios, MagicalMemories, WhatDidTheyDo, Heart, DaveyMoore, Today, Thanks, IDo, Virgin, Memories, Bq, Btq };

export default class EggCarton extends React.Component {
    state = {
        name: "",
        show: false
    }

    componentDidMount() {
        const egg = this.props.match.params.name;
        this.setState({name: egg, show: false});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const egg = this.props.match.params.name;
        if (egg !== prevProps.match.params.name) this.setState({name: egg, show: false});
    }

    render() {
        return (
            <div>
                {
                    this.harvest(this.state.name) ||
                    <div>
                        <Error404 message="No easter egg found here!" />
                        { this.hatch() }
                    </div>
                }
            </div>
        );
    }

    harvest(name) {
        const c = this.hyphenToTitle(name);
        const Component = components[c];
        return Component ? <Component /> : null;
    }

    splitTitle(name) {  return name.split(/(?=[A-Z])/).join(' '); }
    titleToHyphen(name) { return name.split(/(?=[A-Z])/).map(s => s.toLowerCase()).join('-'); }
    hyphenToTitle(name) { return name.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(''); }

    hatch() {
        return (
            <div className="text-center">
                <img onClick={() => this.setState(prevState => ({...prevState, show: !prevState.show}))}
                    src={easterEgg} className="w-5vw mx-auto my-3" alt="egg"/>
                <div className={`${this.state.show ? 'd-flex' : 'd-none'} flex-column`}>
                    {Object.keys(components).map((comp, idx) => (
                        <Link to={`/easter-egg/${this.titleToHyphen(comp)}`} key={idx}>{this.splitTitle(comp)}</Link>
                    ))}
                </div>
            </div>
        )
    }
}