import React from 'react';
import Error404 from "./404";

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
                {!(this.state.name) &&
                    <Error404 message="No easter egg found here!" />
                }
            </div>
        );
    }
}