import React, { Component } from 'react';
import { withHighcharts, HighchartsChart, Chart, Title, Legend, XAxis, YAxis, ScatterSeries, SplineSeries, Tooltip, Navigator, Scrollbar } from 'react-jsx-highstock';
import Highcharts from 'highcharts';
import boost from 'highcharts/modules/boost';
import applyExporting  from 'highcharts/modules/exporting';
import addCVS from 'highcharts/modules/export-data';


const formData = (props) => {
    return props.data.reduce((array, data) => {
        array.push([data[props.attributes[0]], data[props.attributes[1]]]);
        return array;
    }, []);
}

const MyChart = (props) => {
    let data = formData(props);
    boost(Highcharts);
    applyExporting(Highcharts);
    addCVS(Highcharts);

    const exporting = { 
            buttons: {
                contextButton: {
                    menuItems: ['printChart',
                    'separator',
                    'downloadPNG',
                    'downloadJPEG',
                    'downloadPDF',
                    'downloadSVG',
                    'separator',
                    'downloadCSV',
                    'downloadXLS'
                ]
                }
            }
      };

    return (
        <HighchartsChart exporting={exporting}>
            <Chart zoomType="x" />
            <Title>{props.title}</Title>
            <Legend>
                <Legend.Title>X</Legend.Title>
            </Legend>
            <Tooltip />
            <XAxis>
                <XAxis.Title>X</XAxis.Title>
            </XAxis>
            <YAxis id={props.title}>
                <YAxis.Title>Y</YAxis.Title>
                <ScatterSeries id={props.title} name={props.title} data={data} />
            </YAxis>
        </HighchartsChart>
    )
}

export default withHighcharts(MyChart, Highcharts);