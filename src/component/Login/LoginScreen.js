import { useState } from "react"
import moment from "moment"
import AlertIcon from "../../assets/alert"
import ExcelIcon from "../../assets/excelLogo"
import { ExcelExportAdapter } from "../../adapters/ExcelExportAdapter"
import "./LoginScreen.css"

export const LoginScreen = (loginScreenProps) => {
  const { handleUserInputSubmitCallback } = loginScreenProps
  const [userInput, setUserInput] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [messageAlert, setMessageAlert] = useState(false)

  function handleSubmit() {
    if (userInput !== "") {
      if (userInput.toLocaleLowerCase() === "admin") {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
        handleUserInputSubmitCallback(userInput)
      }
    } else {
      setMessageAlert(true)
      setTimeout(() => {
        setMessageAlert(false)
      }, 3000)
    }
  }

  function handleExportToExcel() {
    let fileName = moment(new Date()).format("MMMDoYYYY");
    let data = JSON.parse(localStorage.getItem("prizeDataList"))
    let filterData = data.filter((item) => item.Name !== "Admin")

    return ExcelExportAdapter(fileName + "prizeList", filterData)
  }

  function handleUserNameInput(data) {
    setUserInput(data)
    if (String(data).toLowerCase() !== "admin") {
      setIsAdmin(false)
    }
  }

  return (
    <div className="loginScreenModal">
      <span className="loginTitle">
        Welcome To<span className="rrColorText"> R</span>apid<span className="rrColorText"> R</span>ounds</span>
      <div className="loginScreenInputWrapper">
        <span className="inputLabel">Enter Your Full Name</span>
        <input
          autoFocus
          spellCheck="false"
          className="inputWrapper"
          value={userInput}
          onChange={(e) => handleUserNameInput(e.target.value)}
        />
      </div>
      <div className="loginButtonWrapper">
        <button
          className="loginButton slide_right"
          onClick={handleSubmit}
        >
          Ready For Spin & Win
        </button>
      </div>
      {
        isAdmin &&
        <div
          className="exportToExcelButtonWrapper"
          onClick={handleExportToExcel}
        >
          <ExcelIcon />
        </div>
      }
      {
        messageAlert &&
        <div className="alertMessageContainer">
          <div className="alertMessageTextWrapper">
            <AlertIcon />
            <span className="alertMessageText">Please Enter Your Full Name To Play</span>
          </div>
        </div>
      }
      <div className="celebrationTextWrapper">
        <span className="celebrationText">
          <span>5th</span><br />Anniversary<br />Celebration
        </span>
      </div>
    </div >
  )
}