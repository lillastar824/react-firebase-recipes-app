/// <reference types="react-scripts" />

import firebase from "firebase";

interface CustomWindow extends Window {
  firebase: firebase.app.App;
}

declare let window: CustomWindow;