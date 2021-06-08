import React from 'react';

import sunGlobe from '../../media/sunGlobe.png';

const Thanks = () => {
    return (
        <div className="container calibri text-center">
            <img src={sunGlobe} alt="solstice" className="w-80vw mx-auto my-3" />
            <h3 className="lobster">A MidSummer's Day Dream</h3>
            <p className="text-left mx-3 mt-3">Midsummer celebration, practiced in nations throughout the world, is one of the oldest holidays in human history.  Midsummer was originally a pagan festival honoring the summer solstice, and has survived Christianization, but lost its original meaning after being incorporated into the Christian religious calendar as “St. John’s Day.”</p>
            <p className="text-left mx-3 mb-3">We held our first Midsummer celebration back in 2007 with just a handful of families and a hankering for Jamaican Jerk Chicken. Over the years, as our celebration grew, the name has changed, the Jerk Chicken has transformed, and the bands have come and gone, but one thing has always remained the same, amazing friends like you.</p>
            <div className="lobster my-4">
                <h6 className="my-1">We hope you’re enjoying our final soiree,</h6>
                <h6 className="my-1">Drinking and dancing and being quite gay.</h6>
                <h6 className="my-1">Feasting and frolicking, perhaps some foreplay,</h6>
                <h6 className="my-1">Making the most of this Midsummer day.</h6>
                <h6 className="my-1">I may have a problem with rhyming some say,</h6>
                <h6 className="my-1">Overly concerned with silly word play.</h6>
                <h6 className="my-1">Creating some order from some disarray,</h6>
                <h6 className="my-1">And keeping my mind from going astray,</h6>
                <h6 className="my-1">But one final thing I would like to convey,</h6>
                <h6 className="my-1">Before the time comes to see you away:</h6>
                <h6 className="my-1">"Here’s to you our dear friends...Hip-Hip Hooray”</h6>
            </div>
        </div>
    )
}

export default Thanks;