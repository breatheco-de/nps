import React, { useState, useEffect } from 'react';
import Question from '../components/Question';
import { Alert } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import {getSurvey, getQuestion, sendVote} from "../actions"
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import strings from "../helper/strings"
import getParam from "../helper/getUrlParameter"
import ConfirmSend from "../components/ConfirmSend";
import Steps from "../components/Steps";
import SmartButton from "../components/Button";
import { Button } from "react-bootstrap";
import Icon from "../components/Icons";

function App() {
    const { survey_id, answer_id } = useParams();
    const [questions, setQuestions] = useState(null);
    const [currentIndex, setcurrentIndex] = useState(0);
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        if(!getParam("token", null)) window.location.href = `${process.env.REACT_APP_API_HOST}/auth/view/login?url=${window.location.href.split('?')[0]}`
        else{
            if(parseInt(survey_id)) getSurvey(survey_id)
                .then(data => {
                    setQuestions(data.map(q => ({ message: q.title, ...q })))
                    setMsg(null)
                })
                .catch(error => {
                    setMsg({ text: error.message || error, type: "danger" })
                    setQuestions([])
                })
            else if(parseInt(answer_id)) getQuestion(answer_id)
                .then(q => {
                    setQuestions([({ message: q.title, ...q })])
                    setMsg(null)
                })
                .catch(error => {
                    setMsg({ text: error.message || error, type: "danger" })
                    setQuestions([])
                })
        }
    }, []);

    if(msg && msg.type === "success") return <Alert variant={msg.type} className="shadow-one d-flex">{msg.text}</Alert>;
    const lang = Array.isArray(questions) ? questions[currentIndex].lang.toLowerCase() : "en";
    return (<div className="container-fluid">
        <Steps currentIndex={currentIndex} steps={!Array.isArray(questions) ? [] : questions.map((q,i) => ({ label: i }))} />
        { msg &&
            <Alert variant={msg.type} className="shadow-one d-flex">{msg.text}</Alert>
        }
        { !Array.isArray(questions) ? <p>Loading...</p> : questions.length == 0 ? null :
            <Question key={currentIndex} question={questions[currentIndex]} onChange={q => {
                setQuestions(qest => qest.map(_q => _q.id == q.id ? q : _q))
                setMsg(null)
            }} />
        }
        { currentIndex > 0 && 
            <Button variant={`shadow-one btn w-50 btn-secondary p-4`} onClick={() => setcurrentIndex(currentIndex-1)}>
                <Icon className="ml-0" name={"arrow-left"} size='md' color="white" />
                <SmartButton.Label className="question">
                    {strings[lang]["Previous"]}
                </SmartButton.Label>
            </Button> 
        }
        {!Array.isArray(questions) ? <p>Loading...</p> : questions.length == 0 ? null :
            <ConfirmSend 
            className={currentIndex > 0 ? "w-50" : "w-100"}
            lang={lang} 
            label={currentIndex == questions.length - 1 ? strings[lang]["Send answer"] : strings[lang]["Next"]} 
            onSubmit={() => {
                const q = questions[currentIndex];
                if(q.score == null || !parseInt(q.score) || q.score > 10 || q.score < 0){
                    setMsg({ type: "danger", text: strings[q.lang]['Please choose one score between 1 and 10']})
                }
                else{
                    sendVote({ score: q.score, comment: q.comment, id: q.id, status: 'ANSWERED' })
                        .then(success => {
                            if(questions.length - 1 > currentIndex){
                                setcurrentIndex(currentIndex+1);
                                setQuestions(qest => qest.map(_q => _q.id == q.id ? q : _q))
                            } 
                            else setMsg({ text: "😁 Thank you for your feedback!", type: "success" })
                        })
                        .catch(error => setMsg({ text: error.message || error, type: "danger" }))
                    
                } 
            }} />
        }

        </div>
    );
}

export default App;

                    // validator: () => {
                    //     if(questions[i].score == null || parseInt(questions[i].score) || questions[i].score > 10 || questions[i].score < 0) 
                    //         setMsg({ type: "danger", text: strings[questions[i].lang]['Please choose one score between 1 and 10']})
                    // }
