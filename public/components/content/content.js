import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MonitoringScreen from '../sreens/monitoringScreen';
import ChartScreen from '../sreens/chartScreen';

const components = {
    MonitoringScreen,
    ChartScreen,
}

class Content extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main">
                {
                    this.props.routes.map((route, index) => {
                        return (<Route exact path={'/' + route.path} key={index} component={components[route.component]} />)
                    })
                }
            </div>
        )
    }
}

export default Content;