import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdjectiveGrid from '../components/AdjectiveSelect';
import '../style/adj.css'
import Loading from '../components/Loading';
import MESSAGES from '../lang/en.js'
const API = process.env.REACT_APP_API_URL;


const STRINGS = MESSAGES.ADJ;


const AdjectivePage = () => {
  const navigate = useNavigate();
  const [adjectives, setAdjectives] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const activity = state?.activity || '';

  const [primaryAdjective, setPrimaryAdjective] = useState(null);
  const [selectedAdjective, setSelectedAdjective] = useState(null);

  const [customAdjective, setCustomAdjective] = useState('');
  const [submittingCustom, setSubmittingCustom] = useState(false);


  useEffect(() => {
    const fetchAdjectives = async () => {
      //console.log("Fetching adjectives..."); // debug
      try {
        const response = await axios.get(`${API}adjectives`);
        //console.log("Adjectives response:", response);
        const data = response.data;
        const adjectivesNames = data.map(item => item.word);
        setAdjectives(adjectivesNames);
      } catch (error) {
        let status = error.response?.status || STRINGS.unknown;
        let message = error.response?.statusText || STRINGS.unknownError;
        setFetchError(`Error ${status}: ${message}`);
      }
      finally {
        //console.log("Setting loading to false");
        setLoading(false);
      }
    };

    fetchAdjectives();
  }, []);

  const handleAdjectiveSelect = (adjective) => {
    // If already selected, deselect
    if (primaryAdjective === adjective) {
      setPrimaryAdjective(null);
    } else if (selectedAdjective === adjective) {
      setSelectedAdjective(null);
    }
    // If primary is empty, set it
    else if (!primaryAdjective) {
      setPrimaryAdjective(adjective);
    }
    // Else if secondary is empty, set it
    else if (!selectedAdjective) {
      setSelectedAdjective(adjective);
    }
    // Replace the oldest (primary) if both are filled
    else {
      setPrimaryAdjective(selectedAdjective);
      setSelectedAdjective(adjective);
    }
  };


  const handleSubmit = async () => {
    if (!activity) {
      alert(STRINGS.missingActivity);
      return;
    }
    if (!primaryAdjective || !selectedAdjective) {
      alert(STRINGS.missingAdjective);
      return;
    }

    setLoading(true); // show the loading screen
    //  console.log("loading set to true");

    try {
      const response = await axios.get(`${API}create-song`, {
        params: {
          activity,
          adjective1: primaryAdjective,
          adjective2: selectedAdjective
        },
        responseType: 'blob'
      });

      const blob = new Blob([response.data], { type: 'audio/wav' });
      const songUrl = URL.createObjectURL(blob);

      navigate('/song', {
        state: {
          songUrl,
          songId: response.headers['x-song-id'] || 'Unknown Song'
        }
      });
    } catch (error) {
      let status = error.response?.status || STRINGS.unknown;
      let message = error.response?.statusText || STRINGS.unknownError;

      alert(`Error ${status}: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
      <div className="card w-75">
        <div className="card-body text-center">
          {loading ? (
            <Loading />
          ) : fetchError ? (
            <div className="alert alert-danger">
              <h4>{STRINGS.error}</h4>
              <p>{fetchError}</p>
              <button className="btn btn-primary mt-3" onClick={() => navigate('/index')}>
                {STRINGS.goBack}
              </button>
            </div>
          ) : adjectives.length === 0 ? (
            <div className="alert alert-warning">
              <p>{STRINGS.noAdjectivesFound}</p>
            </div>
          ) : (
            <>
              <h2>{STRINGS.select}{activity}</h2>
              <AdjectiveGrid
                adjectives={adjectives}
                selectedAdjectives={[primaryAdjective, selectedAdjective].filter(Boolean)}
                onSelect={handleAdjectiveSelect}
              />
              <div className="mt-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={STRINGS.addCustom}
                    value={customAdjective}
                    onChange={(e) => setCustomAdjective(e.target.value)}
                  />
                  <button
                    className="btn btn-success"
                    onClick={async () => {
                      if (!customAdjective.trim()) return;

                      setSubmittingCustom(true);
                      try {
                        await axios.post(`${API}adjectives`, { word: customAdjective.trim() }, {
                          withCredentials: true,
                          headers: { 'Content-Type': 'application/json' }
                        });

                        setAdjectives(prev => [...prev, customAdjective.trim()]);
                        setCustomAdjective('');
                      } catch (err) {
                        console.error("Failed to add adjective:", err);
                        let status = err.response?.status || STRINGS.unknown;
                        let message = err.response?.statusText || STRINGS.unknownError;

                        alert(`Error ${status}: ${message}`);
                      } finally {
                        setSubmittingCustom(false);
                      }
                    }}
                    disabled={submittingCustom || !customAdjective.trim()}
                  >
                    {STRINGS.add}
                  </button>
                </div>
              </div>
              <div className="btn-group mt-4" role="group">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/activities')}
                >
                  {STRINGS.back}
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={!primaryAdjective || !selectedAdjective}
                >
                  {STRINGS.submit}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );


}

export default AdjectivePage;
