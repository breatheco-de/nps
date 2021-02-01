import React from "react";
import "./style.scss";

const SmartTextArea = (props) => {
    // const [count, setCount] = React.useState(0);
    const length = props.value && typeof(props.value) == "string" ? props.value.length : 0;
    return (
        <div className="smart-text-area">
            <textarea maxLength={props.maxLength} {...props} />
            <span className={`count ${props.maxLength <= (length+1) ? "text-danger" : props.maxLength < (length+40) ? "text-warning" : "text-black"}`}>
                {props.maxLength < (length+40) && "Remaining: "} {props.maxLength - length}
            </span>
        </div>
    );
}

export default SmartTextArea;