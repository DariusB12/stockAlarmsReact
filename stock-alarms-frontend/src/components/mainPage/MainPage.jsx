import { useState, useEffect, useRef } from "react";
import { getAllStockSymbols, getStockData } from "../../api/stock/StockService";
import { useLocation } from "react-router-dom";
import { addAlarm,deleteAlarm,getUsersAlarms,updateAlarm} from "../../api/alarm/AlarmService";

import ListItem from "../utils/list/ListItem";
import StockSymbolsContainer from "./components/stockSymbolsContainer/StockSymbolsContainer";
import MessageBox from "../utils/messageBox/MessageBox";
import StockInfoContainer from "./components/stockInfoContainer/StockInfoContainer";
import AddAlarmInput from "./components/addAlarmInput/AddAlarmInput";
import AlarmsListContainer from "./components/alarmsListContainer/AlarmsListContainer";
import Alarm from "../utils/alarm/Alarm"
import LoadingBox from "../utils/loadingBox/LoadingBox";
import EditAlarmBox from "../utils/editAlarmBox/EditAlarmBox";
import AreYouSureBox from "../utils/areYouSureBox/AreYouSureBox";

const POLLING_INTERVAL = import.meta.env.VITE_DATA_UPDATE_INTERVAL;

export default function MainPage(){
    // when I navigate to this page useLocation extracts the properties from the state of the useNavigate call
    const location = useLocation();
    const { username, password } = location.state;
    const inputTargetRef = useRef(null);
    const inputTargetEditAlarmBoxRef = useRef(null);
    const inputActiveEditAlarmBoxRef = useRef(null);

    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showEditAlarm,setShowEditAlarm] = useState(false);

    const [listStockSymbols,setListStockSymbols] = useState([]);
    const [addClicked,setAddClicked] = useState(false);
    const [listUsersAlarms,setListUsersAlarms] = useState([<p key="null" className="alarmsListNoAlarmCreated">No alarms created</p>]);

    const [symbol,setSymbol] = useState("");
    const [currentPrice,setCurrentPrice] = useState(null);
    const [editAlarmBoxValues,setEditAlarmBoxValues] = useState(null);
    const [areYouSure,setAreYouSure] = useState(null);

    const handleOnCloseMsgBox = () => {
        setShowMessage(false);
    }
    const handleOnClickSymbol = async (symbol) =>{
        setAddClicked(false);
        getStockData(username,password,symbol)
        .then((stock)=>{
            setSymbol(stock.symbol)
            setCurrentPrice(stock.currentPrice)
        })
        .catch((err)=>{
            setMessage(err.message)
            setSuccess(false);
            setShowMessage(true);
        })
    } 
    
    const handleEditBoxOnClickEdit = async (id)=>{
        //SEND REQUEST TO UPDATE THE ALARM
        const newTarget =inputTargetEditAlarmBoxRef.current.value;
        const newActive = inputActiveEditAlarmBoxRef.current.checked;
        setShowLoading(true);
        setShowEditAlarm(false);
        const alarmNew ={
            id : id,
            target: parseFloat(newTarget),
            active: newActive ? "true" : "false",
        };
        await updateAlarm(username,password,alarmNew)
        .then(()=>{
            setMessage("Alarm updated with success");
            setSuccess(true);
            setShowMessage(true);

            setShowLoading(false);

            updateListUsersAlarms();
        })
        .catch((err)=>{
            setShowLoading(false);
            
            setMessage(err.message)
            setSuccess(false);
            setShowMessage(true);
        })

    }
    const hanldeOnClickEditAlarm = (id,symbol,initialPrice,variance,target,active)=>{
        //REQUEST SERVER FOR CURRENT PRICE OF THE ALARM'S STOCK DATA SELECTED TO EDIT
        setShowLoading(true);
        getStockData(username,password,symbol)
        .then((stock)=>{
            setEditAlarmBoxValues({
                id : id,
                symbol:symbol,
                initialPrice:initialPrice,
                variance:variance,
                target:target,
                active:active,
                currentPrice:stock.currentPrice
            })
            setShowLoading(false);

            setShowEditAlarm(true);
        }).catch((err)=>{            
            setMessage(err.message)
            setSuccess(false);
            setShowMessage(true);

            setShowLoading(false);
        });
        
    }

    const handleOnClickCloseEditAlarmBox = ()=>{
        setShowEditAlarm(false);
    }
    const handleOnClickNo = ()=>{
        setAreYouSure(null);
    }
    const handleOnClickYes = async ()=>{
        //REQUEST SERVER DELETE ALARM
        setShowLoading(true);
        try{
            await deleteAlarm(username,password,areYouSure)
            setAreYouSure(null);
            setMessage("Alarm deleted with success");
            setSuccess(true);
            setShowMessage(true);
            
            setShowLoading(false);
        }catch(err){
            setMessage(err.message)
            setSuccess(false);
            setShowMessage(true);
            
            showLoading(false);
            setAreYouSure(null);
        }finally{
            updateListUsersAlarms();
        }
    }

    const hanldeOnClickDeleteAlarm = (id)=>{
        setAreYouSure(id);
    }

    const updateListUsersAlarms = async ()=>{
        try{
            const response = await getUsersAlarms(username,password,username)
            setListUsersAlarms(response.map((alarm)=>{
                return <Alarm key={alarm.id} symbol={alarm.symbol} initialPrice={alarm.initialPrice} 
                                            variance={alarm.variance} target={alarm.target} active={alarm.active}
                                            handleEdit={()=>hanldeOnClickEditAlarm(alarm.id,alarm.symbol,alarm.initialPrice,alarm.variance,alarm.target,alarm.active)} handleDelete={()=>hanldeOnClickDeleteAlarm(alarm.id)}/>;
            }));
        }catch(err){
            setShowLoading(false);
            
            setMessage(err.message)
            setSuccess(false);
            setShowMessage(true);
        }
    }
    
    const handleOnClickAdd = ()=>{
        setAddClicked(true);
    }
    const handleAddAlarmClickedCancel = ()=>{
        setAddClicked(false);
    }
    const handleAddAlarmClickedAdd = async (symbol,currentPrice)=>{
        setShowLoading(true);
        try {
            //symbol,initialPrice,target,email
            const target = inputTargetRef.current.value;
            const alarmDTO = {
                symbol : symbol,
                initialPrice: parseFloat(currentPrice),
                target: target === '' ? 0 : parseFloat(target),
                email: username,
            };
            
            await addAlarm(username,password,alarmDTO);
            setMessage("Alarm added with success");

            setSuccess(true);
            setShowMessage(true);
            setShowLoading(false);

            updateListUsersAlarms();
            
        } catch (err) {
            setShowLoading(false);
            
            setMessage(err.message)
            setSuccess(false);
            setShowMessage(true);
        }
        setAddClicked(false);
    }

    useEffect(()=>{
            getAllStockSymbols(username,password)
            .then(stockSymbols =>{
                    const stockSymbolsMapped = stockSymbols
                                .map(s=><ListItem key={s} className="listSymbolsItem" value={s} onClick={()=>handleOnClickSymbol(s)}/>)
                    setListStockSymbols(stockSymbolsMapped);

                })
            .catch((err)=>{
                setSuccess(false)
                setMessage("Error fetching symbols from server")
                setShowMessage(true)
            })
            updateListUsersAlarms();
            const milliseconds =  POLLING_INTERVAL * 1000; // Convert to milliseconds
            const intervalId = setInterval(fetchStockDataAndUsersList, milliseconds);

            return () => clearInterval(intervalId);
    },[])
    const fetchStockDataAndUsersList = ()=>{
        updateStockDataContainerIfShown();
        updateListUsersAlarms();
        // console.log("list user's alarms updated");

    }

    const updateStockDataContainerIfShown = ()=>{
        if(symbol && currentPrice){
            // console.log("stockContainerUpdated")
            //REQUEST for latest stock data only if the stock container is shown
            setAddClicked(false);
            getStockData(username,password,symbol)
            .then((stock)=>{
                setSymbol(stock.symbol)
                setCurrentPrice(stock.currentPrice)
            })
            .catch((err)=>{
                setMessage(err.message)
                setSuccess(false);
                setShowMessage(true);
            })
        }
    }
    

    return <div className="mainPageContainer">
            {showLoading && <LoadingBox></LoadingBox>}
            {showMessage && <MessageBox message={message} success={success} onClose={handleOnCloseMsgBox} />}
            {listStockSymbols.length!=0 && <StockSymbolsContainer items={listStockSymbols} ></StockSymbolsContainer>}
            <div className="stockDataMainContainer">
                {symbol && currentPrice && <StockInfoContainer symbol={symbol} currentPrice={currentPrice} onClickAdd={handleOnClickAdd}></StockInfoContainer>}
                {addClicked && <AddAlarmInput symbol={symbol} currentPrice={currentPrice} onClickAdd={()=>handleAddAlarmClickedAdd(symbol,currentPrice)} inputTargetRef={inputTargetRef} onClickCancel={handleAddAlarmClickedCancel}></AddAlarmInput>}
                <AlarmsListContainer items={listUsersAlarms}></AlarmsListContainer>
            </div>
            {showEditAlarm && editAlarmBoxValues && <EditAlarmBox   currentPrice={editAlarmBoxValues.currentPrice} symbol={editAlarmBoxValues.symbol} initialPrice={editAlarmBoxValues.initialPrice} variance={editAlarmBoxValues.variance} target={editAlarmBoxValues.target} active={editAlarmBoxValues.active}
                        onClose={handleOnClickCloseEditAlarmBox} onClickEdit={()=>handleEditBoxOnClickEdit(editAlarmBoxValues.id)}
                            inputTargetRef={inputTargetEditAlarmBoxRef} inputActiveRef={inputActiveEditAlarmBoxRef}></EditAlarmBox>}
            {!(areYouSure === null) && <AreYouSureBox onClickNo={handleOnClickNo} onClickYes={handleOnClickYes}></AreYouSureBox>}
        </div>
}