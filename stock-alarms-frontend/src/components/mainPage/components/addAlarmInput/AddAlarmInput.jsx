
export default function AddAlarmInput({symbol,currentPrice,onClickCancel,onClickAdd}){
    return <div className="addAlarmInputMain">
            <div className="addAlarmSymbolContainer">
                <p>Symbol:</p> 
                <p>{symbol}</p>
            </div>
            <div className="addAlarmCurrentPriceContainer">
                <p>Price:</p> 
                <p>{currentPrice}</p>
            </div>
                
            <div className="inputTargetMain">
                <p>Target:</p>
                <input className="inputTarget" step="0.01" type="number"/>
                <p>%</p>
            </div>
            <button id="addAalarmBtnCancel" className="addAlarmButton" onClick={onClickCancel}>Cancel</button>
            <button id="addAalarmBtnAdd" className="addAlarmButton" onClick={onClickAdd}>Add</button>

    </div>
}