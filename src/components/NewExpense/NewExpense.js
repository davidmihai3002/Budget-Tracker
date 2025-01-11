import { FiX } from "react-icons/fi";
import { format } from 'date-fns';
import "./NewExpense.css";
import { useState } from "react";
import api from "../../api/api";

const NewExpense = ({  

    clickState = false,
    defaultAmount = "",
    defaultName = "",
    defaultCategory = "debt"
    
}) => {
    const [clicked, setClicked] = useState(clickState);
    const [expensesData, setExpensesData] = useState({
        expenseAmount: `${defaultAmount}`,
        expenseName: `${defaultName}`,
        expenseCategory: `${defaultCategory}`
    })

    const today = new Date();
    const formattedDate = format(today, 'MM/dd/yyyy');

    const expenses = ["debt" , "hobbies" , "events" , "food", "rent" , "savings" , "medicine" , "subscription" , "various"];

    const {expensesAPI} = api;

    const handleClose = () => {
        setClicked(false);
    };

    console.log(clicked);
    

    const handleChange = (e) =>{
        setExpensesData({
            ...expensesData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        // here I check if the fileds are completed, preventing actually updating the database with empty data

        if (expensesData.expenseName === "" || expensesData.expenseAmount === "") {
            alert("You must complete all fields")
        } else {
            
        setClicked(false);

        const newExpense = {
            name: expensesData.expenseName,
            amount: expensesData.expenseAmount,
            category: expensesData.expenseCategory,
            date: formattedDate
        }

        // console.log(newExpense);
        

        fetch(`${expensesAPI}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newExpense)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.id);
        })
        .catch(error => {
            console.error('Error:', error)
        })
        }
    }

    return (
        <>

            {clicked && (
                <div className="newExpWrapper">

                    <form className="newExpForm" onSubmit={handleSubmit}>
                        <p className="expensesFormHeading">
                            Monthly <span>Budget</span>
                        </p>

                        <p className="expensesFormSubHeading">~ Insert below your curent spend (in EUR) ~</p>

                        <label htmlFor="expenseAmount">Insert amount</label>

                        <input type="number" name="expenseAmount" value={expensesData.expenseAmount} onChange={handleChange}/>

                        <label htmlFor="expenseName">
                            Name for expenses
                        </label>

                        <input type="text" name="expenseName" value={expensesData.expenseName} onChange={handleChange}/>

                        <label htmlFor="expenseCategory">
                            Expense Category
                        </label>

                        <select className="expensesCategorySelect" name="expenseCategory" value={expensesData.expenseCategory} onChange={handleChange}>
                            {expenses.map((expense, index) => (
                                <option key={index}>{expense}</option>
                            ))}
                        </select>

                        <button type="submit" className="submitButton">Save Expense</button>

                    </form>

                    <CloseButton onClose={handleClose} />
                </div>
            )}
        </>
    );
};

const CloseButton = ({ onClose }) => {
    return (
        <div className="closeButton" onClick={onClose}>
            <FiX style={{ width: "30px", height: "30px", fontWeight: "900" }} />
        </div>
    );
};

export default NewExpense;
