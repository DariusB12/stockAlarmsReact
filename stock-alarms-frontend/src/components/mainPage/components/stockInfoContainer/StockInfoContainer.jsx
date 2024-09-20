

export default function StockInfoContainer({symbol,currentPrice,onClickAdd}){
    return <>
        <div className="stockInfoMainContainer">
            <div className="stockInfo">
                <div className="stockInfoNames">
                    <p id="stockInfoSymbolName">Symbol</p>
                    <p id="stockInfoCurrentPriceName">Current Price</p>
                </div>
                <div className="stockInfoValues">
                    <p id="stockInfoSymbolValue">{symbol}</p>
                    <p id="stockInfoCurrentPriceValue">{currentPrice}</p>
                </div>
            </div>
            <button className="buttonAddAlarm" onClick={onClickAdd}>AddAalarm</button>
        </div>
    </>
}