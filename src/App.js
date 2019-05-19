import React, { Component } from "react";
import Charts from "./Components/Charts";
import "./App.css";

/*
 *Wrriten :Naftali Lewenstein
 *email:tolimanman@gmail.com
 *Program name:api-to-chart
 *Description: This program is a website that present a
 *graph of an api by user choice(Drop down menu).
 *The graph shows all point and values of the api.
 *
 *The user could apply two filters:
 *1.First input field enter X amount of the data points. This will present to the user the X first data points.
 *2.Second input the user enters a number that wiil be the threshold of the graph.
 *The threhold is the red line presented on the graph.
 *
 *After apllying a threshold the website will display all the items that are above the threshold.
 *Enjoy:)
 */

/*
This class is the root of the app its incharge of presenting the 
drop down menu and acording to the selection to call the child components.
*/
class App extends Component {
  constructor(props) {
    super(props);

    /*Api = the api we are using
      Props: 1.category  = the category of graph 
             2.apiPath   = path to the api 
             3.dataPath  = Path to access data from api result
             4.labelPath = Path for accessing and mapping labels from result of api
             5.valuePath = Path for accessing and mapping values from result of api 
    */
    this.state = {
      api: "population",
      data: {
        category: "Population",
        category2: null,
        apiPath: "https://restcountries.eu/rest/v2/all?fields=name;population;",
        dataPath: "result.data",
        labelPath: "e=>e.name",
        valuePath: "e=>e.population",
        valuePath2: null
      }
    };
  }

  //Changes the API adress in state
  apiChange(value) {
    if (this.state.api !== value.target.value) {
      //loadcomponent only after api update
      this.setState({ api: value.target.value }, () => {
        this.loadComponent();
      });
    }
  }

  //This function updates the state according to the api value(what the user clicks on the drop down menu)
  loadComponent() {
    let data = {};
    switch (this.state.api) {
      case "transportation":
        data = {
          category: "Transportation",
          category2: null,
          apiPath: "http://transport.opendata.ch/v1/locations?query=Zurich",
          dataPath: "result.data.stations",
          labelPath: "e=>e.name",
          valuePath: "e=>e.id",
          valuePath2: null
        };
        this.setState({ data: data });
        break;
      case "population":
        data = {
          category: "Population",
          category2: null,
          apiPath:
            "https://restcountries.eu/rest/v2/all?fields=name;population;",
          dataPath: "result.data",
          labelPath: "e=>e.name",
          valuePath: "e=>e.population",
          valuePath2: null
        };
        this.setState({ data: data });
        break;
      case "makeup":
        data = {
          category: "Make-up prices",
          category2: null,
          apiPath:
            "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline",
          dataPath: "result.data",
          labelPath: "e=>e.product_type",
          valuePath: "e=>e.price",
          valuePath2: null
        };
        this.setState({ data: data });
        break;
      case "area":
        data = {
          category: "Area",
          category2: null,
          apiPath: "https://restcountries.eu/rest/v2/all?fields=name;area;",
          dataPath: "result.data",
          labelPath: "e=>e.name",
          valuePath: "e=>e.area",
          valuePath2: null
        };
        this.setState({ data: data });
        break;
      case "population&Area":
        data = {
          category: "Population",
          category2: "Area",
          apiPath:
            "https://restcountries.eu/rest/v2/all?fields=name;population;area;",
          dataPath: "result.data",
          labelPath: "e=>e.name",
          valuePath: "e=>e.area",
          valuePath2: "e=>e.population"
        };
        this.setState({ data: data });
        break;
      default:
        console.log("Error");
    }
  }

  /*Renders 
  1.Drop down button 
  2.The correct Chart according to the choice
  */
  render() {
    //Rendering a drop-down menu and a chosen component
    return (
      <div className="App">
        <select
          className="minimal"
          value={this.state.api}
          onChange={this.apiChange.bind(this)}
        >
          <option value={"population"}>World poulation</option>
          <option value={"makeup"}>Make-Up prices</option>
          <option value={"area"}>Country area's </option>
          <option value={"transportation"}>Zurich transportation</option>
          <option value={"population&Area"}>Population + Area</option>
        </select>

        <Charts
          category={this.state.data.category}
          category2={this.state.data.category2}
          apiPath={this.state.data.apiPath}
          dataPath={this.state.data.dataPath}
          labelPath={this.state.data.labelPath}
          valuePath={this.state.data.valuePath}
          valuePath2={this.state.data.valuePath2}
        />
      </div>
    );
  }
}

export default App;
