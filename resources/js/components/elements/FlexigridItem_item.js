import React, { useState, useEffect } from 'react';
import {PagingState,DataTypeProvider,CurrencyTypeProvider,
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
  const URL = "api/" + m_props.url + "/";
  const URL_orders = m_props.url + "_orders";
  const URL_widths = m_props.url + "_widths";
  const URL_sorts = m_props.url + "_sorts";

  /**/
  const rowClick = props => {
    
    const { value } = props;
    return (
      <Table.Row {...props} onClick={() =>
        m_props.clickRowData(rows.find(op => {return op.id === props.row.id}))
      } />
    );
  };
  
  const [columns] = useState(m_props.columns);
  const [tableColumnExtensions] = useState(m_props.columns);
  
  const [rows, setRows] = useState([]); 

  //
  
  //const [sorting, setSorting] = useState([])
  const [selection, setSelection] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageSizes] = useState([5, 10, 15]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState();
  //const [columnOrder, setColumnOrder] = useState([]);
  //const url = "api/"+this.props.url
  

  /*Сортировка колонок*/
  const savedCoumnsSort = () => {
    let storageColumnsSort=localStorage.getItem(URL_sorts)
    let column_sort=[]
    if(storageColumnsSort){
      column_sort=JSON.parse(storageColumnsSort)
    }else{
      for(let itm in m_props.columns){
        let elem=m_props.columns[itm]
        column_sort.push({columnName:elem["columnName"],sort:elem["order"]})
      }
    }
    return column_sort
  }
  const [sorting, setSorting] = useState(savedCoumnsSort);


  /*Ширина колонок*/
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
  const onChangeColumnWidth =(value) =>{
    localStorage.setItem(URL_widths, JSON.stringify(value));
  } 
  /*----------------*/
  /*Порядок колонок */
  const savedCoumnsOrder = () => {
    let storageColumnsOrder=localStorage.getItem(URL_orders)
    let column_order=[]
    if(storageColumnsOrder){
      column_order=JSON.parse(storageColumnsOrder)
    }else{
      for(let itm in m_props.columns){
        let elem=m_props.columns[itm]
        column_order.push(elem["name"])
      }
    }
    return column_order;
  }
  
  const [columnsOrder,setColumnsOrder] = useState(savedCoumnsOrder);
  const onChangeColumnOrder = (value) =>{
    localStorage.setItem(URL_orders, JSON.stringify(value));
  }
  /*----------------*/

  /**форматирование колонок с датами */
  const currentDatesColumns = () => {
    let currentDates=[]
    for(let itm in m_props.columns){
      let elem=m_props.columns[itm]
      if(elem.type=="date"){
        currentDates.push(elem["name"])
      }
    }
    return currentDates
  }
  const [dateColumns] = useState(currentDatesColumns);
  const DateFormatter = ({ value }) => value?value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1'):'';
  const DateTypeProvider = props => (
    <DataTypeProvider
      formatterComponent={DateFormatter}
      {...props}
    />
  );

  /**форматирование колонок с ценами */ 
  const currentCurrenciesColumns = () => {
    let currentCurrencies=[]
    for(let itm in m_props.columns){
      let elem=m_props.columns[itm]
      if(elem.type=="currency"){
        currentCurrencies.push(elem["name"])
      }
    }
    return currentCurrencies
  }
  const [currencyColumns] = useState(currentCurrenciesColumns);
  const CurrencyFormatter = ({ value }) => (
      value?value.toLocaleString('ru-RU')+" Р":''
  );
  const CurrencyTypeProvider = props => (
    <DataTypeProvider
      formatterComponent={CurrencyFormatter}
      {...props}
    />
  );
  const noDataMsg = !loading ? { noData: "Нет данных" } : { noData: "Загрузка..." }
  const pagingMsg = {info:"{from}-{to} из {count}"}
  

  const getQueryString = () => {    
    let queryString = URL + m_props.customerID+"/";
    if (sorting.length) {
      const sortingConfig = sorting
        .map(({ columnName, direction }) => ({
          columnName: columnName,
          direction: direction,
        }));
      const sortingStr = JSON.stringify(sortingConfig);
      localStorage.setItem(URL_sorts, sortingStr);
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
        <SortingState sorting={sorting} onSortingChange={setSorting} />
        <DragDropProvider />
        <IntegratedSelection />
        <IntegratedPaging />
        <DateTypeProvider for={dateColumns}/>
        <CurrencyTypeProvider for={currencyColumns}/>
        <Table rowComponent={rowClick} messages={noDataMsg}/>
        <TableColumnResizing /*resizingMode={"nextColumn"}*/ defaultColumnWidths={defaultColumnWidths} onColumnWidthsChange={onChangeColumnWidth}/>
        <TableHeaderRow showSortingControls/>
        <TableColumnReordering defaultOrder={columnsOrder} onOrderChange={onChangeColumnOrder}/>
        <TableSelection showSelectAll />
        <PagingPanel messages={pagingMsg}/>
        {loading && <Loading />}
      </Grid>

    </div>
  );
};
