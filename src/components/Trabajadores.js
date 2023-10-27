import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';

export default class Trabajadores extends Component {

    urlApi = Global.urlApi;

    state = {
        mensaje: "",
        trabajadores: [],
        status: false
    }

    componentDidUpdate = (oldProps) => {

        if(oldProps.seleccionados != this.props.seleccionados){
            this.loadTrabajadores();
        }

    }

    componentDidMount = () => {
        this.loadTrabajadores();
    }

    loadTrabajadores = () => {
        //console.log(this.hospitales);
        var hospitales = this.props.seleccionados;
        var data = "";

        for (var id of hospitales){
            data += "idhospital=" + id + "&";
        }

        data = data.substring(0, data.length -1);
        
        var request = "api/trabajadores/trabajadoreshospitales?";

        var url= this.urlApi+request+data;

        axios.get(url).then(response => {
            this.setState({
                trabajadores: response.data,
                status: true
            })
        })
       
    }
    
  render() {
    return (
        <div>
        <h1>Trabajadores del hospital: </h1>

        <table className='table table-info'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Apellido</th>
                    <th>Oficio</th>
                    <th>Salario</th>
                    <th>ID Hospital</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.status == true &&
                    (
                        this.state.trabajadores.map((trabajador, index) => {
                            return(<tr key={index}>
                                <td>{trabajador.idTrabajador}</td>
                                <td>{trabajador.apellido}</td>
                                <td>{trabajador.oficio}</td>
                                <td>{trabajador.salario}</td>
                                <td>{trabajador.idHospital}</td>
                            </tr>)
                        })
                    )
                }
            </tbody>
        </table>
      </div>
    )
  }
}
