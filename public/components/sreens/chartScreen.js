import React, { Component } from 'react';
import ChartStock from '../chart/chartStock';
import ChartHigh from '../chart/chartHigh';
import axios from 'axios';
import ReactSpinner from 'react-loader';
import { spinnerConfig } from '../../config';

class MonitoringScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            saccadesData: [],
            gazepointsData: [],
        }
    }

    componentWillMount() {
        axios.all([axios.get(`/subjectsinfo/${this.props.match.params.id}/saccades`), axios.get(`/subjectsinfo/${this.props.match.params.id}/gazepoints`)])
            .then(axios.spread((saccades, gazepoints) => {
                this.setState((prevState, props) => {
                    return {
                        isLoaded: true,
                        saccadesData: saccades.data.seccades,
                        gazepointsData: gazepoints.data.gazepoints
                    }
                });
            })).catch((error) => {
                this.setState((prevState, props) => {
                    return {
                        isLoaded: true,
                        saccadesData: [],
                        gazepointsData: [],
                    }
                });
            });
    }

    render() {
        const ChartContent =
            <ReactSpinner loaded={this.state.isLoaded} options={spinnerConfig}>
                <div>
                    <ChartHigh data={this.state.gazepointsData} title="GazePoints" attributes={['x', 'y']} />
                    <ChartStock data={this.state.saccadesData} title="Amplitude" attributes={['start_timestamp', 'amplitude']} /><br />
                    <ChartStock data={this.state.saccadesData} title="Direction" attributes={['start_timestamp', 'direction']} /><br />
                    <ChartStock data={this.state.saccadesData} title="Velocity" attributes={['start_timestamp', 'velocity']} />
                </div>
            </ReactSpinner>;

        return (
            <div className="ChartContent">
                {ChartContent}
            </div>
        )
    }
}

export default MonitoringScreen;