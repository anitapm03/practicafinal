import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Menu from './Menu';
import Home from './Home';

export default class Router extends Component {
  render() {

    return (
      <BrowserRouter>
      <Menu />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      </BrowserRouter>
    )
  }
}
