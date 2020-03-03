import React, { useState, useEffect } from 'react';
import {
  SortingState, EditingState, PagingState, SummaryState,
  IntegratedPaging, IntegratedSorting, IntegratedSummary, SelectionState,IntegratedSelection
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table, TableHeaderRow, TableEditRow, TableEditColumn,
  PagingPanel, DragDropProvider, TableColumnReordering,
  TableFixedColumns, TableSummaryRow,TableColumnResizing,TableSelection 
} //from '@devexpress/dx-react-grid-bootstrap3';
from '@devexpress/dx-react-grid-bootstrap4';

const URL = '/api/customers/';

export default (m_props) => {
  //console.log(props)
  //props.showProfile(1)
  //const rowClick = (val) =>{
    //console.log(val)
  //}
  const rowClick = props => {
    const { value } = props;
    return (
      <Table.Cell {...props} onClick={() => //console.log(m_props)
        m_props.clickData(props.row.id)
      } />
    );
  };

  const [columns] = useState([
    { name: 'id', title: 'ID' },
    { name: 'name', title: 'Имя' },
    { name: 'phone', title: 'Телефон' },
    { name: 'dob', title: 'Дата рождения' },
  ]);
  const [rows, setRows] = useState([]); 
  const [tableColumnExtensions] = useState([
    { columnName: 'id', align: 'left',width:100},
    { columnName: 'name', align: 'left',width:100},
    { columnName: 'phone', align: 'left',width:100},
    { columnName: 'dob', align: 'left',width:100},
  ]);
  const [defaultColumnWidths] = useState([
    { columnName: 'id', width:50 },
    { columnName: 'name',width:100 },
    { columnName: 'phone',width:100 },
    { columnName: 'dob',width:100 },
  ]);

  //const [sorting, setSorting] = useState([{ columnName: 'name', direction: 'asc' }]);
  const [sorting, getSorting] = useState([]);
  const [selection, setSelection] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageSizes] = useState([5, 10, 15]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState();
  const [columnOrder, setColumnOrder] = useState([]);
  const changePageSize = (value) => {
    const totalPages = Math.ceil(totalCount / value);
    const updatedCurrentPage = Math.min(currentPage, totalPages - 1);

    setPageSize(value);
    setCurrentPage(updatedCurrentPage);
  };

  const getQueryString = () => {
    //let queryString = `${URL}&take=${pageSize}&skip=${pageSize * currentPage}`;
    let queryString = `${URL}`;

    if (sorting.length) {
      const sortingConfig = sorting
        .map(({ columnName, direction }) => ({
          selector: columnName,
          desc: direction === 'desc',
        }));
      const sortingStr = JSON.stringify(sortingConfig);
      //queryString = `${queryString}&sort=${escape(`${sortingStr}`)}`;
      queryString = `${queryString}`;
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
          //console.log(data)
          setRows(data);
        })
        /*
        .then(({ data, totalCount: newTotalCount }) => {
          setRows(data);
          //setTotalCount(newTotalCount);
          //setLoading(false);
        })*/
        .catch(() => setLoading(false));
      setLastQuery(queryString);
    }
  };

  useEffect(() => loadData());

  return (
    <div>
      <Grid rows={rows} columns={columns}>
        <SelectionState
          selection={selection}
          onSelectionChange={setSelection}
        />
        <SortingState
          defaultSorting={[{ columnName: 'id', direction: 'asc' }]}
        />
        <DragDropProvider />
        <IntegratedSelection />
        <Table columnExtensions={tableColumnExtensions} cellComponent={rowClick}/>
        <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
        <IntegratedSorting />
        <TableHeaderRow showSortingControls/>
        
        <TableSelection showSelectAll rowComponent={rowClick}/>
        <TableColumnReordering
          defaultOrder={['id','name', 'phone', 'dob']}
         
        />

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