import React, {useEffect} from 'react';
import {Link} from "react-router-dom";

const Bios = () => {
    useEffect(() => {window.scrollTo(0, 0); document.title = 'Bios | Solstice 2021';});
    return (
        <div className="container calibri text-1-1/4rem mt-4">
            <h1 className="text-center ">Bios</h1>
            <p className="mt-4 mb-5">Teddy Fatscher grew up in Massapequa Long Island and attended Long Island High School for the Arts for his junior and senior years.  Teddy continued his studies at the University of the Arts in Philadelphia.  He grew creatively and professionally while working for companies such as “Brian Sanders’ Junk” and “MOMIX”. Teddy formed his own company, Matter Movement Group in 2018, and has performed annually in the Fringe Arts Festival.</p>
            <p className="my-5">Kelly Trevlyn Fatscher grew up in Media, PA and attended Point Park University in Pittsburgh, Graduating with a BA in Dance. In 2014 she joined Brian Sanders’ JUNK in Philadelphia, where she began extending her classical dance training into various forms of performance including prop work and aerial dance. Kelly is also a proud performer with Matter Movement Group under the direction of Teddy Fatscher and Gunnar Montana Productions. Past performances and collaborations as a guest artist include Sharp Dance Company and Nickerson-Rossi Dance.</p>
            <p className="my-5">Kat Corbett, originally from eastern North Carolina, attended East Carolina University and earned her BFA in dance performance in a "triple track" program of ballet, jazz and modern. She now resides in Philadelphia and performs with companies such as Matter Movement Group, Brian Sander’s JUNK, and Asya Zlatina and Dancers.</p>
            <p className="my-5">Desirée Navall, trained all over the DC, Maryland, and Virginia areas in many styles including acrobatics, singing, and theatre, before eventually moving to New York to train at the Alvin Ailey American Dance Theater for a year. Studying dance at University of the Arts in Philadelphia, Desirée has performed various works with Debbie Allen, Frank Hatchet, Sidra Bell, Almanac Dance Circus Theatre, as well performing in Brian Sanders JUNK, 2nd Sanctuary, in October of 2019. Most recently, they Co-Produced and performed in The Edge, in Philadelphia’s Fringe Festival 2019, where it was nominated for a Barrymore Award.</p>
            <span className=""><span className="w-20%"/><Link to="/" classname="mb-4 mx-auto text-center">Return</Link></span>
            <div className="my-5" />
        </div>
    )
}

export default Bios;