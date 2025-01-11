import { useState } from "react";
import {ScreenSize} from "../../constants/Functions";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";


const Welcome = () =>{

    const [isClicked, setIsClicked] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        income: "",
        savings: ""
    });

    const navigate = useNavigate();

    const {usersAPI} = api;

    const handleClick = () =>{
        setIsClicked(prevState => !prevState);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();     

        const newUser = {
            name: formData.name,
            income: formData.income,
            savings: formData.savings
        }        

        fetch(`${usersAPI}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => 
                console.log("New user ID:", data.id)
            )
            .catch(error => {
                console.error('Error:', error)
            })

        navigate('/home')
    }

    const width = ScreenSize();

    return <div className="welcomeWrapper">

        <div className={width < 900 ? "hide" : "welcomeTextBox"}>
            <h1>Calculate Smarter, <br/> Spend Wiser...</h1>
            <img src="./home-illustrator.png" className="welcomeImage"/>
        </div>

        <div className={`formWrapper ${width < 900 ? "fullFormWidth" : ""}`}>

            <form onSubmit={handleSubmit}>

                <p className="formHeader">Monthly <span>Budget</span></p>

                <label htmlFor = "name" className={isClicked ? "clicked" : ""}> Enter Your Name </label>

                <input name="name" type="text" className = {isClicked ? "clickedInput" : ""} value={formData.name} onClick={handleClick} onChange={(e) => setFormData({
                    ...formData,
                    [e.target.name]: e.target.value
                })}/>

                <label htmlFor = "income" className={isClicked ? "clicked" : ""}> Enter Your Income </label>

                <input name="income" type="number" className = {isClicked ? "clickedInput" : ""} value={formData.income} onClick={handleClick} onChange={(e) => setFormData({
                    ...formData,
                    [e.target.name]: e.target.value
                })}/>

                <label htmlFor = "savings" className={isClicked ? "clicked" : ""}> Enter Your Desired Savings </label>

                <input name="savings" type="number" className = {isClicked ? "clickedInput" : ""} value={formData.savings} onClick={handleClick} onChange={(e) => setFormData({
                    ...formData,
                    [e.target.name]: e.target.value
                })}/>

                <button type="submit" className="formButton">Start Saving!</button>
            </form>
        </div>
    </div>
} 

export default Welcome;