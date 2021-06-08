import React from 'react';
import bouquet from '../../media/bouquet.png';
import fieldSunset from '../../media/fieldSunset.png';
import prometheus from '../../media/prometheus.png';

const WhatDidTheyDo = () => {
    return (
        <div className="container calibri text-center text-5/6rem">
            <div className="my-3">
                <img src={bouquet} alt="bouqet" className="w-40vw mx-auto" />
                <h4 className="font-weight-bold">What did they do?</h4>
                <p className="my-0">Today’s (much abridged) ceremony</p>
                <p className="my-0">follows the traditional Druid wedding rites.</p>
                <div className="my-1"/>
                <p className="my-0">The bride and groom will stand in a sacred circle</p>
                <p className="my-0">of flowers to be bound together. Whenever possible,</p>
                <p className="my-0">the witnesses join hands and form concentric circles</p>
                <p className="my-0">around the couple to reinforce this sacred circle.</p>
                <p className="my-0">The flower circle that you wear around your head</p>
                <p className="my-0">symbolizes the sacred circle we stand in and</p>
                <p className="my-0">it empowers our union with your good will.</p>
                <p className="my-0">Finally, the exchange of circular rings</p>
                <p className="my-0">binds these energies</p>
                <p className="my-0">forever more.</p>
            </div>
            <div className="my-3">
                <img src={fieldSunset} alt="field" className="w-40vw mx-auto" />
                <h4 className="font-weight-bold">So what's a Druid?</h4>
                <p className="my-0">The earliest known reference to druids</p>
                <p className="my-0">dates to the fourth century BCE.  They were</p>
                <p className="my-0">spiritual leaders, lorekeepers, legal authorities,</p>
                <p className="my-0">as well as  judges, and  medical practitioners.</p>
                <p className="my-0">Following the Roman invasion of Gual, Druid</p>
                <p className="my-0">orders were suppressed by the government.</p>
                <div className="my-1"/>
                <p className="my-0">Neo-Druidism, sometimes termed Druidry,</p>
                <p className="my-0">is a modern spiritual movement that generally</p>
                <p className="my-0">promotes reverence for, and harmony with,</p>
                <p className="my-0">the natural world. This includes respect for</p>
                <p className="my-0">all living beings and the environment itself.</p>
                <p className="my-0">Originating in the 18th century Celtic revival,</p>
                <p className="my-0">Druidry was originally a cultural movement,</p>
                <p className="my-0">and only regained spiritual connotations</p>
                <p className="my-0">later in the 19th century.</p>
                <div className="my-1"/>
                <p className="my-0 font-weight-bold text-1rem">Are you serious?</p>
                <div className="my-1"/>
                <p className="my-0">Maybe so,</p>
                <img src={prometheus} alt="prometheus" className="w-40vw mx-auto" />
                <p className="mt-2 mb-5">Maybe not.</p>
            </div>
        </div>
    )
}

export default WhatDidTheyDo;