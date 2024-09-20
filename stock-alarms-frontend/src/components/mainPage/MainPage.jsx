import { useState, useEffect } from "react";
import { getAllStockSymbols } from "../../api/stock/StockService";
import Button from "../utils/button/Button";
import ListItem from "../utils/list/ListItem";
import StockSymbolsContainer from "./components/StockSymbolsContainer";
import MessageBox from "../utils/messageBox/MessageBox";


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
    

    return <div>
        {showMessage && <MessageBox message={message} success={success} onClose={handleOnCloseMsgBox} />}
        {listStockSymbols.length!=0 && <StockSymbolsContainer items={listStockSymbols} ></StockSymbolsContainer>}
    </div>
}