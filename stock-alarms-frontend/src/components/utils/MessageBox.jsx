

export default function MessageBox({message,success,onClose}){
    const headerClass = (success) ? "headerSuccess" : "headerError" ;
    const bodyClass= (success) ? "bodySuccess" : "bodyError" ;


    return <>
                <div className="messageBox">
                    <div className="closeButton">
                        <button id="closeButton" onClick={onClose}>X</button>
                    </div>
                    <div className={headerClass}>
                        <p>{(success) ? "Success" : "Failure"}</p>
                    </div>
                    <div className={bodyClass}>
                        <p>{message}</p>
                    </div>
                </div>
            </>
}