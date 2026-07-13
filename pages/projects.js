import AnimatedLetters from '@/components/AnimatedLetters';
import ProjectModal from '@/components/ProjectModal';
import projects from '@/data/projects.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const [modalOpen, setModalOpen] = useState(false);
    const [activeProject, setActiveProject] = useState(null);
    const titleArray = ['R', 'e', 'c', 'e', 'n', 't', ' ', 'P', 'r', 'o', 'j', 'e', 'c', 't', 's']

    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const content = contentRef.current;
    const container = containerRef.current;
    
    useEffect(() => {
        let timeoutId = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)
        
        return () => {
            clearTimeout(timeoutId)
        }
    }, []);


    useEffect(() => {
        const ctx = gsap.context(() => {

            ScrollTrigger.config({ 
                ignoreMobileResize: true 
            });

            gsap.to(content, {
                    y: () => -(content.scrollHeight - container.offsetHeight),
                    ease: "none",
                    scrollTrigger: {
                        trigger: container,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 2,
                        invalidateOnRefresh: true,
                    }
                });
            });

        return () => ctx.revert();
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
                        From concept to creation <br/> Discover my capabilities through past work.
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
                                    <Image src={ record.image } alt="Project-Images" className="project-image" width={1280} height={720}/>
                                    <div className="text">
                                        <div className="title">{ record.title }</div>
                                        <div className="subtitle">
                                            <div className="date">{ record.date }</div>
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