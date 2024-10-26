// src/components/CheckboxWithLabel.jsx
import PropTypes from 'prop-types';


const CheckboxWithLabel = ({ checked, onChange, label }) => {
    return (
        <label style={{ display: 'flex', alignItems: 'center' }}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                style={{ marginRight: '8px' }}
            />
            {label}
        </label>
    );
};
CheckboxWithLabel.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
};

export default CheckboxWithLabel;

