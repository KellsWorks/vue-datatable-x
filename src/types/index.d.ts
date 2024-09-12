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

export {
    Header,
    HeaderStyle,
    TableStyle
}