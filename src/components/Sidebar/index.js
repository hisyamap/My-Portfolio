import './index.scss';
import HisyamLogo from '../../assets/images/Hisyam-Logo.png';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox, faListCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import { faSquareGithub, faSquareInstagram, faSquareLinkedin } from '@fortawesome/free-brands-svg-icons';

const Sidebar = () => (
    <div className='nav-bar'>
        <Link className='logo' to=''>
            <img src={HisyamLogo} alt=""></img>
        </Link>
        <nav>
            <NavLink exact="true" activeclassname="active" className="about-link" to="/">
                <FontAwesomeIcon icon={faUser} />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="projects-link" to="/projects">
                <FontAwesomeIcon icon={faListCheck} />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="contact-link" to="/contact">
                <FontAwesomeIcon icon={faInbox} />
            </NavLink>
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
)

export default Sidebar;