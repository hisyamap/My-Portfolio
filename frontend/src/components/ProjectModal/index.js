import './index.scss';
import Modal from 'react-modal';

const ProjectModal = ({ isOpen, project, onClose }) => {
    return (    
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="project-modal"
            overlayClassName="project-modal-overlay"
            closeTimeoutMS={200}
        >
            {project && (
                <>
                    <button className="close" onClick={onClose}>×</button>

                    <img src={project.image} alt={project.name} />
                    
                    <h1>{project.name}</h1>

                    <h2>Tech Stack</h2>

                    {project.stack && project.stack.map((tech) => (
                        <span key={tech} className="tech">
                            {tech}
                        </span>
                    ))}

                    <h2>Overview</h2>
                    <p>{project.description}</p>
                </>
            )}
        </Modal>
    )
}

export default ProjectModal;
