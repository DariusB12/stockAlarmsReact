

export default function List({items,className,...otherProps}){
    return <ul className={className} {...otherProps}>
        {items}
    </ul>
}