import React from 'react';
import Select, { components } from 'react-select';
import Icon from "../Icons";
import styles from './style.scss';
import PropTypes from 'prop-types';


const SmartDropdown = (props) => {
    const setColor = (customColor="white") => {
        let color = customColor;
        switch (color) {
            case "primary":
                color = "#4285ff"
                break;
            case "success":
                color = "#27AE60"
                break;
            case "danger":
                color = "#E43939"
                break;
            default:
                break;
        }
        return color;
    }
    const customTheme = theme => ({
        ...theme,
        marginTop: 0,
        paddingTop: 0,
        colors: {
            ...theme.colors,
            primary25: 'rgba(196, 196, 196, 0.19)',
            primary: 'rgba(196, 196, 196, 0.19)',
        },
        fontSize:"16px",
        ...props.theme
    })
    const customStyles = {
        ...styles,
        control: base => ({
            ...base,
            borderRadius: 10,
            '&:hover': { borderColor: 'gray' },
            border: '1px none #FBFBFB',
            fontSize:"16px",
            boxShadow:"0px 1px 3px 0px rgba(0, 0, 0, 0.4)",
            zIndex:999
        }),
        menu: styles => ({
            ...styles,
            margin: 0,
            padding: 0,
            top: "75%",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            backgroundColor:setColor(props.variant || "white")
        }),
        placeholder : (styles) =>({
            ...styles,
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "18px",
            lineHeight: "24px",
            color: "black"
        }),
        option : (styles) =>({
            ...styles,
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "18px",
            lineHeight: "24px",
            color: "black"
        }),
        input : (styles) =>({
            ...styles,
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "18px",
            lineHeight: "24px",
            color: "black"
        }),
        singleValue : (styles) =>({
            ...styles,
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "18px",
            lineHeight: "24px",
            color: "black"
        }),
        noOptionsMessage : (styles) =>({
            ...styles,
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "16px",
            lineHeight: "24px",
            color: "black"
        }),
        ...props.styles
    }
    const { icon } = props;
    return (
        <div className="smart-dropdown shadow-one">
            <Select
                components={{
                    DropdownIndicator: (props) => {
                        return (
                            <components.DropdownIndicator {...props}>
                                <Icon name={icon} size='md' color="#4285ff"/>
                            </components.DropdownIndicator>
                        );
                    }, IndicatorSeparator: () => null, ...props.components
                 }}
                {...props}
                variant="primary"
                theme={customTheme}
                styles={customStyles}
            />
        </div>
    )
}

SmartDropdown.propTypes = {
    styles: PropTypes.object,
    theme: PropTypes.object,
    variant: PropTypes.string,
    icon: PropTypes.string
}

SmartDropdown.defaultProps = {
    styles: null,
    theme: null,
    icon: "arrow-down"
}

export default SmartDropdown; 