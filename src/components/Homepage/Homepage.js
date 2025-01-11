import Header from "../Header/Header";
import Calculation from "../Calculation/Calculation";
import Optionals from "../OptionalExpenses/Optionals";
import Filter from "../Filter/Filter";
import Button from "../common components/Buttton/Button";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import "./Homepage.css"

const Homepage = () =>{

    const {usersAPI} = api;
    const {expensesAPI} = api;

    const navigate = useNavigate();

    const handleReset = (e) =>{
        e.preventDefault();

        const userConfirmed = window.confirm(
            "You are about to reset all user data. Do you want to proceed?"
        );
    
        if (!userConfirmed) {
            return;
        }

        // here I am deleting expenses data

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

        // here I am deleting user data

        fetch(`${usersAPI}`)
        .then(res => res.json())
        .then(data => {
            const deleteData = data.map((item) => {
                fetch(`${usersAPI}/${item.id}`, {
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

        navigate("/")
        
    }

    return <> <div className="homepage">
        <Header />
        <div className="mainWrapper">
            <div className="expenseList">
                <Filter />
            </div>
            <div className="expenseStats">
                <Calculation />
                <Optionals />
            </div>
            
        </div>
    </div>

    <div className="resetButtonWrapper">
            <Button buttonText= "Reset All Information" action={handleReset}/>
        </div>
    </>
}

export default Homepage;