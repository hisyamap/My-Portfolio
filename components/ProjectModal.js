import Image from 'next/image';
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

                    <Image src={project.image} alt={project.name} className="modal-image" width={1280} height={720}/>
                    
                    <h1>{project.name}</h1>

                    <h2>Tech Stack</h2>

                    <div className="stack">
                        {project.stack && project.stack.map((tech) => (
                            <span key={tech} className="tech">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <h2>Overview</h2>
                    <p>{project.description}</p>
                </>
            )}
        </Modal>
    )
}

export default ProjectModal;
