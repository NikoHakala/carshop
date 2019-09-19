import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';



const Carlist = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetchCars();
    }, [])

    const fetchCars = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(resp => resp.json())
        .then(respData => setCars(respData._embedded.cars))
    }

    const columns = [
        {
            Header: 'Brand',
            accessor: 'brand'
        },
        {
            Header: 'Model',
            accessor: 'model'
        },
        {
            Header: 'Year',
            accessor: 'year'
        },
        {
            Header: 'Fuel',
            accessor: 'fuel'
        },
        {
            Header: 'Color ',
            accessor: 'color'
        },
        {
            Header: 'Price (€)',
            accessor: 'price'
        },
    ]

    return (
        <div>
            <ReactTable filterable={true} columns={columns} data={cars}/>
        </div>
    );
};

export default Carlist;