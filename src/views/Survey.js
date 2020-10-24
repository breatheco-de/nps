import React, { useState, useEffect } from 'react';
import Button from "../components/Button";
import TextArea from "../components/TextArea";
import strings from "../helper/strings";
import Dropdown from '../components/Dropdown';
import useWindowDimensions from "../helper/useWindowDimensions";
import { Alert } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import getQuery from "../helper/getUrlParameter";
import getErrors from "../helper/statusError";

function App() {
    const { width } = useWindowDimensions();
    const [select, setSelect] = useState(0);
    const [send, setSend] = useState(false);
    const [comment, setComment] = useState("");
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [focused, setFocused] = useState("");
    const { id } = useParams();
    const [question, setQuestion] = useState("Hello thank you and everything bla bla");
    const query = {
        token: getQuery("token"),
        lang: getQuery("lang")
    }
    const [msg, setMsg] = useState({ text: "", type: null });

    useEffect(() => {
        query.token ? getQuestion() : setMsg({ text: "Please specify a valid token", type: "error" });
    }, []);

    //get question by id using an access token
    const getQuestion = async () => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Token ${query.token}`
            }
        }
        try {
            const res = await fetch(`${process.env.REACT_APP_API_HOST}/feedback/answer/${id}`, options);
            const data = await res.json();
            getErrors(res, data);
            setQuestion(data.title);
        } catch (error) {
            setMsg({ text: error.message || error, type: "error" })
        }
    }

    //send user feedback function
    const sendVote = async () => {
        const options = {
            method: "PUT",
            body: JSON.stringify({
                score: select,
                comment: comment,
                entity_id: id
            }),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Token ${query.token}`
            }
        }
        if (select > 0) {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_HOST}/feedback/answer/${id}`, options);
                const data = await res.json();
                getErrors(res, data);
                setMsg({ text: "Your feedback have been sent succesfully", type: "success" });
            } catch (error) {
                setMsg({ text: error.message || error, type: "error" });
            }
        } else {
            setMsg({ text: "Choose a number so we can submit your vote", type: "error" })
        }
    }

    return (
        <>
            {
                msg.type !== null ?
                    <div className="container">
                        <Alert variant={msg.type === "error" ? "danger" : "success"} className="shadow-one mt-4 d-flex">
                            {msg.text}
                        </Alert>
                    </div> :
                    <div className="container">
                        <form>
                            <div className="row text-center mt-4">
                                <div className="col-md-12 col-12">
                                    <h1>{question}</h1>
                                </div>
                            </div>
                            <div className="row text-center mt-5">
                                {width <= 375 ?
                                    <div className="col-12">
                                        <Dropdown
                                            options={options.map(number => { return { value: number, label: number } })}
                                            onChange={(e) => setSelect(e.value)}
                                        />
                                    </div> :
                                    <>
                                        <div className="col-md-2 text-right">
                                            {strings[query.lang || "en"]["not usefull"]}
                                        </div>
                                        <div className="col-md-8">
                                            {
                                                options.map((number, index) => <Button key={index} className={`ml-3 mt-2 ${focused === index ? "focus" : ""}`} onClick={() => { setFocused(number - 1); setSelect(number) }}>{number}</Button>)
                                            }
                                        </div>
                                        <div className="col-md-2 text-left">
                                            {strings[query.lang || "en"]["very usefull"]}
                                        </div>
                                    </>
                                }
                            </div>

                            <div className="row text-center mt-4">
                                <div className="col-12">
                                    <h2>{strings[query.lang || "en"]["Aditional Comments"]}</h2>
                                    <TextArea
                                        id="comments"
                                        name="comments"
                                        rows="4"
                                        placeholder={strings[query.lang || "en"]["Put your thoughts here..."]}
                                        onChange={e => setComment(e.target.value)}
                                        value={comment}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row text-center mt-4">
                                <div className="col-12">
                                    {!send ? <Button className="w-100 p-4" icon="arrow" variant="primary" onClick={() => setSend(true)}>
                                        <Button.Label className={width <= 375 ? "mobile" : ""}>
                                            {strings[query.lang || "en"]["Send answer"]}
                                        </Button.Label>
                                    </Button> :
                                        <Button className="w-100 p-4" icon="arrow" variant="primary">
                                            <Button.Label className={width <= 375 ? "mobile" : ""}>
                                                {strings[query.lang || "en"]["Are you sure about your answer?"]}
                                            </Button.Label>
                                            <Button.HoverLayer className="visible">
                                                <Button.Label icon="check-mark" className="pt-1 pl-3 pr-3 bg-success-light" onClick={(e) => sendVote(e)}>
                                                    {strings[query.lang || "en"]["yes"]}
                                                </Button.Label>
                                                <Button.Label icon="fix" iconColor="red" className="pt-1 pl-3 pr-3 bg-danger-light" onClick={() => { setSend(false) }}>
                                                    {strings[query.lang || "en"]["no"]}
                                                </Button.Label>
                                            </Button.HoverLayer>
                                        </Button>}
                                </div>
                            </div>
                        </form>
                    </div>
            }
        </>
    );
}

export default App;
