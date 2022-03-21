import {motion} from 'framer-motion/dist/framer-motion'
import {HiX} from 'react-icons/hi';
import "./sidebar.css"

const Sidebar = (props) => {
    const {setToggle} = props;
    return(
        <motion.div className="sidebar">
            <HiX onClick={() => setToggle(false)} className="sidebar-close"/>
            <ul>
                {['Transfer-Client', 'History', 'End-Chat', 'Send-Document', 'View-Info'].map((item) => (
                    <li key={item}>
                        <a href={`#${item}`} onClick={() => setToggle(false)}>
                            {item}
                        </a>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

export default Sidebar;