import React, { useState, useEffect } from 'react';
import {
  SortingState, EditingState, PagingState, SummaryState, DataTypeProvider, CurrencyTypeProvider,
  IntegratedPaging, IntegratedSorting, IntegratedSummary, SelectionState,IntegratedSelection
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table, TableHeaderRow, TableEditRow, TableEditColumn,
  PagingPanel, DragDropProvider, TableColumnReordering,
  TableFixedColumns, TableSummaryRow,TableColumnResizing,TableSelection 
} //from '@devexpress/dx-react-grid-bootstrap3';
from '@devexpress/dx-react-grid-bootstrap4';
import Loading from '../elements/Loading.js'

export default (m_props) => {
  const URL = m_props.url;
  const URL_widths = m_props.url+"_width"

 const rowClick = props => {
  const { value } = props;
  return (
    <Table.Row {...props} onClick={() =>
      //console.log("props.row.id="+props.row.id)
      //m_props.clickRowData(props.row.id)
      m_props.clickData(props.row.id)
    } />
  );
};


  const [columns] = useState([
    { name: 'id', title: 'ID', width:30 },
    { name: 'name', title: 'Имя', width:100 },
    { name: 'dob', title: 'Дата рождения', width:100 },
    { name: 'martial', title: 'Семейное положение', width:100 },
    { name: 'gender', title: 'Пол', width:100 },
  ]);

  /**Форматирование колонок с датами */
  const [dateColumns] = useState([
    "dob"
  ]);
  const DateFormatter = ({ value }) => value?value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1'):'';
  const DateTypeProvider = props => (
    <DataTypeProvider
      formatterComponent={DateFormatter}
      {...props}
    />
  );

  /**форматирование колонок с ценами */ 
  const [currencyColumns] = useState([]);
  const CurrencyFormatter = ({ value }) => (
      value?value.toLocaleString('ru-RU')+" Р":''
  );
  const CurrencyTypeProvider = props => (
    <DataTypeProvider
      formatterComponent={CurrencyFormatter}
      {...props}
    />
  );

  const [rows, setRows] = useState([]); 
  const [loading, setLoading] = useState(false);


  const [tableColumnExtensions] = useState([
    { columnName: 'id', align: 'left',width:50},
    { columnName: 'name', align: 'left',width:100},
    { columnName: 'dob', align: 'left',width:100},
  ]);
  

  /*Ширина колонок*/
  const savedCoumnsWidth = () => {
    let storageColumnsWidth=localStorage.getItem(URL_widths)
    let column_width=[]    
    if(storageColumnsWidth){
      column_width=JSON.parse(storageColumnsWidth)
    }else{
      for(let itm in columns){
        let elem=columns[itm]
        column_width.push({columnName:elem["name"],width:elem["width"]})
      }
    }
    return column_width
  }
  const [defaultColumnWidths] = useState(savedCoumnsWidth);
  const onChangeColumnWidth =(value) =>{
    localStorage.setItem(URL_widths, JSON.stringify(value));
  } 



  //const [sorting, setSorting] = useState([{ columnName: 'name', direction: 'asc' }]);
  const [sorting, getSorting] = useState([]);
  const [selection, setSelection] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageSizes] = useState([5, 10, 15]);
  const [currentPage, setCurrentPage] = useState(0);


  const [lastQuery, setLastQuery] = useState();
  const [columnOrder, setColumnOrder] = useState([]);
  const noDataMsg = !loading ? { noData: "Нет данных" } : { noData: "Загрузка..." }
  /*
  const changePageSize = (value) => {
    const totalPages = Math.ceil(totalCount / value);
    const updatedCurrentPage = Math.min(currentPage, totalPages - 1);
    setPageSize(value);
    setCurrentPage(updatedCurrentPage);
  };
  */

  const getQueryString = () => {    
    let queryString = "api/"+URL ;
    if (sorting.length) {
      const sortingConfig = sorting
        .map(({ columnName, direction }) => ({
          selector: columnName,
          order: direction,
        }));
      const sortingStr = JSON.stringify(sortingConfig);
      console.log(sortingStr)
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
    <div>
      <Grid 
        rows={rows} 
        columns={columns}
      >
        <SelectionState selection={selection} onSelectionChange={setSelection} />
        <SortingState defaultSorting={[{ columnName: 'id', direction: 'asc' }]} />
        <DragDropProvider />
        <IntegratedSelection />
        <Table columnExtensions={tableColumnExtensions} rowComponent={rowClick}  messages={noDataMsg}/>
        <TableColumnResizing defaultColumnWidths={defaultColumnWidths} onColumnWidthsChange={onChangeColumnWidth} />
        <IntegratedSorting />
        <TableHeaderRow showSortingControls/>
        <DateTypeProvider for={dateColumns}/>
        <CurrencyTypeProvider for={currencyColumns}/>
        <TableSelection showSelectAll rowComponent={rowClick}/>
        <TableColumnReordering defaultOrder={['id','name', 'phone', 'dob']}/>
        {loading && <Loading />}

      </Grid>
      </div>
  );
};

/*
  <SortingState
    sorting={sorting}
    onSortingChange={setSorting}
  />
  <PagingState
    currentPage={currentPage}
    onCurrentPageChange={setCurrentPage}
    pageSize={pageSize}
    onPageSizeChange={changePageSize}
  />
  <CustomPaging
    totalCount={totalCount}
  />
  <Table
    columnExtensions={tableColumnExtensions}
  />
  <TableHeaderRow showSortingControls />
  <PagingPanel
    pageSizes={pageSizes}
  />
*/