import React, {useEffect} from 'react';
import goldenHeart from '../../media/goldenHeart.png';
import HeartPhoto from '../../media/HeartPhoto.jpeg';

const Heart = () => {
    useEffect(() => {document.title = 'Heart | Solstice 2021'});

    return (
        <div className="container caveat text-center">
            <div className="d-flex flex-column text-1-1/4rem my-5">
                <img src={goldenHeart} alt="heart" className="w-40vw mx-auto" />
                <p className="mt-2 mb-0">We’re so happy that you’re here today,</p>
                <p className="my-0">A special part of a special day.</p>
                <p className="my-0">Silliness and sincerity in equal parts,</p>
                <p className="my-0">Your friendship and love fills our hearts.</p>
                <p className="my-0">Whether we’ve known you for days or years,</p>
                <p className="mt-0 mb-2">Please raise your cup and shout out - Cheers!</p>
                <img src={goldenHeart} alt="heart" className="w-20vw mx-auto my-3" />
                <img src={goldenHeart} alt="heart" className="w-10vw mx-auto my-3" />
                <img src={goldenHeart} alt="heart" className="w-5vw mx-auto my-3" />
            </div>
            <img src={HeartPhoto} alt="heart" className="w-100" />
            <div className="my-5" />
        </div>
    )
}

export default Heart;