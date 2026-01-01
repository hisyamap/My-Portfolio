import './index.scss';
import AnimatedLetters from '../AnimatedLetters';
import ProjectModal from '../ProjectModal';
import projects from '../../data/projects.json';
import { useEffect, useRef, useState } from 'react';


const Projects = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const [modalOpen, setModalOpen] = useState(false);
    const [activeProject, setActiveProject] = useState(null);
    const titleArray = ['R', 'e', 'c', 'e', 'n', 't', ' ', 'P', 'r', 'o', 'j', 'e', 'c', 't', 's']
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    
    useEffect(() => {
        let timeoutId = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)
        
        return () => {
            clearTimeout(timeoutId)
        }
    }, []);


    useEffect( () => {
        const container = containerRef.current;
        const content = contentRef.current;

        let current = 0;
        let target = 0;
        let maxScroll = 0;

        const ease = 0.025;
        const wheelMultiplier = 0.5;

        const calculateMaxScroll = () => {
            maxScroll = Math.max(0, content.scrollHeight - container.clientHeight);
            target = Math.min(target, maxScroll);
        };

        const onWheel = (e) => {
            e.preventDefault();

            target += e.deltaY * wheelMultiplier;
            target = Math.max(0, Math.min(target, maxScroll));
        };
        
        const smoothScroll = () => {
            current += (target - current) * ease;
            content.style.transform = `translateY(${-current}px)`;
        };

        calculateMaxScroll();

        container.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("resize", calculateMaxScroll);
        gsap.ticker.add(smoothScroll);

        return () => {
            container.removeEventListener("wheel", onWheel);
            window.removeEventListener("resize", calculateMaxScroll);
            gsap.ticker.remove(smoothScroll);
        };
    }, []);

    return (
        <div className="container projects-page">
            <ProjectModal
                isOpen={modalOpen}
                project={activeProject}
                onClose={() => setModalOpen(false)}
            />
            <div className="text-zone">
                <h1>
                    <AnimatedLetters letterClass={letterClass} strArray={titleArray} idx={11}/>
                </h1>
                <h3>
                    Here's my personal and contributed work as a game & full-stack developer
                </h3>
            </div>
            <div className="card-zone" ref={containerRef}>
                <div className="content" ref={contentRef}>
                { 
                    projects && projects.map(record => {
                        return (
                            <div 
                                className="project-card" 
                                key={ record.id } 
                                onClick={() => {
                                    setActiveProject(record);
                                    setModalOpen(true);
                                }}
                            >
                                <div className="card-container">
                                    <img src={ record.image } alt="Project-Images"/>
                                    <div className="text">
                                        <div className="title">{ record.title }</div>
                                        <div className="subtitle">
                                            <div className="stack">{ record.date }</div>
                                            <div className="position">{ record.position }</div>
                                        </div>
                                        <p>{ record.summary }</p>
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

export default Projects;