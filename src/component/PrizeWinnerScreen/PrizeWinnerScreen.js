import "./PrizeWinnerScreen.css"

export const PrizeWinnerScreen = (prizeWinnerScreenProps) => {
  const { userName, prize, redeemPrizeCallback } = prizeWinnerScreenProps

  return (
    <div className="prizeWinnerScreenContainer">
      <div className="titleTextWrapper">
        <div className="textWrapper">
          <span className="titleTextStyle">&#127881;Congratulations&#127881;</span>
        </div>
        <div className="textWrapper">
          <span className="titleTextStyle">{userName}</span>
        </div>
      </div>
      <div className="prizeWinnerScreenWrapper">
        <div className="prizeWinnerScreenTextWrapper">
          <h2 className="prizeWinnerSubtext animate-charcter">
            {`You have won ${prize}`}
          </h2>
          <div className="redeemButtonWrapper">
            <button
              className="redeemButton"
              onClick={() => redeemPrizeCallback(userName, prize)}
            >
              Redeem Prize
            </button>
          </div>

        </div>
      </div>
    </div >
  )
}