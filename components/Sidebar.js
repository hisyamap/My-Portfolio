import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox, faLayerGroup, faListCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import { faSquareGithub, faSquareInstagram, faSquareLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Sidebar() {
    const currentPath = usePathname();

    return (
        <div className='nav-bar'>
            <Link className='logo' href=''>
                <Image src="/assets/images/Hisyam-Logo.png" alt="hisyam-logo" width={66} height={134}/>
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
            <div className='social'>
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