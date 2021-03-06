﻿import React, { Component } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { setToken } from "./AuthService";
import "./RegistrationCamera.css";
import "./Home.css";
import { HttpRequestPath } from "./Constants.jsx";
import { Button, Icon } from "semantic-ui-react";

import LocalizedStrings from "react-localization";
import { getLanguage } from "./LangService";

let strings = new LocalizedStrings({
  en: {
      login: "Log in",
      look: "Look at the camera, smile and press login",
  },
  lt: {
      login: "Prisijungti",
      look: "Žiūrėkite į kamerą, šypsokitės ir spauskite 'Prisijungti'",
  }
});

export class LogInCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base64image: null,
      notFoundErr: null
    };
  }
  setRef = webcam => {
    this.webcam = webcam;
  };
  capture = () => {
    let screenshot = this.webcam.getScreenshot();
    var data = screenshot.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, "base64");

    axios
      .post(HttpRequestPath + "api/FaceRecognition", buf, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        if (response.data) {
            setToken(response.data);
            window.location = "/homePage";
          }
          else{
            window.location = "/SignIn";
          }
      })
  };

  _onSetLanguageTo(lang) {
    strings.setLanguage(lang);
  }

  render() {
    const lang = getLanguage();
    const videoConstraints = {
      width: 800,
      height: 500,
      facingMode: "user"
    };

    return (
      this._onSetLanguageTo(lang),
      (
        <div>
          
                <h3 className="camTitle">{strings.look}</h3><center>
          <Webcam
            className="center"
            audio={false}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        
          <Button size="big" onClick={this.capture}icon labelPosition="right">
            {strings.login}
            <Icon name="right arrow" />
          </Button>
        </center>
      </div>
      )
    );
  }
}
