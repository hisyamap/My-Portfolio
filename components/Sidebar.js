import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox, faLayerGroup, faListCheck, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { faSquareGithub, faSquareInstagram, faSquareLinkedin } from '@fortawesome/free-brands-svg-icons';
import gsap from 'gsap';
import { useState, useRef, useEffect } from 'react';

export default function Sidebar() {
    const currentPath = usePathname();
    const [showSocial, setShowSocial] = useState(false);
    const socialRef = useRef(null);

    useEffect(() => {
        const mobileView = window.innerWidth < 1200;

        if (mobileView){
            if (showSocial) {
                gsap.to(socialRef.current, {
                    duration: 0.5,
                    opacity: 1,
                    y: 0,
                    display: 'flex',
                    ease: 'bounce.out',
                });
            } else {
                gsap.to(socialRef.current, {
                    duration: 0.3,
                    opacity: 0,
                    y: -20,
                    display: 'none',
                    ease: 'power2.in'
                });
            }
        } else {
            gsap.set(socialRef.current, { clearProps: 'all' });
        }
    }, [showSocial]);

    return (
        <div className='nav-bar'>
            <Link className='logo' href=''>
                <Image src="/assets/images/Hisyam-Logo.png" className='logo' alt="hisyam-logo" width={66} height={134}/>
            </Link>
            <nav>
                <Link exact="true" id="about-link" className={`menu-item ${currentPath == "/" ? "active" : ""}`} href="/">
                    <FontAwesomeIcon icon={faUser} />
                </Link>
                <Link exact="true" id="skills-link" className={`menu-item ${currentPath == "/skills" ? "active" : ""}`} href="/skills">
                    <FontAwesomeIcon icon={faLayerGroup} />
                </Link>
                <Link exact="true" id="projects-link" className={`menu-item ${currentPath == "/projects" ? "active" : ""}`} href="/projects">
                    <FontAwesomeIcon icon={faListCheck} />
                </Link>
                <Link exact="true" id="contact-link" className={`menu-item ${currentPath == "/contact" ? "active" : ""}`} href="/contact">
                    <FontAwesomeIcon icon={faInbox} />
                </Link>
            </nav>
            <FontAwesomeIcon onClick={() => setShowSocial(!showSocial) } icon={faBars} className={`hamburger-icon ${showSocial ? "active" : ""}`}/>
            <div className="social" ref={socialRef}>
                <a target="_blank" rel="noreferrer" href="https://github.com/hisyamap">
                    <FontAwesomeIcon icon={faSquareGithub} />
                </a>
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/hisyamap/">
                    <FontAwesomeIcon icon={faSquareLinkedin} />
                </a>
                <a target="_blank" rel="noreferrer" href="https://www.instagram.com/hisyam_adelio/">
                    <FontAwesomeIcon icon={faSquareInstagram} />
                </a>
            </div>
        </div>
    );
}