
export default function Button({value,onClick,className,...otherProps}){
    return <button onClick={onClick} className={className} {...otherProps}>
        {value}
    </button>
}