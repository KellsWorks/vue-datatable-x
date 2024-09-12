interface HeaderStyle {
    uppercase?: boolean;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    color?: string;
}

type HeaderPosition = 'left' | 'right' | 'center';

type Header = {
    text: string;
    value: string;
    sort?: boolean;
    sortBy?: string;
    style?: HeaderStyle;
    position?: HeaderPosition;
    rowSpan?: number;
    colSpan?: number;
}

type TableStyle = {
    backgroundColor?: string;
    borderColor?: string;
    borderStyle?: string;
    borderWidth?: number;
    borderRadius?: number;
}

interface ItemStyle {
    backgroundColor?: string;
    textColor?: string;
    fontSize?: number;
    fontWeight?: number;
    fontFamily?: string;
    textAlign?: 'left' | 'center' | 'right';
    padding?: number;
    margin?: number;
}

type Value = string | number | boolean | Date;

type TableItem = {
    [key: string]: Value;
    isClickable?: boolean;
    onClick?: () => void;
    style?: ItemStyle;
}

type Striped = {
    show?: boolean;
    position?: "skip-first" | "show-first"
}

export {
    Striped,
    Header,
    HeaderStyle,
    TableStyle,
    TableItem
}