import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { event } from 'jquery';
import Trabajadores from './Trabajadores';

export default class Home extends Component {

    urlApi = Global.urlApi;

    selectHospitales = React.createRef();
    cajaIncremento = React.createRef();

    state = {
        hospitales: [],
        status: false,
        seleccionados: [],
        statusUpdate: false
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

        var aux = this.getHospitalesSeleccionados();
        
        this.setState({
            seleccionados: aux
        })
        
    }

    getHospitalesSeleccionados = (e) => {
        if (e!=null){
            e.preventDefault();
        }
        
        var options = this.selectHospitales.current.options;
        var aux = [];
        //var data = "";
        for (var opt of options){
            if (opt.selected == true){
                //data += opt.value + ",";
                aux.push(opt.value);
            }
        }

        return aux;
    }

    incrementarSalarios = (e) => {
        if(e != null){
            e.preventDefault(); 
        }
        var hospitales = this.getHospitalesSeleccionados();
        var incremento = this.cajaIncremento.current.value;

        var request = "api/trabajadores/updatesalariotrabajadoreshospitales?" + "incremento=" + incremento + "&";
        
        var data = "";

        for (var id of hospitales){
            data += "idhospital=" + id + "&";
        }
        data = data.substring(0, data.length -1);
        var url = this.urlApi + request + data;

        axios.put(url).then(response => {
            this.setState({
                statusUpdate:true,
                seleccionados: hospitales,
                status:true
            })
        })
    }   



  render() {
    return (
      <div >
        <h1>Home</h1>

        <form onSubmit={this.mostrarSeleccionados}>
            <label>Seleccione los hospitales: </label>
            <select className="form-select form-select-lg mb-3 w-50 p-3" ref={this.selectHospitales} multiple>
            {
                this.state.status == true &&
                (
                    this.state.hospitales.map((hospital, index) => {
                        return(<option key={index} value={hospital.idHospital}>{hospital.nombre}</option>)
                    })
                )
            }
            </select>
        
            <button className='btn btn-outline-success' onClick={this.mostrarSeleccionados}>Buscar trabajadores</button>
            <br></br>
            <input type="number" ref={this.cajaIncremento} className='from-control' />
            <button className='btn btn-dark' onClick={this.incrementarSalarios}>Incrementar salarios</button>
        
        </form>

        <hr></hr>

        <Trabajadores seleccionados={this.state.seleccionados} />
        
      </div>
    )
  }
}
