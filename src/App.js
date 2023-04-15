import './App.css';
import Home from './view/Home'
import * as React from 'react';
import {BrowserRouter as Router, Routes as Switch, Route} from "react-router-dom";
import Navbar from "./view/Navbar"
import Login from "./view/login/Login";
import DevicesTable from "./view/devices/DevicesTable";
import DeviceInformation from "./view/devices/DeviceInformation";
import ProductInformation from "./view/devices/ProductInformation";

function App() {


    const basePath = ''

    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route path={basePath + '/devices'} element={<DevicesTable/>}/>
                <Route path={basePath + '/devices/:deviceId'} element={<DeviceInformation/>}/>
                <Route path={basePath + '/products/:productId'} element={<ProductInformation/>}/>
                <Route path={basePath + '/products'} element={<ProductInformation/>}/>
                <Route path={basePath + '/login'} element={<Login/>}/>
                <Route path="*" element={<Home/>}/>
            </Switch>
        </Router>
    );
}

export default App;
