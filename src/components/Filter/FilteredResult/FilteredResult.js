import NewExpense from "../../NewExpense/NewExpense";
import { FiTrash2 } from "react-icons/fi";
import { TfiPencil } from "react-icons/tfi";
import "./FilteredResult.css";
import api from "../../../api/api";
import { useState } from "react";

const FilteredResult = ({ expenses, onDelete }) => {
  const { expensesAPI } = api;
  const [toEdit, setToEdit] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();

    fetch(`${expensesAPI}/${expenses.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Deleted:", data);
        onDelete(expenses.id);
      })
      .catch((error) => {
        console.log("Error", error);
      });

    
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setToEdit(prevState => !prevState);

  };

  return (

    <>

    <div className="filteredResult">
      <div className="expenseDetailsBox">
        <div className="expenseSubBox">
          <img className="expenseImage" src="./savings.svg" alt="Expense Icon" />
          <div className="expenseSubTextBox">
            <p>{`${expenses.category.charAt(0).toUpperCase()}${expenses.category.slice(1)}`}</p>
            <p>{`Expense Name: ${expenses.name}`}</p>
            <p>{`Date: ${expenses.date}`}</p>
          </div>
        </div>
        <p className="expensePrice">{`$${expenses.amount}`}</p>
      </div>
      <div className="actionButtons">
        <button className="editItemButton" onClick={handleEdit}>
          <TfiPencil /> <span>Edit</span>
        </button>
        <button className="deleteItemButton" onClick={handleDelete}>
          <FiTrash2 /> <span>Delete</span>
        </button>
      </div>
    </div>

    { toEdit && <>
    <NewExpense clickState = {toEdit} defaultAmount={expenses.amount} defaultCategory={expenses.category} defaultName={expenses.name}/>
    </>

    }
    </>
  );
};

export default FilteredResult;
