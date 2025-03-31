import React, { useEffect, useState } from 'react';
import MESSAGES from '../lang/en.js';
import axios from 'axios';
import Loading from '../components/Loading';

const API = process.env.REACT_APP_API_URL;
const STRINGS = MESSAGES.ADMIN;

const Admin = () => {
  const [endpointHistory, setEndpointHistory] = useState([]);
  const [totalHistory, setTotalHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adjectives, setAdjectives] = useState([]);
  const [activities, setActivities] = useState([]);
  const [editedAdjectives, setEditedAdjectives] = useState({});
  const [editedActivities, setEditedActivities] = useState({});
  const [newAdjective, setNewAdjective] = useState('');
  const [newActivity, setNewActivity] = useState('');



  useEffect(() => {
    const fetchData = async () => {
      try {
        const [endpointRes, totalRes] = await Promise.all([
          axios.get(`${API}endpoint_history`, { withCredentials: true }),
          axios.get(`${API}total_endpoint_history`, { withCredentials: true })
        ]);
        const [adjRes, actRes] = await Promise.all([
          axios.get(`${API}adjectives`, { withCredentials: true }),
          axios.get(`${API}activities`, { withCredentials: true })
        ]);

        setAdjectives(adjRes.data);
        setActivities(actRes.data);
        setEndpointHistory(endpointRes.data);
        setTotalHistory(totalRes.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);

        let status = error.response?.status || STRINGS.unknown;
        let message = error.response?.statusText || STRINGS.unknownError;

        setError(`Error ${status}: ${message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddAdjective = async () => {
    try {
      const res = await axios.post(`${API}adjectives`, { word: newAdjective }, { withCredentials: true });
      setAdjectives([...adjectives, res.data]);
      setNewAdjective('');
    } catch (err) {
      alert(`${STRINGS.failedAddAdj}${newAdjective}\n${err.response?.status || ''}:${err.response?.statusText || ''}\n${err.response?.data?.error || err.message}`);
    }
  };

  const handleAddActivity = async () => {
    try {
      const res = await axios.post(`${API}activities`, { name: newActivity }, { withCredentials: true });
      setActivities([...activities, res.data]);
      setNewActivity('');
    } catch (err) {
      alert(`${STRINGS.failedAddAct}${newActivity}\n${err.response?.status || ''}:${err.response?.statusText || ''}\n${err.response?.data?.error || err.message}`);
    }
  };

  const handleAdjectiveChange = (id, newWord) => {
    setEditedAdjectives(prev => ({ ...prev, [id]: newWord }));
  };

  const handleActivityChange = (id, newName) => {
    setEditedActivities(prev => ({ ...prev, [id]: newName }));
  };
  const handleUpdateAdjective = async (id) => {
    const newWord = editedAdjectives[id];
    try {
      const res = await axios.patch(`${API}adjectives/${id}`, { word: newWord }, { withCredentials: true });
      setAdjectives(adjectives.map(a => a.id === id ? res.data : a));
      setEditedAdjectives(prev => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    } catch (err) {
      alert(`${STRINGS.failedUpdAdj}${id}\n${err.response?.status || ''}:${err.response?.statusText || ''}\n${err.response?.data?.error || err.message}`);
    }
  };

  const handleUpdateActivity = async (id) => {
    const newName = editedActivities[id];
    try {
      const res = await axios.patch(`${API}activities/${id}`, { name: newName }, { withCredentials: true });
      setActivities(activities.map(a => a.id === id ? res.data : a));
      setEditedActivities(prev => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    } catch (err) {
      alert(`${STRINGS.failedUpdAct}${id}\n${err.response?.status || ''}:${err.response?.statusText || ''}\n${err.response?.data?.error || err.message}`);
    }
  };

  const handleDeleteAdjective = async (word) => {
    try {
      await axios.delete(`${API}adjectives`, {
        data: { word },
        withCredentials: true
      });
      setAdjectives(adjectives.filter(adj => adj.word !== word));
    } catch (err) {
      alert(`${STRINGS.failedDelAdj}${word}\n${err.response?.status || ''}:${err.response?.statusText || ''}\n${err.response?.data?.error || err.message}`);
    }
  };


  const handleDeleteActivity = async (name) => {
    try {
      await axios.delete(`${API}activities`, {
        data: { name },
        withCredentials: true
      });
      setActivities(activities.filter(act => act.name !== name));
    } catch (err) {
      alert(`${STRINGS.failedDelAct}${name}\n${err.response?.status || ''}:${err.response?.statusText || ''}\n${err.response?.data?.error || err.message}`);
    }
  };


  return (
    <div className="container mt-4">
      <h1>{STRINGS.adminDash}</h1>

      {loading ? (
        <Loading />
      ) : error ? (
        <div className="alert alert-danger">{error}</div>

      ) : (
        <>
          <h3>{STRINGS.endpointUsage}</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>{STRINGS.count}</th>
                <th>{STRINGS.path}</th>
                <th>{STRINGS.method}</th>
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

          <h3>{STRINGS.userUsage}</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>{STRINGS.count}</th>
                <th>{STRINGS.email}</th>
              </tr>
            </thead>
            <tbody>
              {totalHistory.map((item, index) => (
                <tr key={index}>
                  <td>{item.count}</td>
                  <td>{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Adjectives</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>{STRINGS.id}</th>
                <th>{STRINGS.word}</th>
                <th>{STRINGS.actions}</th>
              </tr>
            </thead>
            <tbody>
              {adjectives.map((adj) => (
                <tr key={adj.id}>
                  <td>{adj.id}</td>
                  <td>
                    <input
                      type="text"
                      value={editedAdjectives[adj.id] ?? adj.word}
                      onChange={(e) => handleAdjectiveChange(adj.id, e.target.value)}
                    />
                  </td>
                  <td>
                    <button className="btn btn-sm btn-success me-2" style={{ width: '80px' }} onClick={() => handleUpdateAdjective(adj.id)}>{STRINGS.update}</button>
                    <button className="btn btn-sm btn-danger" style={{ width: '80px' }} onClick={() => handleDeleteAdjective(adj.word)}>{STRINGS.delete}</button>
                  </td>

                </tr>


              ))}

              <tr>
                <td>{STRINGS.new}</td>
                <td>
                  <input
                    type="text"
                    value={newAdjective}
                    onChange={(e) => setNewAdjective(e.target.value)}
                    placeholder={STRINGS.newAdj}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary" style={{ width: '80px' }}
                    onClick={handleAddAdjective}
                  >
                    {STRINGS.add}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <h3>Activities</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>{STRINGS.id}</th>
                <th>{STRINGS.word}</th>
                <th>{STRINGS.actions}</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((act) => (
                <tr key={act.id}>
                  <td>{act.id}</td>
                  <td>
                    <input
                      type="text"
                      value={editedActivities[act.id] ?? act.name}
                      onChange={(e) => handleActivityChange(act.id, e.target.value)}
                    />
                  </td>
                  <td>
                    <button className="btn btn-sm btn-success me-2" style={{ width: '80px' }} onClick={() => handleUpdateActivity(act.id)}>{STRINGS.update}</button>
                    <button className="btn btn-sm btn-danger" style={{ width: '80px' }} onClick={() => handleDeleteActivity(act.name)}>{STRINGS.delete}</button>
                  </td>
                </tr>
              ))}

              <tr>
                <td>{STRINGS.new}</td>
                <td>
                  <input
                    type="text"
                    value={newActivity}
                    onChange={(e) => setNewActivity(e.target.value)}
                    placeholder={STRINGS.newAct}
                  />
                </td>
                <td>
                  <button className="btn btn-sm btn-primary" style={{ width: '80px' }} onClick={handleAddActivity}>{STRINGS.add}</button>
                </td>
              </tr>

            </tbody>
          </table>

        </>
      )}

    </div>
  );
};


export default Admin;
