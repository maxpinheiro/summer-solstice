import React from 'react';
import program from '../media/program.json';
import bouqet from '../media/bouqet.png';

export default class Home extends React.Component {
    state = {
        "schedule": [{"time": "", "event":  ""}],
        "appetizers": [{"item":  "", "description":  ""}],
        "menu": [{"item":  "", "description":  ""}]
    }
    componentDidMount() {

    }

    Schedule() {
        return(
            <div className="d-flex flex-column orange-border p-1">
                <img src={bouqet} alt="bouqet" className="w-40vw mx-auto"/>
                <div className="mx-auto px-2">
                    { program.schedule.map(({time, event, url}) => (
                        <div className="mx-3">
                            {
                                url ?
                                    <a href={url}><p className="calibri text-dark">{time}        {event}</p></a>:
                                    <p className="calibri">{time}        {event}</p>
                            }
                        </div>
                    )) }
                </div>
            </div>
        )
    }

    Appetizers() {
        return(
            <div className="d-flex flex-column orange-border p-1" id="sumptuous-selections">
                <img src={bouqet} alt="bouqet" className="w-40vw mx-auto"/>
                <p className="milonga title font-weight-bold text-center">Sumptuous Selections</p>
                <div className="mx-auto px-2">
                    { program.appetizers.map(({item, description}) => (
                        <div className="text-center my-3">
                            <p className="calibri font-weight-bold my-0">{item}</p>
                            {description.split('\n').map(d => <p className="calibri my-0">{d}</p>)}
                        </div>
                    )) }
                </div>
            </div>
        )
    }

    Menu() {
        return(
            <div className="d-flex flex-column orange-border p-1" id="enticing-edibles">
                <img src={bouqet} alt="bouqet" className="w-40vw mx-auto"/>
                <p className="milonga title font-weight-bold text-center">Enticing Edibles</p>
                <div className="mx-auto px-2">
                    { program.menu.map(({item, description}) => (
                        <div className="text-center my-3">
                            <p className="calibri font-weight-bold">{item}</p>
                            {description.split('\n').map(d => <p className="calibri my-2">{d}</p>)}
                        </div>
                    )) }
                </div>
            </div>
        )
    }



    render() {
        return (
            <div className="container-fluid p-3">
                <div className="minh-100">
                    <div style={{"height": "35vh"}}/>
                    <p className="milonga title font-weight-bold text-center">Summer Solstice Renewal Celebration</p>
                </div>
                <div className="minh-100 my-5">
                    {this.Schedule()}
                </div>
                <div className="minh-100 my-5">
                    {this.Appetizers()}
                </div>
                <div className="minh-100 my-5">
                    {this.Menu()}
                </div>
            </div>
        );
    }
}