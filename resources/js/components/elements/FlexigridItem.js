import React, { useState, useEffect } from 'react';
import {
  SortingState, EditingState, PagingState, SummaryState, DataTypeProvider, CurrencyTypeProvider,
  IntegratedPaging, IntegratedSorting, IntegratedSummary, SelectionState,IntegratedSelection
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table, TableHeaderRow, TableEditRow, TableEditColumn,
  PagingPanel, DragDropProvider, TableColumnReordering,
  TableFixedColumns, TableSummaryRow,TableColumnResizing,TableSelection,
  ColumnChooser,TableColumnVisibility,Toolbar,
} //from '@devexpress/dx-react-grid-bootstrap3';
from '@devexpress/dx-react-grid-bootstrap4';
import Loading from '../elements/Loading.js'


export default (m_props) => {
  const URL = m_props.url;
  const URL_widths = m_props.url+"_width"
  const URL_orders = m_props.url+"_order"

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
    { name: 'mobphone', title: 'Мобильный телефон', width:100 },
    { name: 'phone', title: 'Телефон', width:100 },
  ]);

  const [defaultHiddenColumnNames] = useState(['gender', 'phone']);
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

  /*
  const [tableColumnExtensions] = useState([
    { columnName: 'id', align: 'left',width:50},
    { columnName: 'name', align: 'left',width:100},
    { columnName: 'dob', align: 'left',width:100},
  ]);
  */
  

  /*Ширина колонок*/
  const savedCoumnsWidth = () => {
    let column_width=[]
    let stored_width=null
    let stored_column_add=JSON.parse(localStorage.getItem(URL_widths))
    let stored_column_width=stored_column_add?stored_column_add:[]
    for(let itm in columns){
        let elem=columns[itm]
        stored_width=stored_column_width.find(op => {
          return op.columnName === elem.name
        })
        if(stored_width==undefined){
          stored_width={columnName:elem["name"],width:elem["width"]}
        }
        column_width.push(stored_width)
    }
    return column_width
  }
  const [defaultColumnWidths] = useState(savedCoumnsWidth);
  const onChangeColumnWidth =(value) =>{
    localStorage.setItem(URL_widths, JSON.stringify(value));
  } 

  /*Порядок колонок */
  const savedCoumnsOrder = () => {
    let column_order=[]
    for(let itm in columns){
      column_order.push(columns[itm]["name"])
    }
    
    return column_order;
  }
  
  const [columnsOrder,setColumnsOrder] = useState(savedCoumnsOrder);
  const onChangeColumnOrder = (value) =>{
    localStorage.setItem(URL_orders, JSON.stringify(value));
  }
  /*----------------*/


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


/*Показывать колонки */
const savedCoumnsHide = () => {
  let saved_column_hide=JSON.parse(localStorage.getItem(URL_widths))
  let stored_column_hide=[]
  if(saved_column_hide){
    stored_column_hide=saved_column_hide
  }
  
  //console.log(stored_column_hide)
  /*let column_hide=[]
  for(let itm in columns){
    column_order.push(columns[itm]["name"])
  }
  */
  return stored_column_hide;
}

//const [columnsOrder,setColumnsOrder] = useState(savedCoumnsOrder);
const [hiddenColumnNames,setHiddenColumnNames] = useState(savedCoumnsHide);
/*
const setHiddenColumnNames = (column) =>{
  return column
  console.log(column)
  //[hiddenColumnNames]=column
  //hiddenColumnNames.push(column[0])
  //this.setState({hiddenColumnNames:["dob"]})
  //..props
  //console.log(column+"="+value)
  
  //localStorage.setItem(URL_hides, JSON.stringify(value));
}

const onToggle=(event)=>{
  console.log(event)
}*/
const ChooserButton = ({item, disabled,onToggle}) => (
  <button className={"btn btn_chooser "+(item.hidden?'_hidden':'')}  >
    <label htmlFor={"chooser_"+item.column.name}>
      <input onChange={onToggle}  type="checkbox" checked={!item.hidden} id={"chooser_"+item.column.name}/>
      <div>{item.column.title}</div>
    </label>
  </button>
);

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
          <Table rowComponent={rowClick}  messages={noDataMsg}/>
          <TableColumnResizing defaultColumnWidths={defaultColumnWidths} onColumnWidthsChange={onChangeColumnWidth} />
          <IntegratedSorting />
          <TableHeaderRow showSortingControls/>
          <TableColumnVisibility
            hiddenColumnNames={hiddenColumnNames}
            onHiddenColumnNamesChange={setHiddenColumnNames}
            //defaultHiddenColumnNames={storeHiddenColumnNames}

            //hiddenColumnNames={hiddenColumnNames}
            //hiddenColumnNames={["gender"]}
            //onHiddenColumnNamesChange={setHiddenColumnNames}
          />
          <Toolbar />
          <ColumnChooser itemComponent={ChooserButton} />
          <DateTypeProvider for={dateColumns}/>
          <CurrencyTypeProvider for={currencyColumns}/>
          <TableSelection showSelectAll rowComponent={rowClick}/>
          <TableColumnReordering defaultOrder={columnsOrder} onOrderChange={onChangeColumnOrder}/>
          {loading && <Loading />}

        </Grid>
    </div>
    )
}

/*



*/