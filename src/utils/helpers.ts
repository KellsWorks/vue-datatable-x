import { TableItem } from "../types";

export const sortColumn = (
    items: TableItem[],
    column: string,
    direction: 'asc' | 'desc' = 'asc'
  ): TableItem[] => {
    return [...items].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];
  
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return direction === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
  
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return direction === 'asc' ? valueA - valueB : valueB - valueA;
      }
  
      if (valueA instanceof Date && valueB instanceof Date) {
        return direction === 'asc'
          ? valueA.getTime() - valueB.getTime()
          : valueB.getTime() - valueA.getTime();
      }
      return 0;
    });
  };
  
  export const toggleSortDirection = (
    currentDirection: 'asc' | 'desc' | undefined
  ): 'asc' | 'desc' => {
    return currentDirection === 'asc' ? 'desc' : 'asc';
  };

export const onSearch = (data: TableItem[], searchValue: string = "", searchTerm: string) => {
    if (!searchValue) return data;
      return data.filter((item) => {
        const value = item[searchTerm]?.toString().toLowerCase();
        return value?.includes(searchValue.toLowerCase());
    });
}