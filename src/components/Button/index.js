import React,{useState, useEffect} from "react"
import { Button } from "react-bootstrap";
import Icon from "../Icons";
import  './style.scss';
import PropTypes from 'prop-types';

const SmartButton = ({ children, variant, onClick, icon, to, className,onHover, ...rest }) => {
     
     return(
         <>
             {
                 to ? 
                    <a href={to} className={`${!onHover ? "": "btn-outline-" + variant} shadow-one btn ${className}`} {...rest}>
                          {children}
                        <Icon name={icon} size='md' />
                    </a> 
                   :
                <Button variant={`${!onHover ? "":  variant} shadow-one btn ${className}`} onClick={onClick} {...rest}>
                    {children}
                    {icon ? <Icon name={icon} size='md' /> : ""}
                </Button> 
             }
         </>
        
    )
}

SmartButton.HoverLayer = ({children, variant = "", ...rest}) => <div className={`hover-layer ${variant}`} {...rest}>{children}</div>
SmartButton.Label = ({children, icon, variant = "",iconColor, ...rest}) => <>{icon ? <div className={`label-content ${variant}`} {...rest}><div><Icon name={icon} size='md' color={iconColor} /></div><label>{children}</label></div> : <label className={`button-label ${variant}`} {...rest}>{children}</label>}</>
SmartButton.Section = ({children, variant = "", ...rest}) => <div className={`button-section ${variant}`} {...rest}>{children}</div>

SmartButton.propTypes = {
    variant: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
    icon: PropTypes.string,
    to: PropTypes.string,
    className: PropTypes.string,
    onHover: PropTypes.bool,
    iconColor:PropTypes.string
};

SmartButton.defaultProps = {
    variant: 'primary-light',
    children: null,
    to:null,
    className: "",
    onHover: true
};

export default SmartButton;