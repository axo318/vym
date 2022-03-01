
import { useState, useCallback, useEffect } from "react";
import axios from 'axios';
import './MainComponent.css'

const MainComponent = () => {
    const [values, setValues] = useState([]);
    const [value, setValue] = useState('');

    const getAllNumbers = useCallback(async () => {
        const axiosResponse = await axios.get('/api/values/all');
        setValues(axiosResponse.data.map(row => row.number));
    }, []);

    const saveNumber = useCallback(async (event) => {
        event.preventDefault();
        await axios.post('/api/values', {
            value
        });
        setValue('');
        getAllNumbers();
    }, [value, getAllNumbers]);

    const updateValue = useCallback(event => {
        event.preventDefault();
        setValue(event.target.value);
    }, []);

    useEffect(() => {
        getAllNumbers();
    }, [getAllNumbers]);

    return (
        <div>
            <button onClick={getAllNumbers}>Get all numbers</button><br/>
            <span className="title">Values</span>
            <div className="values">
                {values.map((v => <div className="value"> value {v} </div>))}
            </div>
            <form className="form" onSubmit={saveNumber}>
                <label>Enter value</label>
                <input value={value} onChange={updateValue}/>
                <button>Submit</button>
            </form>
        </div>
    );
};

export default MainComponent;