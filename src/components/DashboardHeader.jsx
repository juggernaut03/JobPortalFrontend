import React from 'react';
import { useTranslation } from '../context/TranslationContext';
import TranslatedText from '../components/TranslatedText';

function DashboardHeader({ customerName }) {
  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="card bg-primary text-white">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="card-title">
                  <TranslatedText text="Welcome" />, {customerName}!
                </h2>
                <p className="card-text mb-0">
                  <TranslatedText text="Find skilled professionals for your service needs" />
                </p>
              </div>
              <div className="d-none d-md-block">
                <i className="bi bi-person-circle" style={{ fontSize: '3rem' }}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;