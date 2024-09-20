import { useState, useEffect } from "react";
import { getAllStockSymbols, getStockData } from "../../api/stock/StockService";
import ListItem from "../utils/list/ListItem";
import StockSymbolsContainer from "./components/stockSymbolsContainer/StockSymbolsContainer";
import MessageBox from "../utils/messageBox/MessageBox";
import StockInfoContainer from "./components/stockInfoContainer/StockInfoContainer";
import AddAlarmInput from "./components/addAlarmInput/AddAlarmInput";

export default function MainPage({username="bordeanu96darius@gmail.com",password ="12ASas@"}){
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [listStockSymbols,setListStockSymbols] = useState([]);
    const [addClicked,setAddClicked] = useState(false);

    const [symbol,setSymbol] = useState(null);
    const [currentPrice,setCurrentPrice] = useState(null);

    const handleOnCloseMsgBox = () => {
        setShowMessage(false);
    }
    const handleOnClickSymbol = (symbol) =>{
        setAddClicked(false);
        getStockData(username,password,symbol)
        .then((stock)=>{
            setSymbol(stock.symbol)
            setCurrentPrice(stock.currentPrice)
        })
    } 

    const handleOnClickAdd =()=>{
        setAddClicked(true);
    }
    const handleAddAlarmClickedCancel = ()=>{
        setAddClicked(false);
    }
    const handleAddAlarmClickedAdd = ()=>{
        //TODO: HANDLE CLICKED ADD ALARM
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
       
        
    },[])
    

    return <div className="mainPageContainer">
            {showMessage && <MessageBox message={message} success={success} onClose={handleOnCloseMsgBox} />}
            {listStockSymbols.length!=0 && <StockSymbolsContainer items={listStockSymbols} ></StockSymbolsContainer>}
            <div className="stockDataMainContainer">
                {symbol && currentPrice && <StockInfoContainer symbol={symbol} currentPrice={currentPrice} onClickAdd={handleOnClickAdd}></StockInfoContainer>}
                {addClicked && <AddAlarmInput symbol={symbol} currentPrice={currentPrice} onClickAdd={handleAddAlarmClickedAdd} onClickCancel={handleAddAlarmClickedCancel}></AddAlarmInput>}
            </div>
        </div>
}