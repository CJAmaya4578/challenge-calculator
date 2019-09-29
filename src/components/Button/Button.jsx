import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'

const Button = ({value, type, text, onClick}) => (
    <button type={type} onClick={onClick} value={value}>
        {text || value}
    </button>
);

Button.defaultProps = {
    type: "button",
    value: "",
    text: "",
};

Button.propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;
