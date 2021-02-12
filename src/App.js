import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import RocketLaunchDetails from './components/RocketLaunchDetails';
import querystring from 'querystring';
import './App.css';
import loader from './loadRocket.gif';

const API_URL = "https://api.spacexdata.com/v3/launches?limit=100";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      filters: {
        limit: 150,
        launch_year: undefined,
        launch_success: undefined,
        land_success: undefined,
      },
    }

  }

  getUpdatedApiUrl(filters = {}) {
    return API_URL + querystring.stringify({ ...filters });
  }

  fetchAPI(filters) {
    const URL = this.getUpdatedApiUrl(filters);
    this.setState({ isLoaded: false, filters });
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          data
        });
      });
  }

  componentDidMount() {
    this.fetchAPI(this.state.filters);
  }

  updateApiFilters(type, value) {
    // if same value is clicked, we remove that filter
    if (this.state.filters[type] === value) {
      value = undefined;
    }

    const filters = {
      ...this.state.filters,
      [type]: value,
    };

    this.fetchAPI(filters);
  }


  render() {

    const { isLoaded, data } = this.state;
    const uniqueLaunchYears = new Array(16).fill(0).map((_, index) => 2006 + index);

    if (!isLoaded) {
      return <div className="Rocket_Launch_Loader">
        <div className="App-loader-box">
          <img src={loader} alt="loading..." />
        </div>
      </div>
    }

    else {

      return (
        <div className="SpaceXApp">
          <h1 className="App-header">SpaceX Launch Programs</h1>
          <Container fluid>
            <Row>
              <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                <Card className="App-filter-card">
                  <Card.Body>
                    <Card.Title className="App-filter-header">
                      <b>Filters</b>
                    </Card.Title>
                    <Card.Text className="App-filter-heading-launch-year">
                      Launch Year
                      <hr className="App-filters-hr" />
                    </Card.Text>

                    <Row>
                      <div className="App-filter-button-container">
                        {uniqueLaunchYears.map((year) => {
                          return (
                            <Button
                              className="App-filter-button"
                              variant={
                                this.state.filters.launch_year ===
                                year.toString()
                                  ? "success"
                                  : "outline-success"
                              }
                              value={year}
                              onClick={(e) =>
                                this.updateApiFilters(
                                  "launch_year",
                                  e.target.value
                                )
                              }
                            >
                              {year}
                            </Button>
                          );
                        })}
                      </div>
                    </Row>

                    <Card.Text className="App-filter-heading">
                      Successful Launch
                      <hr className="App-filters-hr" />
                    </Card.Text>

                    <div className="App-filter-button-container">
                      <Button
                        className="App-filter-button"
                        variant={
                          this.state.filters.launch_success === "true"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters(
                            "launch_success",
                            e.target.value
                          )
                        }
                        value="true"
                      >
                        True
                      </Button>

                      <Button
                        className="App-filter-button"
                        variant={
                          this.state.filters.launch_success === "false"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters(
                            "launch_success",
                            e.target.value
                          )
                        }
                        value="false"
                      >
                        False
                      </Button>
                    </div>

                    <Card.Text className="App-filter-heading">
                      Successful Landing
                      <hr className="App-filters-hr" />
                    </Card.Text>
                    <div className="App-filter-button-container">
                      <Button
                        className="App-filter-button"
                        variant={
                          this.state.filters.land_success === "true"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters("land_success", e.target.value)
                        }
                        value="true"
                      >
                        True
                      </Button>

                      <Button
                        className="App-filter-button"
                        variant={
                          this.state.filters.land_success === "false"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters("land_success", e.target.value)
                        }
                        value="false"
                      >
                        False
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-lg-9 col-md-9 col-sm-12 col-12">
                <Row>
                  {data.map((details) => {
                    return (
                      <div className="col-md-6 col-lg-3 card_tab">
                        <RocketLaunchDetails details={details} />
                      </div>
                    );
                  })}
                </Row>
              </div>
            </Row>
            <div>
              <h5 className="justify-content-center d-flex">
                Developed by : Rahul David Dudde
              </h5>
            </div>
          </Container>
        </div>
      );
    }

  }
}

export default App;
