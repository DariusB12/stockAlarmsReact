
export default function Alarm({symbol,initialPrice,variance,target,active,handleEdit,handleDelete}){

    return <div className="alarmContainer">
        <div className="alarmContainerValues">
            <p>{symbol}</p>
            <p>{initialPrice}</p>
            <p>{variance}%</p>
            <p>{target}%</p>
            <p className={active == "true" ? "alarmActive" : "alarmNonActive"}>{active}</p>
        </div>
        
        <div className="alarmContainerButtons">
            <button onClick={handleEdit}><img src="\src\components\utils\materialSymbolsImgs\edit_24dp_E8EAED_FILL0_wght200_GRAD0_opsz24.png" alt="edit" /></button>
            <button onClick={handleDelete}><img src="\src\components\utils\materialSymbolsImgs\delete_24dp_E8EAED_FILL0_wght200_GRAD0_opsz24.png" alt="delete" /></button>
        </div>
    </div>
}  