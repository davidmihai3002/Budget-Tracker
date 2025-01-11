import { useEffect, useState } from "react";
import NewExpense from "../NewExpense/NewExpense";
import api from "../../api/api";
import "./Optionals.css"

const Optionals = () =>{

    const [isClicked, setIsClicked] = useState(false);
    const [savings, setSavings] = useState ("");
    const [income, setIncome] = useState("");
    const [fixedData, setFixedData] = useState(
        {
            name: "",
            price: ""
        }
    );

    const {usersAPI} = api;
 
    const fixedExpenses = [

        {
            name: "Netflix",
            image: "./netflix.svg",
            price: 6.99
        },
        {
            name: "Spotify",
            image: "./spotify.svg",
            price: 4.99
        },
        {
            name: "Prime",
            image: "./primevideo.svg",
            price: 5.99
        },
        {
            name: "Walmart",
            image: "./brand-walmart.svg",
            price: ""
        },
        {
            name: "Amazon",
            image: "./amazon.svg",
            price: ""
        }

    ];

    useEffect(() => {
        fetch(`${usersAPI}`)
        .then(res => res.json())
        .then(data => {
            setSavings(data[0].savings);
            setIncome(data[0].income);
        })
        .catch( error => {
            console.error("Error", error);
        })
    }, [])

    const percentage = savings / income * 100;

    // const handleClick = () =>{

    //     e.preventDefault();
    //     setIsClicked(prevState => !prevState);
    //     setFixedData()

    // }

    return <div className="fixedExpensesWrapper">
        <p className="optionalsHeader">Optionals</p>

        <div className="fixedExpenses">

            <p>CHOOSE ANY FIXED EXPENSES</p>

            <div className="optionalsList">
                {fixedExpenses.map((expense, index) => (

                    <div className="fixedBoxIndex" key={index}>

                        <div className="fixedBox1">
                            <img src={`${expense.image}`} className="iconImage"/>
                            <p>{expense.name}</p>
                        </div>

                        <button className="fixedExpensesButton" onClick={(e) => {
                            e.preventDefault();
                            setIsClicked(prevState => !prevState);
                            setFixedData({
                                ...fixedData,
                                name: expense.name,
                                price: expense.price
                            })
                        }}>select</button>

                    </div>

                ))}
            </div>


        </div>

        <div className="goals">
            <p>Goals</p>
            <p>{`Save $${savings} this month, ${percentage.toFixed(1)}% of your total income`}</p>
        </div>


        {isClicked && <>
        
            <NewExpense clickState = {isClicked} defaultAmount={fixedData.price} defaultName={fixedData.name}/>
        
        </>}

    </div>

}

export default Optionals;