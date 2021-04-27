import React from 'react';
import quizzes from '../media/quizzes.json';

export default class Quizzes extends React.Component {
    state = {
        gender: ""
    }

    componentDidMount() {
        const gender = this.props.match.params.gender;
        this.setState({gender: gender});
    }

    render() {
        return (
            <div>
                {!(this.state.gender) &&
                <p>404: No quiz found here!</p>
                }
                {(["men", "women"]).includes(this.state.gender) &&
                    quizzes[this.state.gender].map(question => )
                }
            </div>
        );
    }
}