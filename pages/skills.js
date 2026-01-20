import AnimatedLetters from '@/components/AnimatedLetters';
import skills from '@/data/skills.json'
import { useEffect, useState } from 'react';

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const titleArray = ['M', 'y', ' ', 'S', 'k', 'i ', 'l', 'l', 's', ' ', '&', ' ', 'T', 'e', 'c', 'h', ' ', 'S', 't', 'a', 'c', 'k','s']

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
                    <AnimatedLetters letterClass={letterClass} strArray={titleArray} idx={11}/>
                </h1>
                <h3>
                    Here's an overview of the tools I've mastered and the stacks I use frequently in my projects. I don't just write code, I design with purpose using a solid understanding of design theory that allows me to create my own website design. I also create animations for my 2D games that enhance the game-feel and player feedback.
                </h3>
            </div>
            <div className="skills-zone">
                <div className="content">
                    { 
                        skills && skills.map(record => {
                            return (
                                <div className="skills-card" key={ record.id }>
                                    <div className="card-container">
                                        <div className="text">
                                            <div className="title">{ record.title }</div>
                                            {record.stack && record.stack.map((tech) => (
                                                <div key={tech} className="tech">
                                                    {tech}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;