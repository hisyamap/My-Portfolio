import Sidebar from './Sidebar'
import { faRocket} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpaceAwesome } from '@fortawesome/free-brands-svg-icons';
import Loader from './Loader';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const Layout = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 700);
        return () => clearTimeout(timer);
    }, [pathname]);

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

                    { children }

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