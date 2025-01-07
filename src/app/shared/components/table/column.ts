export interface Column {
  columnDef: string;
  header: string;
  cell: Function;
  type?: 'text' | 'link' | 'image';
  url?: string;
}
