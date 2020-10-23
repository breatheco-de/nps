import React, { useState, useEffect } from 'react';
import Button from "../components/Button";
import TextArea from "../components/TextArea";
import strings from "../auth/strings";
import Dropdown from '../components/Dropdown';
import useWindowDimensions from "../auth/useWindowDimensions";
import { Alert } from 'react-bootstrap';
import { useParams } from "react-router-dom";

function App() {
    function getUrlParameter(name) {
        let params = new URLSearchParams(window.location.search);
        return params.has(name) ? params.get(name) : null;
    }
    const { width } = useWindowDimensions();
    const [select, setSelect] = useState(0);
    const [send, setSend] = useState(false);
    const [comment, setComment] = useState("");
    const [options] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const [focused, setFocused] = useState("");
    const { id } = useParams();
    const [question, setQuestion] = useState("");
    const [token] = useState(getUrlParameter("token"));
    const [lang] = useState(getUrlParameter("lang"));
    const [msg, setMsg] = useState({ text: "", type: null });

    useEffect(() => {
       token ? getQuestion() : setMsg({ text: "Please specify a valid token", type: "error" });
    }, []);

    //get question by id using an access token
    const getQuestion = async () => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Token ${token}`
            }
        }
        try {
            const res = await fetch(`${process.env.REACT_APP_API_HOST}/feedback/answer/${id}`, options);
            if(res.status == 500) throw Error("There was an error retrieving the survey")
            if(res.status > 399 && res.status < 499){
                if(res.status === 401) throw Error("Invalid token");
                
                const data = await res.json();
                throw Error(data.details || data.error || "There wasn completing this request")
            } 
                
            const data = await res.json();
            setQuestion(data.title);
        } catch (error) {
            setMsg({ text: error.message || error, type: "error" })
        }
    }

    //send user feedback function
    const sendVote = async (e) => {
        const options = {
            method: "PUT",
            body: JSON.stringify({
                score: select,
                comment: comment,
                entity_id: id
            }),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Token ${token}`
            }
        }
        if (select > 0) {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_HOST}/feedback/answer/${id}`, options);
                if(res.status == 500) throw Error("There was an error retrieving the survey")
                if(res.status > 399 && res.status < 499){
                    const data = await res.json();
                    throw Error(data.details || data.error || "There wasn completing this request")
                } 
                
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
                                            {strings[lang || "en"]["not usefull"]}
                                        </div>
                                        <div className="col-md-8">
                                            {
                                                options.map((number, index) => <Button key={index} className={`ml-3 mt-2 ${focused === index ? "focus" : ""}`} onClick={() => { setFocused(number - 1); setSelect(number) }}>{number}</Button>)
                                            }
                                        </div>
                                        <div className="col-md-2 text-left">
                                            {strings[lang || "en"]["very usefull"]}
                                        </div>
                                    </>
                                }
                            </div>

                            <div className="row text-center mt-4">
                                <div className="col-12">
                                    <h2>{strings[lang || "en"]["Aditional Comments"]}</h2>
                                    <TextArea
                                        id="comments"
                                        name="comments"
                                        rows="4"
                                        placeholder={strings[lang || "en"]["Put your thoughts here..."]}
                                        onChange={e => setComment(e.target.value)}
                                        value={comment}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row text-center mt-4">
                                <div className="col-12">
                                    {!send ? <Button style={{ width: "100%", padding: "20px" }} icon="arrow" variant="primary" onClick={() => setSend(true)}>
                                        <Button.Label>
                                            {strings[lang || "en"]["Send answer"]}
                                        </Button.Label>
                                    </Button>:
                                    <Button style={{ width: "100%", padding: "20px" }} icon="arrow" variant="primary">
                                        <Button.Label>
                                            {strings[lang || "en"]["Are you sure about you answer?"]}
                                        </Button.Label>
                                        <Button.HoverLayer className="visible">
                                            <Button.Label icon="check-mark" className="pt-1 pl-3 pr-3 bg-success-light" onClick={(e) => sendVote(e)}>
                                                {strings[lang || "en"]["yes"]}
                                            </Button.Label>
                                            <Button.Label icon="fix" iconColor="red" className="pt-1 pl-3 pr-3 bg-danger-light" onClick={() => { setSend(false) }}>
                                                {strings[lang || "en"]["no"]}
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
