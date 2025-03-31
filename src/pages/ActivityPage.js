//ChatGPT was used to assist with this file
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MESSAGES from '../lang/en.js';
import ActivityGrid from '../components/ActivitySelection';
import axios from 'axios';
import Loading from '../components/Loading';

const API = process.env.REACT_APP_API_URL;
const STRINGS = MESSAGES.ACTIVITY;

const ActivityPage = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`${API}activities`, { withCredentials: true });
        const activityNames = response.data.map(item => item.name);
        setActivities(activityNames);
        setError(null);
      } catch (error) {
        console.error('Error fetching activities:', error);
        if (error.response) {
          setError({
            code: error.response.status,
            message: error.response.data?.message || STRINGS.serverError,
          });
        } else {
          setError({ code: '', message: STRINGS.serverError });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const handleSubmit = async () => {
    const activityToSubmit = customInput.trim() || selectedActivity;

    if (!activityToSubmit) {
      alert(STRINGS.alertSelect);
      return;
    }

    try {
      setSubmitting(true);

      if (customInput.trim()) {
        await axios.post(`${API}activities`, { name: customInput.trim() }, { withCredentials: true });
      }

      navigate('/adjectives', { state: { activity: activityToSubmit } });
    } catch (error) {
      console.error('Failed to submit custom activity:', error);
      let status = error.response?.status || STRINGS.unknown;
      let message = error.response?.statusText || STRINGS.unknownError;

      alert(`${STRINGS.error} ${status}: ${message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
    setCustomInput('');
  };

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
      <div className="card w-75">
        <div className="card-body text-center">
          <h2>{STRINGS.selectActivity}</h2>

          {loading && !error ? (
            <Loading />
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              <p><strong>{STRINGS.error}{error.code}:</strong> {error.message}</p>
              <button className="btn btn-primary mt-3" onClick={() => navigate('/index')}>
                {STRINGS.goBack}
              </button>
            </div>
          ) : (
            <>
              <ActivityGrid
                items={activities}
                selectedActivity={selectedActivity}
                onSelect={handleActivitySelect}
              />

              {/* Custom Input Section */}
              <div className="mt-4">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder={STRINGS.customAct}
                  value={customInput}
                  onChange={(e) => {
                    setCustomInput(e.target.value);
                    setSelectedActivity('');
                  }}
                />
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={submitting || (!customInput.trim() && !selectedActivity)}
                >
                  {STRINGS.next}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
