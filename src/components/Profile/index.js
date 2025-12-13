import { Link } from 'react-router-dom';
import './index.scss';
import HisyamCharacter from '../../assets/images/Hisyam-Character.gif';
import AnimatedLetters from '../AnimatedLetters'
import { useEffect, useState } from 'react';

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const hiArray = ['H', 'i', ' ', 't', 'h', 'e', 'r', 'e', ',']
    const introArray = ['M', 'y', ' ', 'n', 'a', 'm', 'e', ' ', 'i', 's', ' ']
    const nameArray = ['H', 'i', 's', 'y', 'a', 'm', ' ', 'A', 'd', 'e', 'l', 'i', 'o', ' ', 'P', 'r', 'a', 'd', 'i', 'p', 't', 'a']
    const jobArray = [' ', 'a', ' ', 'G', 'a', 'm', 'e', ' ', '&', ' ', 'F', 'u', 'l', 'l', '-', 'S', 't', 'a', 'c', 'k', ' ', 'D', 'e', 'v', 'e', 'l', 'o', 'p', 'e', 'r']

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)
        
        return () => {
                    clearTimeout(timeoutId)
                }
    }, [])

    return (
        <div className="container home-page">
            <div className="text-zone">
                <h1>
                    <AnimatedLetters letterClass={letterClass} strArray={hiArray} idx={11}/>
                    <br />
                    <AnimatedLetters letterClass={letterClass} strArray={introArray} idx={18}/>
                    <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={28}/>
                </h1>
                <h2>
                    <span className={`${letterClass} _18`}>I</span>
                    <span className={`${letterClass} _19`}>'</span>
                    <span className={`${letterClass} _20`}>m</span>
                    <AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={21}/>
                </h2>
                <h3>
                    Utilizing a strong foundation in programming and design principles, I have successfully delivered projects for major organizations, including an educational game development project for Universitas Muhammadiyah Purwokerto and a web development project for the Indonesian Railways Company.
                </h3>
                <Link to="/contact" className="flat-button">Contact Me</Link>
            </div>
            <div className='img-zone'>
                <img src={HisyamCharacter} alt="Hisyam Character" className="character"></img>
            </div>
        </div>
    )
}

export default Home;