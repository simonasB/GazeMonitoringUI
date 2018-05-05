import React, { Component } from 'react';
import { withHighcharts, HighchartsStockChart, Chart, Title, Legend, RangeSelector, Tooltip, XAxis, YAxis, SplineSeries, Navigator, Scrollbar } from 'react-jsx-highstock';
import Highcharts from 'highcharts/highstock';
import applyExporting  from 'highcharts/modules/exporting';
import addCVS from 'highcharts/modules/export-data';

const formData = (props) =>{
  return  props.data.reduce((array, data)=>{
        array.push([parseInt(data[props.attributes[0]]), data[props.attributes[1]]]);
        return array;
    }, []);
}

const MyChart = (props) => {
    const data = formData(props);
    applyExporting(Highcharts);
    addCVS(Highcharts);
    return (
        <HighchartsStockChart>
            <Chart zoomType="x" />
            <Title>{props.title}</Title>
            <Legend>
                <Legend.Title>Time</Legend.Title>
            </Legend>
            <Tooltip />
            <XAxis>
                <XAxis.Title>Time</XAxis.Title>
            </XAxis>
            <YAxis id={props.title}>
                <YAxis.Title>{props.title}</YAxis.Title>
                <SplineSeries id={props.title} name={props.title} data={data} />
            </YAxis>
            <Navigator adaptToUpdatedData>
                <Navigator.Series seriesId={props.title} />   
            </Navigator>
            <Scrollbar liveRedraw/>
        </HighchartsStockChart>
    )
}


export default withHighcharts(MyChart, Highcharts);