import Link from 'next/link';
import Image from 'next/image';
import AnimatedLetters from '@/components/AnimatedLetters';
import { useEffect, useState } from 'react';

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const hiArray = ['H', 'i', ' ', 't', 'h', 'e', 'r', 'e', ',']
    const nameArray = [' ', 'H', 'i', 's', 'y', 'a', 'm', ' ', 'A', 'd', 'e', 'l', 'i', 'o', ' ', 'P', 'r', 'a', 'd', 'i', 'p', 't', 'a']
    const jobArray = [' ', 'a', ' ', 'F', 'u', 'l', 'l', 's', 't', 'a', 'c', 'k',  ' ', '&', ' ', 'G', 'a', 'm', 'e', ' ', 'D', 'e', 'v', 'e', 'l', 'o', 'p', 'e', 'r']

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)
        
        return () => {
            clearTimeout(timeoutId)
        }
    }, [])

    return (
        <div className="container profile-page">
            <div className="text-zone">
                <h1>
                    <AnimatedLetters letterClass={letterClass} strArray={hiArray} idx={11}/>
                    <br />
                    <span className={`${letterClass} _18`}>I</span>
                    <span className={`${letterClass} _19`}>'</span>
                    <span className={`${letterClass} _20`}>m</span>
                    <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={21}/>
                </h1>
                <h2>
                    <span className={`${letterClass} _18`}>I</span>
                    <span className={`${letterClass} _19`}>'</span>
                    <span className={`${letterClass} _20`}>m</span>
                    <AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={21}/>
                </h2>
                <h3>
                    Utilizing a strong foundation in programming and design principles, I have successfully delivered projects for major organizations, including an educational game development project for Muhammadiyah University of Purwokerto and a web development project for Indonesian Railways Company.
                </h3>
                <Link href="/contact" className="flat-button">Contact Me</Link>
            </div>
            <div className='img-zone'>
                <Image src="/assets/images/Hisyam-Character.gif" alt="Hisyam Character" className="character" width={600} height={600} />
            </div>
        </div>
    )
}

export default Home;