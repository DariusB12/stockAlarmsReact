
import List from "../../../utils/list/List"

export default function AlarmsListContainer({items}){
    return <div className="alarmsListContainer">
            <div className="alarmsListContainerNames">
                <p>Symbol</p>
                <p>InitialPrice</p>
                <p>Variance</p>
                <p>Target</p>
                <p>Active</p>
            </div>
            <List className="listAlarms" items={items}/>
    </div>
}