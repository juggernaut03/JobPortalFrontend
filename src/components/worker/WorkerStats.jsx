import React from 'react';
import { useTranslation } from '../../context/TranslationContext';
import TranslatedText from '../TranslatedText';

function WorkerStats({ stats }) {
  const { currentLanguage } = useTranslation();
  
  return (
    <div className="row g-3">
      <div className="col-6 col-lg-3">
        <div className="card h-100 shadow-sm border-0">
          <div className="card-body p-3">
            <div className="d-flex align-items-center">
              <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                <i className="bi bi-briefcase text-primary fs-4"></i>
              </div>
              <div>
                <h6 className="card-subtitle mb-1 text-muted">
                  <TranslatedText text="Total Jobs" />
                </h6>
                <h2 className="card-title mb-0">{stats.totalJobs}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-6 col-lg-3">
        <div className="card h-100 shadow-sm border-0">
          <div className="card-body p-3">
            <div className="d-flex align-items-center">
              <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                <i className="bi bi-check2-circle text-success fs-4"></i>
              </div>
              <div>
                <h6 className="card-subtitle mb-1 text-muted">
                  <TranslatedText text="Completed" />
                </h6>
                <h2 className="card-title mb-0">{stats.completedJobs}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-6 col-lg-3">
        <div className="card h-100 shadow-sm border-0">
          <div className="card-body p-3">
            <div className="d-flex align-items-center">
              <div className="bg-warning bg-opacity-10 rounded-circle p-3 me-3">
                <i className="bi bi-bell text-warning fs-4"></i>
              </div>
              <div>
                <h6 className="card-subtitle mb-1 text-muted">
                  <TranslatedText text="Requests" />
                </h6>
                <h2 className="card-title mb-0">{stats.pendingRequests}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-6 col-lg-3">
        <div className="card h-100 shadow-sm border-0">
          <div className="card-body p-3">
            <div className="d-flex align-items-center">
              <div className="bg-info bg-opacity-10 rounded-circle p-3 me-3">
                <i className="bi bi-star text-info fs-4"></i>
              </div>
              <div>
                <h6 className="card-subtitle mb-1 text-muted">
                  <TranslatedText text="Rating" />
                </h6>
                <h2 className="card-title mb-0">{stats.rating.toFixed(1)}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkerStats;