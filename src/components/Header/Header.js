import NewExpense from "../NewExpense/NewExpense";
import Button from "../common components/Buttton/Button";
import api from "../../api/api"
import { useEffect, useState } from "react";
import "./Header.css";

const Header = () =>{

    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [userName, setUserName] = useState("");
    const {usersAPI} = api;

    console.log(isButtonClicked);
    

    useEffect(() => {
        fetch(`${usersAPI}`)
        .then(res => res.json())
        .then(data => {
             setUserName(data[0].name.split(' ')[0]);
        })
        .catch( error => {
            console.error("Error", error);
        })

    }, [])    

    const addNewExpense = () =>{
        setIsButtonClicked(prevState => !prevState);
    }

    return <div className="header">

        <div className="headerBox1">
            <img src="./header-logo.png"/>
            <div className="logoTextBox">
                <p>Expenses</p>
                <p> Monthly <span> Budget </span></p>
            </div>
        </div>

        <div className="headerBox2">
            <div className="userInfo">
                <img src="./user.png"/>
                <p>{`Hi, ${userName}`}</p>
            </div>
            <Button buttonText = "New Expense" action={addNewExpense}/>
        </div>

        {/* adding new expense*/}

        {
            isButtonClicked && (
                <NewExpense clickState={isButtonClicked}/>
            )
        }

    </div>

}

export default Header;