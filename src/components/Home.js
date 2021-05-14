import React from 'react';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';
import LightSpeed from 'react-reveal/LightSpeed';
import Swing from 'react-reveal/Swing';
import Jump from 'react-reveal/Jump';
import Shake from 'react-reveal/Shake';
import Spin from 'react-reveal/Spin';

import program from '../media/program.json';
import bouquet from '../media/bouquet.png';
import birdFlower from '../media/birdFlower.png';
import dancing from '../media/dancing.png';
import flowerGirl from '../media/flowerGirl.png';
import laughing from '../media/laughing.png';

export default class Home extends React.Component {
    state = {
        "bouquet1": false,
        "bouquet2": false,
        "bouquet3": false,
        "bird": false,
        "dancing": false,
        "flowerGirl": false,
        "man1": false,
        "man2": false
    }

    constructor(props) {
        super(props);
        this.birdDiv = React.createRef();
        this.dancingDiv = React.createRef();
        this.flowerGirlDiv = React.createRef();
    }

    componentDidMount() {
        if (this.birdDiv.current) {
            (new IntersectionObserver((entities) => {
                if (entities[0].isIntersecting) {
                    this.setState(prevState => ({...prevState, bird: true}));
                }
            }, { root: null, rootMargin: "0px", threshold: 0.5 })).observe(this.birdDiv.current);
        }
        if (this.dancingDiv.current) {
            (new IntersectionObserver((entities) => {
                if (entities[0].isIntersecting) {
                    this.setState(prevState => ({...prevState, dancing: true}));
                }
            }, { root: null, rootMargin: "0px", threshold: 1.0 })).observe(this.dancingDiv.current);
        }
        if (this.flowerGirlDiv.current) {
            (new IntersectionObserver((entities) => {
                if (entities[0].isIntersecting) {
                    this.setState(prevState => ({...prevState, flowerGirl: true}));
                }
            }, { root: null, rootMargin: "0px", threshold: 0.25 })).observe(this.flowerGirlDiv.current);
        }
    }

    Schedule() {
        return(
            <div className="minh-100 my-5">
                <Fade left><div className="d-flex flex-column orange-border p-1">
                    <Jump spy={this.state.bouquet1}><img src={bouquet} alt="bouqet" className="w-40vw mx-auto" onClick={() => this.setState(prevState => ({...prevState, bouquet1: !prevState.bouquet1}))}/></Jump>
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
                </div></Fade>
            </div>
        )
    }

    Appetizers() {
        return(
            <div className="minh-100 my-5">
                <Fade right><div className="d-flex flex-column orange-border p-1" id="sumptuous-selections">
                    <Shake spy={this.state.bouquet2}><img src={bouquet} alt="bouqet" className="w-40vw mx-auto" onClick={() => this.setState(prevState => ({...prevState, bouquet2: !prevState.bouquet2}))}/></Shake>
                    <p className="milonga text-2rem font-weight-bold text-center">Sumptuous Selections</p>
                    <div className="mx-auto px-2">
                        { program.appetizers.map(({item, description}) => (
                            <div className="text-center my-3">
                                <p className="calibri font-weight-bold my-0">{item}</p>
                                {description.split('\n').map(d => <p className="calibri my-0">{d}</p>)}
                            </div>
                        )) }
                    </div>
                </div></Fade>
            </div>
        )
    }

    Menu() {
        return(
            <div className="minh-100 my-5">
                <Fade left><div className="d-flex flex-column orange-border p-1" id="enticing-edibles">
                    <Spin spy={this.state.bouquet3}><img src={bouquet} alt="bouqet" className="w-40vw mx-auto" onClick={() => this.setState(prevState => ({...prevState, bouquet3: !prevState.bouquet3}))}/></Spin>
                    <p className="milonga text-2rem font-weight-bold text-center">Enticing Edibles</p>
                    <div className="mx-auto px-2">
                        { program.menu.map(({item, description}) => (
                            <div className="text-center my-3">
                                <p className="calibri font-weight-bold">{item}</p>
                                {description.split('\n').map(d => <p className="calibri my-2">{d}</p>)}
                            </div>
                        )) }
                    </div>
                </div></Fade>
            </div>
        )
    }

    MomentByMoment() {
        return (
            <div className="my-5">
                <div ref={this.birdDiv} className="d-flex flex-column calibri p-1" id="moment-by-moment">
                    <Slide left opposite when={this.state.bird}><img src={birdFlower} alt="bird" className="w-40vw mx-auto"/></Slide>
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
                <div ref={this.dancingDiv} className="d-flex flex-column calibri p-1" id="mother-zeta">
                    <Swing when={this.state.dancing}><img src={dancing} alt="dancing" className="w-40vw mx-auto"/></Swing>
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
                <div ref={this.flowerGirlDiv} className="d-flex flex-column calibri p-1" id="moment-by-moment">
                    <LightSpeed left opposite when={this.state.flowerGirl}><img src={flowerGirl} alt="flowerGirl" className="w-40vw mx-auto"/></LightSpeed>
                    <p className="font-weight-bold text-center text-2rem">A Summer Solstice Musical Journey</p>
                    <div className="">
                        { program.playlist.map((song, idx) =>
                            idx === 24 ?
                                <div>
                                    <pre className="text-center calibri my-0 text-3/4rem">{`${idx+1}. `}{song}</pre>
                                    <div className="d-flex flex-row justify-content-center">
                                        <Jump spy={this.state.man1}><img src={laughing} alt="laughing" className="w-20vw h-20vw" onClick={() => this.setState(prevState => ({...prevState, man1: !prevState.man1}))}/></Jump>
                                        <Jump spy={this.state.man2}><img src={laughing} alt="laughing" className="w-20vw h-20vw" onClick={() => this.setState(prevState => ({...prevState, man2: !prevState.man2}))}/></Jump>
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