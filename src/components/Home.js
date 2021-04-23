import React from 'react';
import program from '../media/program.json';
import bouqet from '../media/bouqet.png';
import bird from '../media/bird.png';
import dancing from '../media/dancing.png';
import flowerGirl from '../media/flowerGirl.png';
import laughing from '../media/laughing.png';

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
            <div className="minh-100 my-5">
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
            </div>
        )
    }

    Appetizers() {
        return(
            <div className="minh-100 my-5">
                <div className="d-flex flex-column orange-border p-1" id="sumptuous-selections">
                    <img src={bouqet} alt="bouqet" className="w-40vw mx-auto"/>
                    <p className="milonga text-2rem font-weight-bold text-center">Sumptuous Selections</p>
                    <div className="mx-auto px-2">
                        { program.appetizers.map(({item, description}) => (
                            <div className="text-center my-3">
                                <p className="calibri font-weight-bold my-0">{item}</p>
                                {description.split('\n').map(d => <p className="calibri my-0">{d}</p>)}
                            </div>
                        )) }
                    </div>
                </div>
            </div>
        )
    }

    Menu() {
        return(
            <div className="minh-100 my-5">
                <div className="d-flex flex-column orange-border p-1" id="enticing-edibles">
                    <img src={bouqet} alt="bouqet" className="w-40vw mx-auto"/>
                    <p className="milonga text-2rem font-weight-bold text-center">Enticing Edibles</p>
                    <div className="mx-auto px-2">
                        { program.menu.map(({item, description}) => (
                            <div className="text-center my-3">
                                <p className="calibri font-weight-bold">{item}</p>
                                {description.split('\n').map(d => <p className="calibri my-2">{d}</p>)}
                            </div>
                        )) }
                    </div>
                </div>
            </div>
        )
    }

    MomentByMoment() {
        return (
            <div className="my-5">
                <div className="d-flex flex-column calibri p-1" id="moment-by-moment">
                    <img src={bird} alt="bird" className="w-40vw mx-auto"/>
                    <div className="mx-auto">
                        <p className="font-italic font-weight-bold text-center text-2rem mb-0">Moment by Moment</p>
                        <p className=" text-center">performed by Matter Movement Group</p>
                    </div>
                    <div className="mx-auto px-2 text-center">
                        <p>Choreographed by Teddy & Kelly Fatscher</p>
                        <p>Theodore Fatscher</p>
                        <p>Kelly Fatscher</p>
                        <p>Number 3</p>
                        <p>Number 4</p>
                    </div>
                </div>
            </div>
        )
    }

    MotherZeta() {
        return (
            <div className="my-5">
                <div className="d-flex flex-column calibri p-1" id="mother-zeta">
                    <img src={dancing} alt="dancing" className="w-40vw mx-auto"/>
                    <p className="font-weight-bold text-center text-2rem">Mother Zeta</p>
                    <div className="">
                        { program.motherZeta.map(member => (
                            <pre className="text-center calibri">{member }</pre>
                        )) }
                    </div>
                </div>
            </div>
        )
    }

    Playlist() {
        return (
            <div className="my-5">
                <div className="d-flex flex-column calibri p-1" id="moment-by-moment">
                    <img src={flowerGirl} alt="flowerGirl" className="w-40vw mx-auto"/>
                    <p className="font-weight-bold text-center text-2rem">A Summer Solstice Musical Journey</p>
                    <div className="">
                        { program.playlist.map((song, idx) =>
                            idx === 24 ?
                                <div>
                                    <pre className="text-center calibri my-0 text-3/4rem">{`${idx+1}. `}{song}</pre>
                                    <div className="d-flex flex-row justify-content-center">
                                        <img src={laughing} alt="laughing" className="w-20vw h-20vw"/>
                                        <img src={laughing} alt="laughing" className="w-20vw h-20vw"/>
                                    </div>
                                </div>
                            : <pre className="text-center calibri my-0 text-3/4rem">{`${idx+1}. `}{song}</pre>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="container-fluid p-3">
                <div className="minh-100">
                    <div style={{"height": "35vh"}}/>
                    <p className="milonga text-2rem font-weight-bold text-center">Summer Solstice Renewal Celebration</p>
                </div>
                {this.Schedule()}
                {this.Appetizers()}
                {this.Menu()}
                {this.MomentByMoment()}
                {this.MotherZeta()}
                {this.Playlist()}
            </div>
        );
    }
}