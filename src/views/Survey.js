import React, { useState, useEffect } from 'react';
import Button from "../components/Button";
import TextArea from "../components/TextArea";
import strings from "../helper/strings";
import Dropdown from '../components/Dropdown';
import { Alert } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import {getQuestion, sendVote} from "../actions"
import getParam from "../helper/getUrlParameter"

function App() {
    const [select, setSelect] = useState(0);
    const [send, setSend] = useState(false);
    const [comment, setComment] = useState("");
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [focused, setFocused] = useState(-1);
    const { id } = useParams();
    const [question, setQuestion] = useState({ lang: "en"});
    const [msg, setMsg] = useState({ text: "", type: null });

    useEffect(() => {
        if(!getParam("token", null)) setMsg({ text: "Please specify a valid token", type: "error" });
        else{
            getQuestion(id)
                .then(data => setQuestion({ message: data.title, lowest: data.lowest, highest: data.highest, lang: data.lang }))
                .catch(error => setMsg({ text: error.message || error, type: "error" }))
        }
    }, []);


    const checkSubmit = () =>{
        if(select === 0 ) setMsg({ text: "Please pick a number from 1 to 10", type: null , inner: true});
        else setSend(true);
    }
 
    if(msg.type) return <div className="container">
        <Alert variant={msg.type === "error" ? "danger" : "success"} className="shadow-one mt-4 d-flex">{msg.text}</Alert>
    </div>;

    return (<form className="container">
        { msg.inner &&
            <Alert variant="danger" className="shadow-one mt-4 d-flex">
                {msg.text}
            </Alert>
        }
        <div className="row text-center mt-4">
            <div className="col-md-12 col-12">
                <h1>{question.message}</h1>
            </div>
        </div>
        <div className="row text-center mt-5 d-md-none">
            <div className="col-12">
                <Dropdown
                    options={options.reverse().map(number => ({ 
                        value: number, 
                        label: number == 1 ? `${number} - ${question.lowest}` : number === options.length ? `${number} - ${question.highest}` : number 
                    }))}
                    onChange={(e) => setSelect(e.value)}
                />
            </div>
        </div>
        <div className="row text-center mt-5 d-none d-md-flex">
            <div className="col-1 col-lg-2 text-right pt-3">
                {question.highest}
            </div>
            <div className="col-md-10 col-lg-8">
                {
                    options.map((number, index) => 
                        <Button key={index} className={`ml-3 mt-2 ${focused >= index ? "bg-primary" : ""}`} 
                            onClick={() => { setFocused(number - 1); setSelect(number); setMsg({...msg, inner:false}) }}
                        >
                            {number}
                        </Button>)
                }
            </div>
            <div className="col-1 col-lg-2 text-left pt-3">
                {question.lowest}
            </div>
        </div>

        <div className="row text-center mt-4">
            <div className="col-12">
                <h2>{strings[question.lang]["Additional Comments"]}</h2>
                <TextArea
                    id="comments"
                    name="comments"
                    rows="4"
                    placeholder={strings[question.lang]["Put your thoughts here..."]}
                    onChange={e => setComment(e.target.value)}
                    value={comment}
                    required
                />
            </div>
        </div>
        <div className="row text-center mt-4">
            <div className="col-12">
                {!send ? <Button className="w-100 p-4" icon="arrow" variant="primary" onClick={() => checkSubmit()}>
                    <Button.Label className="question">
                        {strings[question.lang]["Send answer"]}
                    </Button.Label>
                </Button> :
                    <Button className="w-100 p-4" icon="arrow" variant="primary">
                        <Button.Label className="confirmation">
                            {strings[question.lang]["Are you sure about your answer?"]}
                        </Button.Label>
                        <Button.HoverLayer className="visible">
                            <Button.Label icon="check-mark" className="pt-1 pl-3 pr-3 bg-success-light" onClick={e => 
                                sendVote({ score: select, comment, id })
                                    .then(success => setMsg({ text: "😁 Thank you for your feedback!", type: "success" }))
                                    .catch(error => setMsg({ text: error.message || error, type: "error" }))
                            }>
                                {strings[question.lang]["yes"]}
                            </Button.Label>
                            <Button.Label icon="fix" iconColor="red" className="pt-1 pl-3 pr-3 bg-danger-light" onClick={() => { setSend(false) }}>
                                {strings[question.lang]["no"]}
                            </Button.Label>
                        </Button.HoverLayer>
                    </Button>}
            </div>
        </div>
        </form>
    );
}

export default App;
