
export default function EditAlarmBox({currentPrice,symbol,initialPrice,variance,target,active,inputTargetRef,inputActiveRef,onClose,onClickEdit}){
    return <>
                <div className="editAlarmBox">
                    <div className="closeButton">
                        <button id="closeButton" onClick={onClose}>X</button>
                    </div>
                    <p id="editAlarmBoxCurrentPrice">CurrentPrice:{currentPrice}</p>
                    <div className="headerEditAlarmBox">
                        <p>Symbol:{symbol}</p>
                        <p>InitialPrice:{initialPrice}</p>
                        <p className={variance.toString().startsWith("-") ? "alarmVarianceNegative" : "alarmVariancePositive"}>Variance:{variance}%</p>
                        <p className={target.toString().startsWith("-") ? "alarmTargetNegative" : "alarmTargetPositive"}>Target:{target}%</p>
                        <p className={active ? "alarmActive" : "alarmNonActive"}>Active:{active == "true" || active? "yes":"no"}</p>
                        </div>

                    <div className="bodyEditAlarmBox">
                        <div className="alarmEditBoxTargetDiv">
                            <p>New Target:</p>
                            <input className="alarmEditBoxInputTarget" ref={inputTargetRef} type="number" placeholder="new target"  step="0.01"/>
                            <p>%</p>
                        </div>
                        <div className="alarmEditBoxCheckBoxDiv">
                            <p>Mark if Active:</p>
                            <input className="alarmEditBoxInputCheckBox" ref={inputActiveRef} type="checkBox" />
                        </div>
                    </div>
                    <button id="alarmEditBoxButtonEditAlarm" onClick={onClickEdit}>EditAlarm</button>
                </div>
            </>
}