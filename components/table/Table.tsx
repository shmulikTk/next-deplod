"use client"
import { useTable, useGlobalFilter, useSortBy, useFilters, usePagination, useRowSelect, HeaderGroup } from "react-table";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Pagination } from "../pagination/Pagination";
import Checkbox from "../checkbox/Checkbox";
import { GlobalFilter } from "./GlobalFilter";
import { DefaultColumnFilter } from "./DefaultColumnFilter";


interface TableProps {
    columns: any;
    data: any;
}



export default function Table({columns, data}: TableProps) {

    const { getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        page,
        prepareRow, 
        state, 
        setGlobalFilter, 
        preGlobalFilteredRows, 
        setFilter,

        selectedFlatRows,
        
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
    } =
    useTable({
      columns,
      data,
    }, useGlobalFilter, 
    useFilters, 
    useSortBy,
    
    usePagination,
    useRowSelect,
    hooks => {
        hooks.visibleColumns.push(columns => [
            {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
                <div>
                    <Checkbox {...getToggleAllRowsSelectedProps()} />
                </div>
            ),
            Cell: ({ row }) => (
                <div>
                    <Checkbox {...row.getToggleRowSelectedProps()} />
                </div>
            ),
            },
            ...columns,
        ])
        }
    );

    const { pageIndex, pageSize, selectedRowIds } = state;

    const handleSort = (column: HeaderGroup<object>) => {
        if (column.id !== 'selection' && column.id !== 'actions') {
            column.toggleSortBy(!column.isSortedDesc, true);
        }
    }
    

  return (
    <div className="overflow-x-auto w-full h-full flex flex-col justify-between">
        {/* <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
        />
        <DefaultColumnFilter setFilter={setFilter} columnName={'question'} /> */}
        <table {...getTableProps()} className="table">
            <thead>
                {headerGroups.map((headerGroup, i) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())} 
                          key={column.id}
                          onClick={() => handleSort(column)}
                      >
                        <div className="flex flex-row gap-2 items-center justify-between">
                            {column.render("Header")}
                            <div>
                                {column.isSorted
                                ? column.isSortedDesc
                                    ? <MdKeyboardArrowDown size={'20px'} />
                                    : <MdKeyboardArrowUp size={'20px'}  />
                                : ''}
                            </div>
                        </div>
                      </th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()} className={'max-h-screen'}>
                {page.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key={row.id}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()} key={cell.value}>
                                        {cell.render('Cell')}
                                       </td>;
                            })}
                        </tr>
                        );
                    })}
            </tbody>
        </table>

        <div>
        <Pagination 
            currentPage={pageIndex + 1} 
            onPageSelect={gotoPage} // whatever calls more data here
            total={preGlobalFilteredRows.length} 
            itemsPerPage={pageSize}
            nextPage={nextPage}
            previousPage={previousPage}
            setPageSize={setPageSize}
            />
        </div>
        {/* <pre>
          <code>
            {JSON.stringify(
              {
                selectedRowIds: selectedRowIds,
                'selectedFlatRows[].original': selectedFlatRows.map(
                  d => d.original
                ),
              },
              null,
              2
            )}
          </code>
        </pre> */}

    </div>
  )
}
