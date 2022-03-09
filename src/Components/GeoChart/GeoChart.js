import React, { Component } from 'react';
import Chart from 'react-google-charts'
const geoData = [
  ['Country', 'Popularity'],
  ['Germany', 200],
  ['United States', 300],
  ['Brazil', 400],
  ['Canada', 500],
  ['France', 600],
  ['RU', 700],
]
class GeoChart extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Chart
                width={'100%'}
                height={'auto'}
                chartType="GeoChart"
                data={this.props.geodata}
                mapsApiKey="YOUR_MAP_API_KEY_GOES_HERE"
                rootProps={{ 'data-testid': '1' }}
            />
          )
    }
}

export default GeoChart;