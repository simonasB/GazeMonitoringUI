import React, { Component } from 'react';
import { AgGridReact} from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-blue.css';
import {Link} from 'react-router-dom';

class Grid extends Component {

  constructor(props){
    super(props);
  }

    removeData(rowData){
      this.gridApi.setRowData(this.gridApi.gridOptionsWrapper.gridOptions.rowData)
    }
  
    onGridReady(params) {
      this.gridApi = params.api;
      params.api.sizeColumnsToFit();
    }
  
    onSelectionChanged(params)
    {
      var selectedRows = this.gridApi.getSelectedRows();
      this.props.history.push(`/sessions/${selectedRows[0].id}`);
    }

    render() {
        const columnDefs = [
                { headerName: 'Name', field: 'name' },
                { headerName: 'Age', field: 'age' },
                { headerName: 'Details', field: 'details' },
                { headerName: 'Session Start Time', field: 'session_start_timestamp' },                
                { headerName: 'Sessions End time', field: 'session_end_timestamp' },
                { headerName: 'Session ID', field: 'session_id' },
            ];
  
      const style = {
        height: '90vh',
        margin: '20px',
      };
  
      return (
        <div className="ag-theme-blue" style={style}>
          <AgGridReact
            columnDefs={columnDefs}
            enableFilter
            rowData={this.props.data}
            enableSorting
            rowSelection={'single'}
            onSelectionChanged={this.onSelectionChanged.bind(this)}
            onGridReady={this.onGridReady.bind(this)}
          />
        </div>
      )
    };
  }
  export default Grid;
