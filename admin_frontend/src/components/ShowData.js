import React from 'react';
import { useState, useEffect } from "react";
import { MaterialReactTable } from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv'; //or use your library of choice here
import { fetchAll } from '../hooks/api';

const columns = [
  {
    accessorKey: 'name',
    header: '姓名',
    // size: 40,
  },
  {
    accessorKey: 'cardId',
    header: '身分證字號',
    // size: 80,
  },
  {
    accessorKey: 'frontImgURL',
    header: '健保卡正面',
    Cell: ({ cell }) => (cell.getValue() ? '有' : '無'),
    // size: 80,
  },
  {
    accessorKey: 'backImgURL',
    header: '健保卡反面',
    Cell: ({ cell }) => (cell.getValue() ? '有' : '無'),
    // size: 80,
  },
  {
    accessorKey: 'videoURL',
    header: '陳述影片',
    Cell: ({ cell }) => (cell.getValue() ? '有' : '無'),
  },
  {
    accessorKey: 'hasBeenReviewed',
    header: '審核狀態',
    Cell: ({ cell }) => (cell.getValue() ? '已審核' : '尚未審核'),
  },
  {
    accessorKey: 'comment',
    header: '審核結果',
  },
  {
    accessorKey: 'deleted',
    header: '放棄申請',
    Cell: ({ cell }) => (
      <div style={{ width: '20px' }}>
        <span>{cell.getValue() ? '是' : '否'}</span>
      </div>
    ),
  }  
];

const csvOptions = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  useBom: true,
  useKeysAsHeaders: false,
  headers: columns.map((c) => c.header),
};

const csvExporter = new ExportToCsv(csvOptions);

const Example = () => {
  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(data);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
      const fetchReservations = async() => {
          let { data } = await fetchAll();
          setData(data);
      }
    fetchReservations();
}, [])

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowSelection
      positionToolbarAlertBanner="bottom"
      renderTopToolbarCustomActions={({ table }) => (
        <Box
          sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
        >
          <Button
            color="primary"
            //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
            onClick={handleExportData}
            startIcon={<FileDownloadIcon />}
            variant="contained"
          >
            Export All Data
          </Button>
          <Button
            disabled={table.getPrePaginationRowModel().rows.length === 0}
            //export all rows, including from the next page, (still respects filtering and sorting)
            onClick={() =>
              handleExportRows(table.getPrePaginationRowModel().rows)
            }
            startIcon={<FileDownloadIcon />}
            variant="contained"
          >
            Export All Rows
          </Button>
          <Button
            disabled={table.getRowModel().rows.length === 0}
            //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
            onClick={() => handleExportRows(table.getRowModel().rows)}
            startIcon={<FileDownloadIcon />}
            variant="contained"
          >
            Export Page Rows
          </Button>
          <Button
            disabled={
              !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
            }
            //only export selected rows
            onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
            startIcon={<FileDownloadIcon />}
            variant="contained"
          >
            Export Selected Rows
          </Button>
        </Box>
      )}
    />
  );
};

export default Example;