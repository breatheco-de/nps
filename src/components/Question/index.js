import React, { useState, useEffect } from 'react';
import Button from "../Button";
import TextArea from "../TextArea";
import strings from "../../helper/strings";
import Dropdown from '../Dropdown';
import { Alert } from 'react-bootstrap';
import { useParams } from "react-router-dom";

const options = {
    desktop: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    mobile: [10,9,8,7,6,5,4,3,2,1]
} 

function Question({ question, onChange }) {
    const [focused, setFocused] = useState(-1);

    console.log("internal qustion", question)
    useEffect(() => {
        if(parseInt(question.score)) setFocused(question.score - 1);
    }, question.score)

    return (<div>
        <div className="row text-center mt-4">
            <div className="col-md-12 col-12">
                <h1>{question.message}</h1>
            </div>
        </div>
        <div className="row text-center mt-4 d-md-none">
            <div className="col-12">
                <Dropdown
                    options={options.mobile.map(number => ({ 
                        value: number, 
                        label: number == 1 ? `${number} - ${question.lowest}` : number === options.mobile.length ? `${number} - ${question.highest}` : number 
                    }))}
                    defaultValue={{ value: question.score, label: question.score }}
                    onChange={(e) => onChange({ ...question, score: e.value })}
                />
            </div>
        </div>
        <div className="row text-center mt-4 d-none d-md-flex" style={{ justifyContent: "center" }}>
            <div className="col-1 col-lg-2 text-right pt-3">
                {question.lowest}
            </div>
            <div className="col-md-10 col-lg-8" style={{ maxWidth: "570px" }}>
                {
                    options.desktop.map((number, index) => 
                        <Button key={index} className={`ml-3 mt-2 ${focused >= index ? "bg-primary text-white" : ""}`} 
                            onClick={() => { setFocused(number - 1); onChange({ ...question, score: number }); }}
                        >
                            {number}
                        </Button>)
                }
            </div>
            <div className="col-1 col-lg-2 text-left pt-3">
                {question.highest}
            </div>
        </div>

        <div className="row text-center mt-3 mb-2">
            <div className="col-12">
                <TextArea
                    id="comments"
                    name="comments"
                    rows="4"
                    placeholder={strings[question.lang]["Put your thoughts here..."]}
                    onChange={e => onChange({ ...question, comment: e.target.value })}
                    value={question.comment}
                    required
                />
            </div>
        </div>
        </div>
    );
}

export default Question;
