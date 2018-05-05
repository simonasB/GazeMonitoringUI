import React, { Component } from 'react';
import Content from './components/content/content';
import { Link } from 'react-router-dom';
import './app.css'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            routes: [{
                path: '',
                linkas: '',
                title: 'Sessions',
                component: 'MonitoringScreen',
            }, {
                path: 'sessions/:id',
                linkas: 'sessions/123456798',
                title: 'chart',
                component: 'ChartScreen',
            }]
        }
    }

    render() {
        return (
            <div className="App">
                <div className="header">EYE TRACKING</div>
                <div className="container">
                    <div className="navigation">
                        <div className="navigationButton">
                            <Link to='/' className="navigationLink">SubjectsInfo</Link>
                        </div>
                    </div>
                    <Content routes={this.state.routes} />
                </div>
            </div>
        );
    }
}

export default App;