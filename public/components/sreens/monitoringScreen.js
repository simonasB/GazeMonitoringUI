import React, { Component } from 'react';
import axios from 'axios';
import Grid from '../grid/grid';
import ReactSpinner from 'react-loader';
import { spinnerConfig } from '../../config';

class MonitoringScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            isError: false,
            monitoringData: [],
        }
    }

    componentWillMount() {
        axios.get('/subjectsinfo').then((response) => {
            this.setState((prevState, props) => {
                return {
                    isLoaded: true,
                    monitoringData: response.data.subjectInfo,
                }
            });
        }).catch((error) => {
            this.setState((prevState, props) => {
                return {
                    isLoaded: true,
                    isError: true
                }
            });
        })
    }

    render() {
        let content;
        if(this.state.isError){
            content = <div>Error</div>
        }else{
            content = <Grid data={this.state.monitoringData} history={this.props.history} />;
        }
        const GridContent = <ReactSpinner loaded={this.state.isLoaded} options={spinnerConfig}>
            {content}
        </ReactSpinner>;
        return (
            <div>
                {GridContent}
            </div>
        )
    }
}

export default MonitoringScreen;