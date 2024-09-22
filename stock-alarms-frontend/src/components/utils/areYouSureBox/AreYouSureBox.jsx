export default function AreYouSureBox({onClickYes,onClickNo}){
    return <>
                <div className="areYouSureBox">
                    <div className="headerAreYouSure">
                        <p>Are you sure?</p>
                    </div>
                    <div className="buttons">
                        <button id="areYouSureYesButton" onClick={onClickYes}>Yes</button>
                        <button id="areYouSureNoButton" onClick={onClickNo}>No</button>
                    </div>
                </div>
            </>
}