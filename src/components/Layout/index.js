import './index.scss';
import Sidebar from '../Sidebar'
import { Outlet, useLocation } from 'react-router-dom';
import { faRocket} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpaceAwesome } from '@fortawesome/free-brands-svg-icons';
import Loader from '../Loader';
import { useEffect, useState } from 'react';

const Layout = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
    <div className="App">
        <Sidebar />
        <div className="page-container">
        {loading && <Loader />}
            {!loading && (
                <div className="page">
                    <span className="elements top-elements">
                    <FontAwesomeIcon icon={faSpaceAwesome} />
                    </span>

                    <Outlet />

                    <span className="elements bottom-elements">
                    <FontAwesomeIcon icon={faRocket} />
                    </span>
                </div>
            )}
        </div>
    </div>
    )
}

export default Layout;