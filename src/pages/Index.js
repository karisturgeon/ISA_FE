import React from 'react';
import { useNavigate } from 'react-router-dom';
import MESSAGES from '../lang/en.js'


const STRINGS = MESSAGES.INDEX;


const Index = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        navigate('/activities');
    }

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
                </div>

            </div>
        </div>


    )

}



export default Index;
