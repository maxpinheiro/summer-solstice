import React from 'react';
import Error404 from "./404";

import WhosWho from "./eggs/WhosWho";
import QuestionMark from "./eggs/QuestionMark";

const components = { WhosWho, QuestionMark };

export default class EggCarton extends React.Component {
    state = {
        name: ""
    }

    componentDidMount() {
        const egg = this.props.match.params.name;
        this.setState({name: egg});
    }

    render() {
        return (
            <div>
                { this.harvest(this.state.name) || <Error404 message="No easter egg found here!" /> }
            </div>
        );
    }

    harvest(name) {
        const c = name.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
        const Component = components[c];
        return Component ? <Component /> : null;
    }
}