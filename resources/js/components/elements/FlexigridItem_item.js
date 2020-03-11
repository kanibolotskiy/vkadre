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


export default (m_props) => {
  const URL = m_props.url;
  const rowClick = props => {
    const { value } = props;
    return (
      <Table.Cell {...props} onClick={() =>
        m_props.clickData(props.row.id)
      } />
    );
  };

  const [columns] = useState(m_props.columns);
  const [tableColumnExtensions] = useState(m_props.columnExt);

  const [rows, setRows] = useState([]); 
  const [defaultColumnWidths] = useState(m_props.columnWidth);

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
    let queryString = `${URL}`+m_props.customerID;

    if (sorting.length) {
      const sortingConfig = sorting
        .map(({ columnName, direction }) => ({
          selector: columnName,
          desc: direction === 'desc',
        }));
      const sortingStr = JSON.stringify(sortingConfig);
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
          setRows(data);
        })
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
          defaultOrder={['date','record', 'base']}
         
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