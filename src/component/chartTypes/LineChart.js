import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class LineChart extends Component {
  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
  }

  render() {
    return (
      <Line
        data={this.props.chartData}
        options={{
          title: {
            display: this.props.displayTitle,
            text: this.props.title,
            fontSize: 18
          },
          legend: {
            display: this.props.displayLegend,
            position: this.props.legendPosition
          },
          responsive: true,

          hover: {
            mode: 'label'
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
              }
            }],
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true,
                // steps: 10,
                stepValue: 5,
                // max: 100
              }
            }]
          },

        }}
      />
    )
  }
}

export default LineChart;