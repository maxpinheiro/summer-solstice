import React, {useEffect} from 'react';
import scale from '../../media/scale.png';
import yinYang from '../../media/yinYang.png';

const Today = () => {
        useEffect(() => {document.title = 'Today | Solstice 2021'});
    return (
        <div className="container calibri text-center text-5/6rem">
            <img src={scale} alt="scale" className="w-40vw mx-auto my-3" />
            <p className="my-0">As you are aware, hopefully, today is June 19th.</p>
            <p className="my-0">Juneteenth is a holiday celebrating the emancipation</p>
            <p className="my-0">of those who had been enslaved in the United States.</p>
            <p className="my-0">Originating in Galveston, Tx,</p>
            <p className="my-0">it is now celebrated throughout the United States.</p>
            <p className="my-0">It is commemorated on the anniversary of the June 19, 1865</p>
            <p className="my-0">announcement by Union Army general Granger,</p>
            <p className="my-0">proclaiming and enforcing freedom from slavery in Texas,</p>
            <p className="my-0">(almost two and a half years after President Lincoln's</p>
            <p className="my-0">Emancipation Proclomation had officially outlawed slavery</p>
            <p className="my-0">in the states in rebellion against the Union).</p>
            <div className="my-4" />
            <p className="font-italic my-1">Life is not measured</p>
            <p className="font-italic my-1">by the number of breaths you take,</p>
            <p className="font-italic my-1">but by the moments</p>
            <p className="font-italic my-1">that take your breath away.</p>
            <p className="my-3">- Maya Angelou</p>
            <img src={yinYang} alt="yin-yang" className="w-20vw mx-auto" />
        </div>
    )
}

export default Today;