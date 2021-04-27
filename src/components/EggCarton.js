import React from 'react';

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
                    <p>404: No egg found here!</p>
                }
            </div>
        );
    }
}