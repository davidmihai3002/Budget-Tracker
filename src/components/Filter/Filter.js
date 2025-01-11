import FilteredResult from "./FilteredResult/FilteredResult";
import React, { useState , useEffect} from "react";
import api from "../../api/api";
import "./Filter.css";

const Filter = () =>{

    const [expenses, setExpenses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const {expensesAPI} = api;
    const categories = ["All", "debt" , "hobbies" , "events" , "food", "rent" , "savings" , "medicine" , "subscription" , "various"];

    useEffect(() =>{
        
        fetch(`${expensesAPI}`)
        .then(res => res.json())
        .then(data => {
            setExpenses(data);
        })
        .catch(error => {
            console.log("Error", error);
            
        })

    }, [expensesAPI, expenses])

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const filteredExpenses = expenses.filter(expense => {
        if (selectedCategory === "All") {
            return true;
        }
        return expense.category.toLowerCase() === selectedCategory.toLowerCase();
    });

    const handleDelete = (id) => {
        setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    };

    return <div className="filteredItemsWrapper">
        <div className="filterWrapper">
            <p>Description</p>
            <FilterWidget filterList={categories} value= {selectedCategory} onCategoryChange={handleCategoryChange}/>
        </div>

        <div className="filteredList">
            {expenses.length === 0 &&
            
                <div className="noItems">
                    <p>Looks Like You Haven't Added Any <span>Expenses Yet.</span></p>
                    <p>No worries, just hit the <span>'New Expense'</span> button 
                    to get started</p>
                    <img src="./cart.svg" style={{background: "transparent"}}/>
                </div>
            }

                <div className="filterResultsItems">
                    {
                        filteredExpenses.length > 0 && (
                            filteredExpenses.map((expense, index) => (
                                <FilteredResult key={expense.id || index} expenses={expense} onDelete={handleDelete}/>
                            ))
                        )
                    }
                </div>

        </div>
    </div>
}

const FilterWidget = ({filterList, value, onCategoryChange}) =>{

    return <div className="filter">

        <p>Filter Expenses</p>

        <select className="filterSelect" value={value} onChange={(e) => onCategoryChange(e.target.value)}>
            {filterList.map((category, index) => (
                <option key={index}>{category}</option>
            ))}
        </select>

    </div>
}

export default Filter;