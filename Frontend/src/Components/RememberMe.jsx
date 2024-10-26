// src/components/RememberMe.jsx

import React, { useState } from 'react';
import CheckboxWithLabel from './CheckboxWithLabel';

const RememberMe = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        // You can add logic to save this preference, e.g., in local storage
        if (event.target.checked) {
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('rememberMe');
        }
    };

    // Check local storage when the component mounts
    React.useEffect(() => {
        const rememberMe = localStorage.getItem('rememberMe');
        if (rememberMe) {
            setIsChecked(true);
        }
    }, []);

    return (
        <div>
            <CheckboxWithLabel
                checked={isChecked}
                onChange={handleCheckboxChange}
                label="Remember Me"
            />
        </div>
    );
};

export default RememberMe;
