import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MESSAGES from '../lang/en.js'

import axios from 'axios';

const API = process.env.REACT_APP_API_URL;
const STRINGS = MESSAGES.INDEX;


const Index = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        navigate('/activities');
    }
    const [endpointHistory, setEndpointHistory] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchEndpointHistory = async () => {
        try {
          const response = await axios.get(`${API}user_endpoint_history`, {
            withCredentials: true,
          });
          setEndpointHistory(response.data);
          setError(null);
        } catch (error) {
          console.error("Error fetching endpoint history:", error);
          setError('Failed to load data.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchEndpointHistory();
    }, []);
  
    return (

        <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
            <div className="card shadow rounded p-4 w-100" style={{ maxWidth: '400px' }}>
                <div className="card-header text-center ">
                    <h4>{STRINGS.welcome}</h4>
                </div>
                <div className="card-body d-flex flex-column text-center justify-content-center align-content-center">
                    <p>{STRINGS.generate}</p>
                    <button onClick={handleSubmit} className="btn btn-primary">
                        {STRINGS.go}
                    </button>

                    <table className="table table-striped">
          <thead>
            <tr>
              <th>Count</th>
              <th>Path</th>
              <th>Method</th>
            </tr>
          </thead>
          <tbody>
            {endpointHistory.map((item, index) => (
              <tr key={index}>
                <td>{item.count}</td>
                <td>{item.path}</td>
                <td>{item.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
                </div>

            </div>
        </div>


    )

}



export default Index;
