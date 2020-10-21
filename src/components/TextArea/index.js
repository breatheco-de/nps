import React from "react";
import "./style.scss";

const SmartTextArea = (props) => {
    return (
        <div className="smart-text-area">
            <textarea {...props} />
        </div>
    );
}

export default SmartTextArea;