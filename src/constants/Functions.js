import { useState, useEffect } from "react";
import api from "../api/api";

const ScreenSize = () =>{
    const [size, setSize] = useState(window.innerWidth);

    useEffect(() =>{
        const handleResize = () => setSize(window.innerWidth);

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [])

    return size;
}

const ExpensesSum = () =>{
    
    const [sum, setSum] = useState(0);

    const {expensesAPI} = api;

    // fetch expenses and calculate the sum of all the expenses every time they are updated

    useEffect(() => {

        const fetchExpense = () =>{

            fetch(`${expensesAPI}`)
            .then(res => res.json())
            .then(data => {
            // setSum(prevState => prevState + data)

            const total = data.reduce((acc, expense) => acc + Number(expense.amount), 0);
            setSum(total);
        
            })
            .catch()
        }

        const intervalId = setInterval(fetchExpense, 10)

        return () => clearInterval(intervalId);
    }, [])

    return sum;
}

export { ScreenSize, ExpensesSum };