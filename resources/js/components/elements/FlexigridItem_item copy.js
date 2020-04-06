import React, { useState, useEffect } from 'react';
import {PagingState,
  IntegratedPaging, SortingState, SelectionState,IntegratedSelection } from '@devexpress/dx-react-grid';
import {
  Grid,VirtualTable,
  Table, TableHeaderRow, TableEditRow, TableEditColumn,
  PagingPanel, DragDropProvider, TableColumnReordering,
  TableFixedColumns, TableSummaryRow,TableColumnResizing,TableSelection 
} //from '@devexpress/dx-react-grid-bootstrap3';
from '@devexpress/dx-react-grid-bootstrap4';

import Loading from '../elements/Loading.js'

export default (m_props) => {
  const URL         = "api/" + m_props.url + "/";
  const URL_orders  = m_props.url + "_orders";
  const URL_widths  = m_props.url + "_widths";
  const URL_sort    = m_props.url + "_sort";

  /**/
  const rowClick = props => {
    const { value } = props;
    return (
      <Table.Row {...props} onClick={() =>
        console.log(props.row)
        //m_props.clickData(props.row.id)
      } />
    );
  };
  
  const [columns] = useState(m_props.columns);
  const [tableColumnExtensions] = useState(m_props.columns);
  
  const [rows, setRows] = useState([]); 

  const [sorting, setSorting] = useState([{ columnName: 'date', direction: 'asc' }]);
  
  const [selection, setSelection] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageSizes] = useState([5, 10, 15]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState();
  //const [columnOrder, setColumnOrder] = useState([]);
  //const url = "api/"+this.props.url
  

  /**Сортировка */

  /*const savedCoumnsSort = () => {
    return [{ columnName: 'date', direction: 'desc' }]

    //let storageColumnsOrder=localStorage.getItem(URL_orders)
    //return storageColumnsOrder?JSON.parse(storageColumnsOrder):m_props.columns_order
  }*/
  
  const savedCoumnsSort = () => {
    console.log(m_props.columns_sort)
    return [{ columnName: 'date', direction: 'desc' }]
    /*
    let storageColumnsSort=localStorage.getItem(URL_sort)
    return storageColumnsSort?JSON.parse(storageColumnsSort):m_props.columns_sort
    */
  /*const onChangeColumnOrder =(value) =>{
    localStorage.setItem(URL_orders, JSON.stringify(value));
    */
  }
  //const [sorting, setSorting] = useState(savedCoumnsSort)
  const onChangeSorting = (value) =>{
    localStorage.setItem(URL_sort, JSON.stringify(value));
  }

  /**Ширина колонок */
  const savedCoumnsWidth = () => {
    let storageColumnsWidth=localStorage.getItem(URL_widths)
    let column_width=[]    
    if(storageColumnsWidth){
      column_width=JSON.parse(storageColumnsWidth)
    }else{
      for(let itm in m_props.columns){
        let elem=m_props.columns[itm]
        column_width.push({columnName:elem["name"],width:elem["width"]})
      }
    }
    return column_width
  }
  const [defaultColumnWidths] = useState(savedCoumnsWidth);
  const onChangeColumnWidth = (value) =>{
    localStorage.setItem(URL_widths, JSON.stringify(value));
  } 
  /*----------------*/
  /**Порядок колонок */
  const savedCoumnsOrder = () => {
    let storageColumnsOrder=localStorage.getItem(URL_orders)
    return storageColumnsOrder?JSON.parse(storageColumnsOrder):m_props.columns_order
  }
  const [columnsOrder,setColumnsOrder] = useState(savedCoumnsOrder);
  const onChangeColumnOrder =(value) =>{
    localStorage.setItem(URL_orders, JSON.stringify(value));
  }
  /*----------------*/

  const getQueryString = () => {    
    let queryString = URL + m_props.customerID+"/";
    if (sorting.length) {
      const sortingConfig = sorting
        .map(({ columnName, direction }) => ({
          selector: columnName,
          desc: direction === 'desc',
        }));
      const sortingStr = JSON.stringify(sortingConfig);
      queryString = `${queryString}&sort=${escape(`${sortingStr}`)}`;
    }
    return queryString;

  };

  
  const loadData = () => {
    const queryString = getQueryString();
    if (queryString !== lastQuery && !loading) {
      setLoading(true);
      fetch(queryString)
        .then(response => response.json())
        .then((data)=>{
          setRows(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
      setLastQuery(queryString);
    }
  };
  
  useEffect(() => loadData());

  return (
    <div className="profile_info_table">
      <Grid
        rows={rows}
        columns={columns}
      >
        <PagingState currentPage={currentPage} onCurrentPageChange={setCurrentPage} pageSize={pageSize} />
        <SelectionState selection={selection} onSelectionChange={setSelection} />
        <SortingState sorting={sorting} onSortingChange={onChangeSorting} />
        <DragDropProvider />
        <IntegratedSelection />
        <IntegratedPaging />
        <Table rowComponent={rowClick} />
        <TableColumnResizing defaultColumnWidths={defaultColumnWidths} onColumnWidthsChange={onChangeColumnWidth}/>
        <TableHeaderRow showSortingControls/>
        <TableColumnReordering defaultOrder={columnsOrder} onOrderChange={onChangeColumnOrder}/>
        <TableSelection showSelectAll />
        <PagingPanel/>
        {loading && <Loading />}
      </Grid>

    </div>
  );
};
