export interface TableColumn {
  key: string;
  label: string;
  className?: string;
}

export interface TableRow {
  [key: string]: string | number | React.ReactNode;
}

export interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  className?: string;
  onRowClick?: (row: TableRow) => void;
}