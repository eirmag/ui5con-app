import React from 'react';
import "@ui5/webcomponents/dist/Card";
import "@ui5/webcomponents/dist/DatePicker";
import "@ui5/webcomponents/dist/Icon";
import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/CustomListItem";
import "@ui5/webcomponents/dist/StandardListItem";
import "@ui5/webcomponents/dist/ShellBar";
import "@ui5/webcomponents/dist/Switch";
import "@ui5/webcomponents/dist/ThemePropertiesProvider"
import "@ui5/webcomponents/dist/Tab";
import "@ui5/webcomponents/dist/TabContainer";
import "@ui5/webcomponents/dist/Timeline";
import "@ui5/webcomponents/dist/Option";
import profile from "./img/profile.png";
import logo from "./img/logo.png";
import './App.css';
import Home from "./home/Home";
import { Switch, Route, Redirect } from "react-router-dom";
import Detail from './detail/Detail';
import AppBar from './appbar/AppBar'; // use the newly created AppBar component


function App() {
  return (
    <div className="App">
    <AppBar/>
    <Switch>
				<Route path='/home' component={Home}/>
				<Route path='/detail' component={Detail}/>
				<Redirect from="/" to="/home" />
			</Switch>    </div>
  );
}

export default App;
