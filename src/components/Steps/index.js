import React from "react";
import "./style.css";

const Steps = ({ steps, onClick, currentIndex }) => {
    return <ul className="list-unstyled multi-steps mt-4">
        {Array.isArray(steps) && steps.length > 1 && steps.map((step, i) => 
            <li className={currentIndex == i ? "is-active" : ""}>
                <a onClick={() => onClick(step)} aria-controls="discover" role="tab" data-toggle="tab">
                    {steps.icon && <i className={step.icon} aria-hidden="true"></i>}
                    {steps.label && <p>{step.label}</p>}
                </a>
            </li>
        )}
    </ul>
}
export default Steps;