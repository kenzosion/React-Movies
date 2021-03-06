import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <React.Fragment>
        <div className="rmdb-header">
            <div className="rmdb-header-content">
                <img className="rmdb-logo" src="/images/reactMovie_logo.png" alt="rmdb-logo" />
                <img className="rmdb-tmdb-logo" src="/images/tmdb_logo.png" alt="tmdb-logo" />
            </div>
        </div>
    </React.Fragment>
  )
}
