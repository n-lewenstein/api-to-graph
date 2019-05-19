import React, { Component } from "react";
import "./Design.css";
import axios from "axios";
import Graph from "./Graph";

/*
This class is mainley incharge of collecting the data from the API 
and sending it to the graph for visualization.
*/
class Population extends Component {
  constructor(props) {
    super(props);

    /*
          1.Loading and error = flags to solve asynchronic programming 
          2.Data      = holds data returned from api
          3.Points    = number of lables to print on graph
          4.Threshold = the threshold line value 
          5.apiPath   = path to the api 
          6.dataPath  = Path to access data from api result
          7.labelPath = Path for accessing and mapping labels from result of api
          8.valuePath = Path for accessing and mapping values from result of api 
        */
    this.state = {
      loading: true,
      error: "",
      data: [],
      points: 0,
      threshold: 0,
      apiPath: "",
      dataPath: "",
      labelPath: "",
      valuePath: "",
      valuePath2: ""
    };
  }

  //Before loading the component update state with props
  componentWillMount() {
    this.setState({
      data: [],
      apiPath: this.props.apiPath,
      dataPath: this.props.dataPath,
      labelPath: this.props.labelPath,
      valuePath: this.props.valuePath,
      valuePath2: this.props.valuePath2
    });
  }

  //If props from parent changed updtae the state
  componentDidUpdate(prevProps) {
    if (
      this.props.apiPath !== prevProps.apiPath ||
      this.props.dataPath !== prevProps.dataPath ||
      this.props.labelPath !== prevProps.labelPath ||
      this.props.valuePath !== prevProps.valuePath ||
      this.props.valuePath2 !== prevProps.valuePath2
    ) {
      this.setState(
        {
          data: [],
          apiPath: this.props.apiPath,
          dataPath: this.props.dataPath,
          labelPath: this.props.labelPath,
          valuePath: this.props.valuePath,
          valuePath2: this.props.valuePath2,
          threshold: 0,
          points: 0
        },
        () => {
          this.loadData();
        }
      );
    }
  }

  //Get Data fro API using AXIOS
  loadData = () => {
    this.setState({ loading: true });
    return axios
      .get(this.state.apiPath)
      .then(result => {
        this.setState({
          data: eval(this.state.dataPath),
          loading: false,
          error: false
        });
      })
      .catch(error => {
        console.error("error: ", error);
        this.setState({
          error: `${error}`,
          loading: false
        });
      });
  };

  //When component finished loading call APi
  componentDidMount() {
    this.loadData();
  }

  //Updates from input the amount of points to be shown
  pointChange(value) {
    if (value.target.value === "") {
      this.setState({ points: 0 });
    } else if (isNaN(value.target.value)) {
      console.log("Only numbers aloud!");
    } else {
      this.setState({ points: value.target.value });
    }
  }

  //Updates from input the threshold line
  thresholdChange(value) {
    if (value.target.value === "") {
      this.setState({ threshold: 0 });
    } else if (isNaN(value.target.value)) {
      console.log("Only numbers aloud!");
    } else {
      this.setState({ threshold: value.target.value });
    }
  }

  //Creates and returns an array with the lables of the graph
  buttomValues = () => {
    return this.state.data.map(eval(this.state.labelPath));
  };

  //Creates and returns an array with the values of the graph
  sideValues = () => {
    return this.state.data.map(eval(this.state.valuePath));
  };

  //Creates and returns an array with the values of the second metric
  sideValues2 = () => {
    if (this.state.valuePath2 !== null) {
      return this.state.data.map(eval(this.state.valuePath2));
    } else {
      return {};
    }
  };

  render() {
    //Render graph and inputs(Points and threshold) if the data API call was successfull
    const { loading, error, data } = this.state;
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return (
        <p>
          There was an error loading the data.{" "}
          <button onClick={this.loadData}>Try again</button>
        </p>
      );
    }

    return (
      <div className="box">
        <Graph
          names={data}
          bottom={this.buttomValues()}
          side={this.sideValues()}
          side2={this.sideValues2()}
          category={this.props.category}
          category2={this.props.category2}
          points={this.state.points}
          threshold={this.state.threshold}
        />
        <input
          id="points"
          onChange={this.pointChange.bind(this)}
          placeholder="Amount of points"
        />
        <br />
        <input
          id="threshold"
          onChange={this.thresholdChange.bind(this)}
          placeholder="Threshold"
        />
      </div>
    );
  }
}

export default Population;
