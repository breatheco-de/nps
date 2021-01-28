import React from "react"
import PropTypes from 'prop-types'
import { IconContext } from "react-icons"
import { IoLogoGithub } from "react-icons/io"
import { FcCollaboration, FcHome, FcGraduationCap, FcSettings, FcBriefcase, FcButtingIn, FcCheckmark } from "react-icons/fc";
import { FiArrowRightCircle,FiX } from "react-icons/fi";
import { BsArrowRight,BsArrowDown, BsArrowLeft } from "react-icons/bs";
export const icons = {
    'github': IoLogoGithub,
    'collaboration': FcCollaboration,
    'home': FcHome,
    'academy': FcGraduationCap,
    'settings': FcSettings,
    'profile': FcButtingIn,
    'briefcase': FcBriefcase,
    'arrow-right': FiArrowRightCircle,
    'arrow': BsArrowRight,
    'arrow-left': BsArrowLeft,
    'check-mark': FcCheckmark,
    "arrow-down": BsArrowDown,
    "fix":FiX
}
export const sizes = {
    xs: '90%',
    md: '130%',
    lg: '200%'
}
const Icon = ({ name, size, color, ...rest }) => {

    //only the specific icons
    if(icons[name] === undefined) return "?";

    const TheIcon = icons[name]
    return <IconContext.Provider value={{ color, className: "icon" }}>
    <>
        <TheIcon {...rest} style={{ fontSize: sizes[size] }}  />
    </>
    </IconContext.Provider>
}
Icon.propTypes = {
  size: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
};
Icon.defaultProps = {
   size: 'md',
   name: null,
   color: 'blue',
};
export default Icon