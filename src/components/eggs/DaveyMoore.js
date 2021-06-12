import React, {useEffect} from 'react';
import boxingGlove from '../../media/boxingGlove.png';

const DaveyMoore = () => {
        useEffect(() => {document.title = 'Davey Moore | Solstice 2021'});
        return (
                <div className="container calibri text-center text-3/4rem mt-3">
                    <img src={boxingGlove} alt="davey" className="w-40vw mx-auto" />
                    <p className="my-0"><b>David "Davey" Moore</b> (November 1, 1933 – March 25, 1963)</p>
                    <p className="my-0">was an African-American featherweight world champion boxer.</p>
                    <p className="my-0">Moore first gained wide attention from his performance</p>
                    <p className="my-0">on the 1952 US Olympic boxing team.</p>
                    <p className="my-0">He made his professional debut in 1953, at the age of 19,</p>
                    <p className="my-0">and at 25, he won the World Featherweight Championship.</p>
                    <p className="my-0">Moore retained his title through the remainder of his career,</p>
                    <p className="my-0">defending it 5 times, until losing it to Sugar Ramos in 1963.</p>
                    <p className="my-0">Moore died at age 29 as a result of injuries sustained</p>
                    <p className="my-0">in the match against Ramos.</p>
                    <div className="my-3" />
                    <p className="my-0">And now you know...</p>
                </div>
            )
}

export default DaveyMoore;