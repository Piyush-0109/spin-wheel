import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { LoginScreen } from '../Login/LoginScreen';
import { PrizeWinnerScreen } from '../PrizeWinnerScreen/PrizeWinnerScreen';
import { prizeListBefore25, prizeNameList, prizeNameListBackgroudColor } from '../../constants/ApplicationConstants';
import RRBackground from "../../assets/rrbg.png"
import Logo from "../../assets/RapidRoundsLogo.png"
import './SpinningWheel.css';

export const SpinningWheel = () => {
  const width = window.innerWidth
  const height = window.innerHeight
  const [username, setUsername] = useState("")
  const [rotation, setRotation] = useState("circle")
  const [isWheelSpinning, setIsWheelSpinning] = useState(false)
  const [isOpenConfitteScreen, setIsOpenConfittiScreen] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("prizeDataList") === null) {
      let dataToSet = []
      let tempData = {}
      tempData["Name"] = "Admin"
      tempData["Prize"] = ""
      dataToSet.push(tempData)
      localStorage.setItem("prizeDataList", JSON.stringify(dataToSet))
    }
  }, [])

  function getRotationAndSkewParams(rotationIndex) {
    let rotation = rotationIndex * 27.5
    return `rotate(${rotation}deg) skewY(-60deg)`
  }

  function spinWheel() {
    setIsWheelSpinning(true)
    setRotation("circle start-rotate blink")
    setTimeout(() => {
      setIsOpenConfittiScreen(true)
      setIsWheelSpinning(false)
      setRotation("circle start-rotate stop-rotate")
    }, 5000 + Math.floor(Math.random() * 1000) + 1)
  }

  function getButtonStyles() {
    let buttonStylesSpinning = {
      backgroundImage: `url(${Logo})`
    }

    let buttonStylesNotSpinning = {
      background: 'black'
    }

    return isWheelSpinning ? buttonStylesSpinning : buttonStylesNotSpinning
  }

  function handlePrizeRedeemCallback(callbackUserName, callbackPrize) {
    let data = {}
    data["Name"] = callbackUserName
    data["Prize"] = callbackPrize

    let localData = JSON.parse(localStorage.getItem("prizeDataList"))
    let setLocalData = localData
    setLocalData.push(data)
    localStorage.setItem("prizeDataList", JSON.stringify(setLocalData))
    setUsername("")
    setIsOpenConfittiScreen(false)
  }

  function handleUserInputSubmit(callbackInputs) {
    setUsername(callbackInputs)
  }

  return (
    <div
      className='wheelWrapper'
      style={{
        backgroundImage: `url(${RRBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {
        !username &&
        <LoginScreen
          handleUserInputSubmitCallback={handleUserInputSubmit}
        />
      }
      {
        username &&
        <div>
          {
            !isOpenConfitteScreen &&
            <>
              <ul className={rotation}>
                {
                  prizeNameList.map((item, index) => (
                    <li
                      key={index}
                      style={{
                        transform: getRotationAndSkewParams(index)
                      }}
                    >
                      <div
                        key={index}
                        className='text'
                        spellCheck="false"
                        style={{
                          background: `${prizeNameListBackgroudColor[index]}`
                        }}
                      >
                        {item}
                      </div>
                    </li>
                  ))
                }
                {
                  !isOpenConfitteScreen &&
                  <button
                    style={getButtonStyles()}
                    className='spin-button'
                    onClick={() => spinWheel()}
                  >
                    {!isWheelSpinning && "SPIN"}
                  </button>
                }
              </ul>
            </>
          }
          {
            isOpenConfitteScreen &&
            <Confetti
              width={width}
              height={height}
            />
          }
          {
            isOpenConfitteScreen &&
            <PrizeWinnerScreen
              userName={username}
              prize={prizeListBefore25[Math.floor(Math.random() * prizeListBefore25.length)]}
              redeemPrizeCallback={handlePrizeRedeemCallback}
            />
          }
        </div>
      }
    </div>
  );
};
