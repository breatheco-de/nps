import React, {useState} from "react";
import Button from "../Button";
import TextArea from "../TextArea";
import strings from "../../helper/strings";

const ConfirmSend = ({ onSubmit, lang, label, className }) => {

    const [confirm, setConfirm] = useState();

    return <>
        {!confirm ? 
            <Button className={`p-4 ${className}`} icon="arrow" variant="primary" onClick={() => setConfirm(true)}>
                <Button.Label className="question">
                    {label}
                </Button.Label>
            </Button> 
            :
            <Button className={`${className} p-4`} icon="arrow" variant="primary">
                <Button.Label className="confirmation">
                    {strings[lang]["Are you sure about your answer?"]}
                </Button.Label>
                <Button.HoverLayer className="visible">
                    <Button.Label icon="check-mark" className="pt-1 pl-3 pr-3 bg-success-light" onClick={e => {
                        onSubmit(true); setConfirm(false);
                    }}>
                        {strings[lang]["yes"]}
                    </Button.Label>
                    <Button.Label icon="fix" iconColor="red" className="pt-1 pl-3 pr-3 bg-danger-light" onClick={() => setConfirm(false)}>
                        {strings[lang]["no"]}
                    </Button.Label>
                </Button.HoverLayer>
            </Button>}
    </>
}
export default ConfirmSend;