import './index.scss';
import checkIcon from '../../assets/icons/circle-check-solid-full.svg'
import exclamationIcon from '../../assets/icons/circle-exclamation-solid-full.svg'
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AnimatedLetters from '../AnimatedLetters'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import emailjs from '@emailjs/browser';
import { Slide, toast, ToastContainer } from 'react-toastify';

const Contact = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const titleArray = ['L', 'e', 't ', `'` , 's', ' ', 'C', 'o', 'l', 'l', 'a', 'b', 'o', 'r', 'a', 't', 'e']
    const basedArray = ['I', `'`, 'm', ' ', 'b', 'a', 's', 'e', 'd', ' ', 'i', 'n', ' ', 'B', 'o', 'g', 'o', 'r', ',', ' ', 'I' ,'n', 'd', 'o', 'n', 'e', 's', 'i', 'a']
    const form = useRef()

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
        .sendForm('service_tasbdkr', 'template_ihnhlrz', form.current, {
            publicKey: 'X1qdEoGZorPs5NLKw',
        })
        .then(
            () => {
                toast("Message sent successfully!", {
                    position: 'top-center',
                    transition: Slide,
                    closeButton: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    pauseOnFocusLoss: false,
                    className: 'message-toast',
                    progressClassName: 'message-progress-bar',
                    icon: () => <img src={checkIcon}/>
                });
            },
            () => {
                toast("Failed to send a message", {
                    position: 'top-center',
                    transition: Slide,
                    closeButton: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    pauseOnFocusLoss: false,
                    className: 'message-toast',
                    progressClassName: 'message-progress-bar',
                    icon: () => <img src={exclamationIcon}/>
                });
            },
        );
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
                    Feel free to send me a message through the form if you have any questions. <br/>
                    I am currently available for game and web development commissions. <br/> 
                    For project inquiries, please email me at: <br/> 
                    <a target="_blank" rel="noreferrer" href="https://mail.google.com/mail/u/0/#inbox?compose=DmwnWrRtsfhbrhtcFPRqNXzbhlnszWzmmJKrHccJHwJqgwwWjBBbnbhTjWmNbdqGJWGjJBJmhcfG">
                        <FontAwesomeIcon icon={faEnvelope} /> hisyamadeliop@gmail.com
                    </a>
                </h3>
            </div>
            <div className='form-zone'>
                <form ref={form} onSubmit={sendEmail} autocomplete="off">
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