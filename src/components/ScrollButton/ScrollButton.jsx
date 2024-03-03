import './scrollButton.css'
import { FaArrowUp } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const ScrollButton = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        });
    }, []);

    const goTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            className={`scroll-button ${isVisible ? 'visible' : ''}`}
            onClick={goTop}
        >
            <FaArrowUp />
        </button>
    );
}

export default ScrollButton;