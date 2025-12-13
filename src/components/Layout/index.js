import './index.scss';
import Sidebar from '../Sidebar'
import { Outlet } from 'react-router-dom';
import { faRocket} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpaceAwesome } from '@fortawesome/free-brands-svg-icons';


const Layout = () => {
    return (
    <div className="App">
        <Sidebar />
        <div className="page">
            <span className="elements top-elements">
                <FontAwesomeIcon icon={faSpaceAwesome} />
            </span>
            <Outlet />
            <span className="elements bottom-elements">
                <FontAwesomeIcon icon={faRocket} />
            </span>
        </div>
    </div>
    )
}

export default Layout;