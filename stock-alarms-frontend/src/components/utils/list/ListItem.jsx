

export default function ListItem({value,onClick,className,...otherProps}){
    return <li onClick={onClick} className={className} {...otherProps}>{value}</li>

}