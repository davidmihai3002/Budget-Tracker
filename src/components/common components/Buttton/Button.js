// import {NavLink} from "react-router-dom";
import "./Button.css"

const Button = ({buttonText, action}) =>{
    return <div className="headerButton" onClick={action}>
        {buttonText}
    </div>
}

export default Button;