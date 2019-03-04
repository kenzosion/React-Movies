import React, { Component } from 'react'
import './Home.css';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';

export default class Home extends Component {
state = {

}

  render() {
    return (
      <React.Fragment>
        <div className="rmdb-home">
          <HeroImage />
          <SearchBar />
          <FourColGrid />
          <Spinner />
          <LoadMoreBtn />
        </div>
      </React.Fragment>
    );
  }
}
