import React, { useState, useEffect } from 'react';
import Button from "../components/Button";
import TextArea from "../components/TextArea";
import strings from "../auth/strings";
import './App.scss';
import Dropdown from '../components/Dropdown';
import useWindowDimensions from "../auth/useWindowDimensions";
import { Alert } from 'react-bootstrap';
import {useParams} from "react-router-dom";

function App() {
  function getUrlParameter(name) {
    let params = new URLSearchParams(window.location.search);
    return params.has(name) ? params.get(name) : null;
  }
  const { width } = useWindowDimensions();
  const [select, setSelect] = useState(0);
  const [comment, setComment] = useState("");
  const [options] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [focused, setFocused] = useState("");
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [token] = useState(getUrlParameter("token"));
  const [lang] = useState(getUrlParameter("lang"));
  const [msg, setMsg] = useState({ text: "", type: null });

  useEffect(() => {
    getQuestion();
  }, []);

  //get question by id using token
  const getQuestion = async () =>{
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Token ${token}`
      }
    }
    const res = await fetch(`${process.env.REACT_APP_API_HOST}/${id}`, options);
    const data = await res.json();
    setQuestion(data.title);
  }

  //send user feedback function
  const sendVote = async (e) => {
    const options = {
      method: "PUT",
      body: JSON.stringify({
        score: select,
        comment: comment,
        entity_id:id
      }),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Token ${token}`
      }
    }
    if (select > 0) {
      const res = await fetch(`${process.env.REACT_APP_API_HOST}/${id}`, options);
      const data = await res.json();
      setMsg(data.status_code ?
        { text: "Oops.. an error ocurred, may be a missing field or something on our end", type: "error" } :
        { text: "Your feedback have been sent succesfully", type: "success" });
      console.log(data);
    }
  }

  return (
    <>
      {
        msg.type !== null ?
          <div className="container">
            <Alert variant={msg.type === "error" ?"danger": "success-light"} className="shadow-one mt-4 d-flex" onClick={() =>setMsg({text:"", type:null})}>
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
                        options.map((number, index) => <Button key={index}  className={`ml-3 mt-2 ${focused === index ? "focus": ""}`} onClick={() => {setFocused(number - 1);setSelect(number)}}>{number}</Button>)
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
                  <Button style={{ width: "100%", padding: "20px" }} icon="arrow" variant="primary" >
                    <Button.Label>
                      {strings[lang || "en"]["Are you sure about you answer?"]}
                    </Button.Label>
                    <Button.HoverLayer >
                      <Button.Label icon="check-mark" className="pt-1 pl-3 pr-3 bg-success-light" onClick={(e) => sendVote(e)}>
                        {strings[lang || "en"]["yes"]}
                      </Button.Label>
                      <Button.Label icon="fix" iconColor="red" className="pt-1 pl-3 pr-3 bg-danger-light" onClick={(e) => { setComment(""); setSelect(0) }}>
                        {strings[lang || "en"]["no"]}
                      </Button.Label>
                    </Button.HoverLayer>
                  </Button>
                </div>
              </div>
            </form>
          </div>
      }
    </>
  );
}

export default App;
