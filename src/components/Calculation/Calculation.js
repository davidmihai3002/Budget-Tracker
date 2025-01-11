import { useEffect, useState } from "react";
import { ExpensesSum } from "../../constants/Functions";
import api from "../../api/api";
import {Circle} from "rc-progress";
import NewExpense from "../NewExpense/NewExpense";
import {ScreenSize} from "../../constants/Functions";
import "./Calculation.css";

const Calculation = () =>{

    const [userIncome, setUserIncome] = useState("");
    const [userSavings, setUserSavings] = useState("");
    const [available, setAvailable] = useState("");
    const [clicked, setClicked] = useState(false);
    const totalExpense = ExpensesSum();

    const {usersAPI} = api;   
    const {expensesAPI} = api;
    const width = ScreenSize(); 

    const handleNewExpense = (e) =>{
        e.preventDefault();

        setClicked(prevState => !prevState);
    }

    const handleReset = (e) =>{
        e.preventDefault();

        const userConfirmed = window.confirm(
            "You are about to reset all expenses. Do you want to proceed?"
        );
    
        if (!userConfirmed) {
            return;
        }

        fetch(`${expensesAPI}`)
        .then(res => res.json())
        .then(data => {
            const deleteData = data.map((item) => {
                fetch(`${expensesAPI}/${item.id}`, {
                    method: "DELETE"
                })
            });

            return Promise.all(deleteData)
        })
        .then(() => {
            console.log("All data deleted successfully");
        })
        .catch(error => {
            console.error("Error", error)
        })

        // delete Expenses, fetch expenses API

    }

    useEffect(() => {
        fetch(`${usersAPI}`)
        .then(res => res.json())
        .then(data => {
            setUserIncome(data[0].income);
            setUserSavings(data[0].savings);
        })
        .catch(error => {
            console.error("Error", error)
        })

    }, [])

    useEffect(() => {
        if (userIncome > 0) {
            setAvailable(userIncome - totalExpense)
        }
    }, [totalExpense, userIncome])

    // console.log(userIncome, userSavings, totalExpense);

    return <>
    
    <div className="calculationWrapper">
            <p className="calcHeader">Calculation</p>
            <div className="incomeBox">
                <p>INCOME</p>
                <p>{`$${userIncome}`}</p>
            </div>
    
            <div className="expensesGraph">
                <Progress income={userIncome} expense={totalExpense}/>
            </div>
    
            <div className="expenseState">
                <div className="available">
                    <p>AVAILABLE</p>
                    <span>{`$${Number(available).toFixed(2)}`}</span>
                </div>
                <div className="spent">
                    <p>SPENT</p>
                    <span>{`$${totalExpense.toFixed(2)}`}</span>
                </div>
            </div>
    
            <button onClick={handleReset} className="resetButton">Reset Expenses</button>
    
            {width < 900 &&
                <div className="plusExpense" onClick={handleNewExpense}>+</div>}
    
        </div>
        

        {clicked && <NewExpense clickState = {clicked}/>}
    </>
}

const Progress = ({income, expense}) =>{

    const [progress, setProgress] = useState(0);

    // console.log(progress);    

    useEffect(()=>{

        const percentage = (expense / income) * 100;

        if (percentage > 100) {
            setProgress(100);
        } else{
            setProgress (percentage.toFixed(1));
        }

    },[income, expense])

    return (
        <>
            {/* <input
                type="range"
                min={1}
                max={100}
                step={0.1}
                value={progress}
                onChange={(e) => setProgress(e.target.value)} 
                className="roundSlider" 
            /> */}

            <div style={{position: "relative"}}>
                <Circle style={{width: "200px", height: "200px", position: "absolute", left: "50%" , transform: "translateX(-50%)" }} percent={progress} trailWidth={10} strokeWidth={10} strokeLinecap="square" strokeColor= "#51D289"/>
            </div>

            <div className="progressTextBox">
                {`${progress}%`} <span style={{ fontSize: "20px" }}>SPENT</span>
            </div>
        </>
    );
        


}



export default Calculation;