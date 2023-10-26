import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';

export default class Empleados extends Component {

    urlApi = Global.urlApi;

    hospitales = this.props.idshospital;

    state = {
        empleados: [],
        status: false
    }

    componentDidUpdate = (oldProps) => {
        if(oldProps.idshospital != this.props.idshospital){
            this.loadEmpleados();
            //console.log(this.hospitales);
        }
    }

    componentDidMount = () =>{
        //this.loadEmpleados();
        
    }

    loadEmpleados = () => {
        //console.log(this.hospitales);
        
       // var request = "api/trabajadores/trabajadoreshospital/" + this.props.idhospital;

        /*axios.get(this.urlApi+request).then(response => {
            this.setState({
                empleados: response.data,
                status: true
            })
        })*/
    }

    
  render() {

    return (
      <div>
        <h1>Empleados del hospital: {this.props.idshospital}</h1>

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
                        this.state.empleados.map((empleado, index) => {
                            return(<tr key={index}>
                                <td>{empleado.idTrabajador}</td>
                                <td>{empleado.apellido}</td>
                                <td>{empleado.oficio}</td>
                                <td>{empleado.salario}</td>
                                <td>{empleado.idHospital}</td>
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
