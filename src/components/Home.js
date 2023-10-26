import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';
import Empleados from './Empleados';
import { NavLink } from 'react-router-dom';
import { event } from 'jquery';

export default class Home extends Component {

    urlApi = Global.urlApi;

    selectHospitales = React.createRef();

    state = {
        hospitales: [],
        status: false,
        seleccionados: ""
    }

    componentDidMount = () => {
        this.loadHospitales();
        //console.log("cargando...");
    }

    loadHospitales = () => {

        var request = "api/Hospitales";

        axios.get(this.urlApi+request).then(response => {
            //console.log("Leyendo servicio...");
            this.setState({
                hospitales: response.data,
                status: true
            })
            //console.log(this.state.hospitales);
        })
        
    }

    mostrarSeleccionados = (e) => {
        e.preventDefault();
        
    }

    crearArray = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
        this.setState({
            seleccionados: selectedOptions
        });
        //console.log(this.state.seleccionados);
    }

  render() {
    return (
      <div >
        <h1>Home</h1>

        <form onSubmit={this.mostrarSeleccionados}>
            <label>Seleccione los hospitales: </label>
            <select onChange={this.crearArray} className="form-select form-select-lg mb-3 w-50 p-3" ref={this.selectHospitales} multiple>
            {
                this.state.status == true &&
                (
                    this.state.hospitales.map((hospital, index) => {
                        return(<option key={index} value={hospital.idHospital}>{hospital.nombre}</option>)
                    })
                )
            }
            </select>
        
            <button className='btn btn-outline-success' >Buscar</button>
        </form>

        <h1>{this.state.seleccionados}</h1>

        <hr></hr>

        <Empleados idshospital={this.state.seleccionados} />
        
      </div>
    )
  }
}
