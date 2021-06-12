import React, { useState, useEffect, useRef } from 'react';
import bird from '../../media/bird.png';
import sun from '../../media/sun.gif';
import sunflowerRock from '../../media/sunflowerRock.jpeg';

const QuestionMark = () => {
    const loader = useRef(null);
    const [list, setList] = useState(['?']);

    useEffect(() => {
        document.title = '? | Solstice 2021';
        const observer = new IntersectionObserver((entities) => {
            if (entities[0].isIntersecting) {
                setList(list => list.concat(Array(1000).fill('?')));
            }
        }, { root: null, rootMargin: "20px", threshold: 1.0 });
        if (loader.current) {
            observer.observe(loader.current);
        }
    })

    return (
        <div className="container comic-sans text-center">
            <div className="minh-100">
                <div className="my-5" />
                <img src={bird} alt="bird" className="w-20vw img-bw float-right my-3" />
                <img src={sun} alt="sun" className="" />
            </div>
            <div className="minh-100 mb-2">
                Why not be grateful for the little things
            </div>
            <div className="minh-100 mt-2">
                <img src={sunflowerRock} alt="sunflower" className="w-40vw mx-auto" />
            </div>
            <div className="minh-100">
                <h3>?</h3>
            </div>
            <div className="minh-100">
                <h3>??</h3>
            </div>
            <div className="minh-100">
                <h3>???</h3>
            </div>
            <div className="minh-100">
                <h3>????</h3>
            </div>
            <div className="minh-100">
                <h3>?????</h3>
            </div>
            <div className="minh-100">
                <h3>???????</h3>
            </div>
            <div className="minh-100">
                <h3>Why are you still scrolling</h3>
            </div>
            <div className="minh-100">
                <h3>???????</h3>
            </div>
            <div className="minh-100">
                <h3>????????</h3>
            </div>
            <div className="minh-100">
                <h3>Seriously, there's nothing more but</h3>
                <h3><br/>?????????<br/><br/>????????????<br/><br/>????????????????<br/><br/>???????????<br/><br/>??????<br/><br/>???<br/><br/>?<br/></h3>
                {list.map((_, idx) => <h3 key={idx} className="my-5">?</h3>)}
            </div>
            <div ref={loader}/>
        </div>
    );
}

export default QuestionMark;