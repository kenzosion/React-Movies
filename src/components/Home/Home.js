import React, { Component } from 'react'
import './Home.css';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';
import { data } from '../../config';

export default class Home extends Component {
state = {
  movies: [],
  heroImage: null,
  loading: false,
  currentPage: 0,
  totalPages: 0,
  searchTerms: ''
}

componentDidMount() {
  this.setState ({ loading: true })
  const endpoint = `${data.API_URL}movie/popular?api_key=${data.API_KEY}&language=en-US&page=1`;
  this.fetchItems(endpoint);
}

  loadMoreItems = () => {
    // ES6 Destructuring the state
    const { searchTerm, currentPage } = this.state;

    let endpoint = '';
    this.setState({ loading: true })

    if (searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${currentPage + 1}`;
    }
    this.fetchItems(endpoint);
  }

  fetchItems = (endpoint) => {
    fetch(endpoint)
    .then(result => result.json())
    .then(result => {
      this.setState({
        movies: [...this.state.movies, ...result.results],
        heroImage: this.state.heroImage || result.results[0],
        loading: false,
        currentPage: result.page,
        totalPages: result.totalPages
      })
    })
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
