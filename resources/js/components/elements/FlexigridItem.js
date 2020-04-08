import React, { useState, useEffect } from 'react';
import {
  SortingState, EditingState, PagingState, SummaryState, DataTypeProvider, CurrencyTypeProvider,
  IntegratedPaging, IntegratedSorting, IntegratedSummary, SelectionState,IntegratedSelection,
  CustomPaging
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table, TableHeaderRow, TableEditRow, TableEditColumn,
  PagingPanel, DragDropProvider, TableColumnReordering,
  TableFixedColumns, TableSummaryRow,TableColumnResizing,TableSelection,
  ColumnChooser,TableColumnVisibility,Toolbar
} //from '@devexpress/dx-react-grid-bootstrap3';
from '@devexpress/dx-react-grid-bootstrap4';
import Loading from '../elements/Loading.js'


export default (m_props) => {
  const URL = m_props.url;
  const URL_widths = m_props.url+"_width"
  const URL_orders = m_props.url+"_order"
  const URL_sorts = m_props.url+"_sort"
  const URL_hides = m_props.url+"_hide"

  
  /*
  someFunction = (text) => {
    console.log('Message from parent: ', text);
  }
  
  const [dataRows, setDataRows] = useState(m_props);
  const setDataRows = (props) =>{
    /*
if(m_props.updateTableFlag){
    console.log("update_data_flag="+m_props.updateTableFlag)
    //console.log(m_props)
    m_props.updateTableFlagFunction()
  }
    
  }
  */
 useEffect(() => {
  if(m_props.updateTableFlag){
    setLastQuery("");
    m_props.updateTableFlagFunction()
  }
}, [m_props]);

  
 const rowClick = props => {
  const { value } = props;
  return (
    <Table.Row {...props} onClick={() =>
      //console.log("props.row.id="+props.row.id)
      //m_props.clickRowData(props.row.id)
      //m_props.clickData(props.row.id)
      m_props.clickData(props.row)
    } />
  );
};

  const [columns] = useState([
    { name: 'id', title: 'ID', width:30 },
    { name: 'fullname', title: 'Имя', width:100 },
    { name: 'dob', title: 'Дата рождения', width:100 },
    { name: 'martial', title: 'Семейное положение', width:100 },
    { name: 'gender', title: 'Пол', width:100 },
    { name: 'mobphone', title: 'Мобильный телефон', width:100 },
    { name: 'phone', title: 'Телефон', width:100 },
    { name: 'address_reg', title: 'Адрес регистрации', width:100 },
    { name: 'index_address_reg', title: 'Индекс адреса регистрации', width:100 },
    { name: 'address_res', title: 'Адрес проживания', width:100 },
    { name: 'index_address_res', title: 'Индекс адреса проживания', width:100 },
    { name: 'passport_number', title: 'Серия и номер паспорта', width:100 },
    { name: 'passport_issuedby', title: 'Кем выдан', width:100 },
    { name: 'passport_date', title: 'Дата выдачи', width:100 },
    { name: 'bpl', title: 'Место рождения', width:100 },
    { name: 'inn', title: 'ИНН налогоплательщика', width:100 },
    { name: 'insurance_number', title: '№ страхового свидетельства', width:100 },
    { name: 'medical_number', title: '№ медицинского полюса', width:100 },
    { name: 'education', title: 'Образование', width:100 },
    { name: 'education_cap', title: 'Название учебного учреждения', width:100 },
    { name: 'education_speciality', title: 'Специальность', width:100 },
    { name: 'status', title: 'Статус', width:100 },
    { name: 'military_number', title: 'Номер военного билета', width:100 },
    { name: 'military_place', title: 'Место прохождение службы', width:100 },
    { name: 'criminal', title: 'Судимость', width:100 },
    { name: 'criminal_desc', title: 'Статья и срок', width:100 },
    { name: 'characteristic', title: 'Характеристика', width:100 },


    { name: 'subdivision', title: 'Подразделение', width:100 },
    { name: 'department', title: 'Отдел', width:100 },
    { name: 'position', title: 'Должность', width:100 },
    { name: 'custstatus', title: 'Статус сотрудника', width:100 },
    { name: 'empl_date', title: 'Дата приема на работу', width:100 },
    { name: 'unempl_date', title: 'Дата увольнения', width:100 },

    { name: 'exp1', title: 'Общий стаж работы', width:100 },
    { name: 'exp2', title: 'Непрерывный стаж', width:100 },
    { name: 'exp3', title: 'Стаж работы в компании', width:100 },
    { name: 'curator', title: 'Куратор сотрудника', width:100 },

    { name: 'salary', title: 'Оклад', width:100 },
    { name: 'salary_add', title: 'Надбавка в %', width:100 },
    { name: 'salary_summ', title: 'Оклад с надбавкой', width:100 },
    { name: 'prize_perc', title: 'Премия в %', width:100 },
    { name: 'prize', title: 'Премия', width:100 },
    { name: 'vacation_base', title: 'Основной отпуск', width:100 },
    { name: 'vacation_add', title: 'Дополнительный отпуск', width:100 },
    
  

  ]);

  const [defaultHiddenColumnNames] = useState(['gender', 'phone']);
  /**Форматирование колонок с датами */
  const [dateColumns] = useState([
    "dob","empl_date","unempl_date","exp1","exp2","exp3"
  ]);


  const DateFormatter = ({ value }) => value?value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1'):'';
  const DateTypeProvider = props => (
    <DataTypeProvider
      formatterComponent={DateFormatter}
      {...props}
    />
  );

  /**форматирование колонок с ценами */ 
  const [currencyColumns] = useState(["salary","salary_add","salary_summ","prize"]);
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
  //const [sorting, getSorting] = useState([]);
  const [selection, setSelection] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  //const [pageSizes] = useState([5, 10, 15]);
  const [currentPage, setCurrentPage] = useState(0);


  const [lastQuery, setLastQuery] = useState();
  const [columnOrder, setColumnOrder] = useState([]);
  const noDataMsg = !loading ? { noData: "Нет данных" } : { noData: "Загрузка..." }
  const pagingMsg = {info:"{from}-{to} из {count}"}
  /*
  const changePageSize = (value) => {
    const totalPages = Math.ceil(totalCount / value);
    const updatedCurrentPage = Math.min(currentPage, totalPages - 1);
    setPageSize(value);
    setCurrentPage(updatedCurrentPage);
  };
  */

  const getQueryString_main = () => {    
    
    let queryString = "api/"+URL+"/" ;
    //console.log(queryString)
    if (sorting.length) {
      const sortingConfig = sorting
        .map(({ columnName, direction }) => ({
          columnName: columnName,
          direction: direction,
        }));
      const sortingStr = JSON.stringify(sortingConfig);
      localStorage.setItem(URL_sorts, sortingStr);
      //queryString = `${queryString}&sort=${escape(`${sortingStr}`)}`;
      const filterParam={
        searchName:m_props.searchName
      }
      var filterParamUrl=JSON.stringify(filterParam);

      queryString = `${queryString}&filter=${filterParamUrl}/&sort=${escape(`${sortingStr}`)}&take=${pageSize}&page=${currentPage}`;
      

    }
    return queryString;
  };
  
  const loadData_main = () => {
    const queryString = getQueryString_main();
    if (queryString !== lastQuery && !loading) {
      setLoading(true);
      fetch(queryString)
        .then(response => response.json())
        .then((data)=>{
          //console.log(data["total"])
          setRows(data["data"]);
          setTotalCount(data["total"]);
          setLoading(false);
        })
        .catch(() => setLoading(false));
      setLastQuery(queryString);
    }
  };
  
  useEffect(() => loadData_main());


/*Показывать колонки */
const savedCoumnsHide = () => {
  let saved_column_hide=JSON.parse(localStorage.getItem(URL_hides))
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

/*Сортировка колонок*/
const savedCoumnsSort = () => {
  
  let storageColumnsSort=localStorage.getItem(URL_sorts)
  console.log(storageColumnsSort)
  
  let column_sort=[]
  if(storageColumnsSort){
    column_sort=JSON.parse(storageColumnsSort)
  }else{
    for(let itm in m_props.columns){
      let elem=m_props.columns[itm]
      //column_sort.push({columnName:elem["columnName"],sort:elem["order"]})
    }
  }
  return column_sort
}
const [sorting, setSorting] = useState(savedCoumnsSort);

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
}
*/
const onToggles=(item,func)=>{
  //console.log(item)

  let stored_column_hide=[]
  //let saved_column_hide=JSON.parse(localStorage.getItem(URL_hides))
  if(localStorage.getItem(URL_hides)){
    stored_column_hide=JSON.parse(localStorage.getItem(URL_hides))
  }
  let item_name=item.column.name
  
  if(!item.hidden){ //добавить
    stored_column_hide.push(item_name)
  }else{//удалить
    var index = stored_column_hide.indexOf(item_name);
    if (index > -1) {
      stored_column_hide.splice(index, 1);
    }
  }
  localStorage.setItem(URL_hides, JSON.stringify(stored_column_hide));
  func()

}

const ChooserButton = ({item, disabled,onToggle}) => (
  <button className={"btn btn_chooser "+(item.hidden?'_hidden':'')} title={item.column.title} >
    <label htmlFor={"chooser_"+item.column.name}>
      <input onChange={()=>onToggles(item,onToggle)}  type="checkbox" checked={!item.hidden} id={"chooser_"+item.column.name}/>
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
          <SortingState sorting={sorting} onSortingChange={setSorting} />
          <PagingState currentPage={currentPage} onCurrentPageChange={setCurrentPage} pageSize={pageSize} />
          <DragDropProvider />
          <IntegratedSelection />
          <Table rowComponent={rowClick}  messages={noDataMsg}/>
          <TableColumnResizing defaultColumnWidths={defaultColumnWidths} onColumnWidthsChange={onChangeColumnWidth} />
          <IntegratedSorting />
          <TableHeaderRow showSortingControls/>
          <TableColumnVisibility hiddenColumnNames={hiddenColumnNames} onHiddenColumnNamesChange={setHiddenColumnNames}/>
          
          <Toolbar />
          <ColumnChooser itemComponent={ChooserButton} />
          <DateTypeProvider for={dateColumns}/>
          <CurrencyTypeProvider for={currencyColumns}/>
          <TableSelection showSelectAll rowComponent={rowClick}/>
          <TableColumnReordering defaultOrder={columnsOrder} onOrderChange={onChangeColumnOrder}/>
          <PagingPanel messages={pagingMsg}/>

          <CustomPaging
            totalCount={totalCount}
          />

          {loading && <Loading />}

        </Grid>
    </div>
    )
}

/*



*/