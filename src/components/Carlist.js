import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Addcar from './Addcar'
import Editcar from './Editcar'

const Carlist = () => {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchCars();
    }, [])

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    const fetchCars = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(resp => resp.json())
        .then(respData => setCars(respData._embedded.cars))
        .catch(err => console.error(err))
    }

    const deleteCar = (link) => {
        if (window.confirm('Are you sure?')){
            fetch(link, {method: 'DELETE'})
            .then(res => fetchCars())
            .then(res => setOpen(true))
            .catch(err => console.error(err))
        }
    }

    const saveCar = (newCar) => {
        fetch('https://carstockrest.herokuapp.com/cars', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCar)
            }
        )
        .then(res => fetchCars())
        .catch(err => console.error(err))
    }

    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchCars())
        .catch(err => console.error(err))
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
        {
            
            filterable: false,
            sortable: false,
            width: 100,
            Cell: row => <Editcar updateCar={updateCar} car={row.original}/>
        },
        {
            accessor: '_links.self.href',
            filterable: false,
            sortable: false,
            Cell: ({value}) => <Button color="secondary" size="small" onClick={() => deleteCar(value)}>Delete</Button>
        },
    ]

    return (
        <div>
            <Addcar saveCar={saveCar}/>
            <ReactTable filterable={true} columns={columns} data={cars}/>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message='Car Deleted'/>
        </div>
    );
};

export default Carlist;