import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Menu from './Menu';
import Home from './Home';
import Empleados from './Empleados';

export default class Router extends Component {
  render() {

    function EmpleadosElement(){
        var { idhospital } = useParams();
        return <Empleados idhospital={idhospital} />
    }
    


    return (
      <BrowserRouter>
      <Menu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/empleados/:idhospital' element={<EmpleadosElement />} />
      </Routes>
      </BrowserRouter>
    )
  }
}
