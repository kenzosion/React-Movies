import React, { Component } from "react";
import "./Home.css";
import HeroImage from "../elements/HeroImage/HeroImage";
import SearchBar from "../elements/SearchBar/SearchBar";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import MovieThumb from "../elements/MovieThumb/MovieThumb";
import LoadMoreBtn from "../elements/LoadMoreBtn/LoadMoreBtn";
import Spinner from "../elements/Spinner/Spinner";
import { data } from "../../config";

export default class Home extends Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerms: ""
  };

  componentDidMount() {
    this.setState({ loading: true });
    const endpoint = `${data.API_URL}movie/popular?api_key=${
      data.API_KEY
    }&language=en-US&page=1`;
    this.fetchItems(endpoint);
  }

  searchItems = searchTerm => {
    let endpoint = "";
    this.setState({
      movies: [],
      loading: true,
      searchTerm
    });

    if (searchTerm === "") {
      endpoint = `${data.API_URL}movie/popular?api_key=${data.API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${data.API_URL}search/movie?api_key=${data.API_KEY}&language=en-US&query=${searchTerm}`;
    }
    this.fetchItems(endpoint);
  };
  loadMoreItems = () => {
    const { searchTerm, currentPage } = this.state;

    let endpoint = "";
    this.setState({ loading: true });

    if (searchTerm === "") {
      endpoint = `${data.API_URL}movie/popular?api_key=${
        data.API_KEY
      }&language=en-US&page=${currentPage + 1}`;
    } else {
      endpoint = `${data.API_URL}search/movie?api_key=${
        data.API_KEY
      }&language=en-US&query=${searchTerm}&page=${currentPage + 1}`;
    }
    this.fetchItems(endpoint);
  };

  fetchItems = endpoint => {
    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        this.setState({
          movies: [...this.state.movies, ...result.results],
          heroImage: this.state.heroImage || result.results[0],
          loading: false,
          currentPage: result.page,
          totalPages: result.totalPages
        });
      });
  };

  render() {
    // ES6 Destructuring the state
    const {
      movies,
      heroImage,
      loading,
      currentPage,
      totalPages,
      searchTerm
    } = this.state;
    return (
      <div className="rmdb-home">
        {heroImage ? (
          <div>
            <HeroImage
              image={`${data.IMAGE_BASE_URL}${data.BACKDROP_SIZE}${
                heroImage.backdrop_path
              }`}
              title={heroImage.original_title}
              text={heroImage.overview}
            />
            <SearchBar callback={this.searchItems} />
          </div>
        ) : null}
        <div className="rmdb-home-grid">
          <FourColGrid
            header={searchTerm ? "Search Result" : "Popular Movies"}
            loading={loading}
          >
            {movies.map((element, i) => (
              <MovieThumb
                key={i}
                clickable={true}
                image={
                  element.poster_path
                    ? `${data.IMAGE_BASE_URL}${data.POSTER_SIZE}${
                        element.poster_path
                      }`
                    : "./images/no_image.jpg"
                }
                movieId={element.id}
                movieName={element.original_title}
              />
            ))}
          </FourColGrid>
          {loading ? <Spinner /> : null}
          {currentPage <= totalPages && !loading ? (
            <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} />
          ) : null}
        </div>
      </div>
    );
  }
}
