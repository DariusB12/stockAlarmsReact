import { useState, useEffect } from "react";
import { getAllStockSymbols } from "../../api/stock/StockService";
import ListItem from "../utils/list/ListItem";
import StockSymbolsContainer from "./components/stockSymbolsContainer/StockSymbolsContainer";
import MessageBox from "../utils/messageBox/MessageBox";
import StockInfoContainer from "./components/stockInfoContainer/StockInfoContainer";

export default function MainPage({username,password}){
        const [message, setMessage] = useState("");
        const [success, setSuccess] = useState("");
        const [showMessage, setShowMessage] = useState(false);
    const [listStockSymbols,setListStockSymbols] = useState([]);

    const handleOnCloseMsgBox = () => {
        setShowMessage(false);
    }
    const handleOnClickSymbol = (symbol) =>{
        //TODO: HANDLE ON SYMBOL CLICKED
        console.log("you've clicked on the symbol: "+ symbol)
    } 
    useEffect(()=>{
            getAllStockSymbols("bordeanu96darius@gmail.com","12ASas@")
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
                <StockInfoContainer symbol="IBM" currentPrice="12"></StockInfoContainer>
            </div>
        </div>
}