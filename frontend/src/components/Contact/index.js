import './index.scss';
import checkIcon from '../../assets/icons/circle-check-solid-full.svg';
import exclamationIcon from '../../assets/icons/circle-exclamation-solid-full.svg';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AnimatedLetters from '../AnimatedLetters';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Slide, toast, ToastContainer } from 'react-toastify';

const Contact = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const titleArray = ['L', 'e', 't ', `'` , 's', ' ', 'C', 'o', 'l', 'l', 'a', 'b', 'o', 'r', 'a', 't', 'e']
    const basedArray = ['I', `'`, 'm', ' ', 'b', 'a', 's', 'e', 'd', ' ', 'i', 'n', ' ', 'B', 'o', 'g', 'o', 'r', ',', ' ', 'I' ,'n', 'd', 'o', 'n', 'e', 's', 'i', 'a']
    const form = useRef()

    const sendEmail = async (event) => {
        event.preventDefault();

        const formData = {
            name: form.current.name.value,
            email: form.current.email.value,
            subject: form.current.subject.value,
            message: form.current.message.value
        }
        
        try {
            console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/send-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Failed to send");
            }

            
            toast(result.message, {
                position: 'top-center',
                transition: Slide,
                closeButton: false,
                closeOnClick: true,
                pauseOnHover: false,
                pauseOnFocusLoss: false,
                className: 'message-toast',
                progressClassName: 'message-progress-bar',
                icon: () => <img src={checkIcon} alt="checklist icon"/>
            });
        
            form.current.reset();
        } catch (error) {
            toast(error.message || "Failed to send a message", {
                position: 'top-center',
                transition: Slide,
                closeButton: false,
                closeOnClick: true,
                pauseOnHover: false,
                pauseOnFocusLoss: false,
                className: 'message-toast',
                progressClassName: 'message-progress-bar',
                icon: () => <img src={exclamationIcon} alt="exclamation icon"/>
            });
        }
    };

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)
        
        return () => {
            clearTimeout(timeoutId)
        }
    }, [])

    return (
        <div className="container contact-page">
            <div className="text-zone">
                <h1>
                    <AnimatedLetters letterClass={letterClass} strArray={titleArray} idx={11}/>
                </h1>
                <h2>    
                    <AnimatedLetters letterClass={letterClass} strArray={basedArray} idx={11}/>
                </h2>
                <h3 className="contact-me">
                    Feel free to send me a message if you have any questions. <br/>
                    I'm currently available for game and web development commissions. <br/> 
                    For project inquiries, please email me at: <br/> 
                    <a target="_blank" rel="noreferrer" href="mailto:hisyamadeliop@gmail.com">
                        <FontAwesomeIcon icon={faEnvelope} /> hisyamadeliop@gmail.com
                    </a>
                </h3>
            </div>
            <div className='form-zone'>
                <form ref={form} onSubmit={sendEmail} autoComplete="off">
                    <ul>
                        <li>
                            <input type="text" name="name" placeholder="Name" required />
                        </li>
                        <li>
                            <input type="email" name="email" placeholder="Email" required />
                        </li>
                        <li>
                            <input type="text" name="subject" placeholder="Subject" required />
                        </li>
                        <li>
                            <textarea name="message" placeholder="Message" required />
                        </li>
                    </ul>
                    <input type="submit" className="form-button" value="Send Message"/>
                </form>
            </div> 
            <ToastContainer />
        </div>
    )
}

export default Contact;