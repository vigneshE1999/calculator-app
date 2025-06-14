import React, { useState, useEffect } from "react";
import "../assets/Calculator.css"
import '@fortawesome/fontawesome-free/css/all.min.css';

function Calculator() {

    const [input, setInput] = useState("");
    const [theme, setTheme] = useState("dark");

    const liveScreen = (value) => {
        setInput((prev) => prev + value);
    };
    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    const clear = () => {
        setInput("");
    };

    const calculate = () => {
        try {
            if (input.trim() === "") return;

            const result = eval(input);
            if (isNaN(result)) {
                setInput("Can't divide 0 with 0");
                setTimeout(() => setInput(""), 1300);
            } else {
                setInput(result.toString());
            }
        } catch {
            setInput("Error");
            setTimeout(() => setInput(""), 1300);
        }
    };

    const handleKeyboardInput = (e) => {
        const key = e.key;

        if ("0123456789+-*/.".includes(key)) {
            setInput((prev) => prev + key);
        } else if (key === "Enter") {
            calculate();
        } else if (key === "Backspace") {
            setInput((prev) => prev.slice(0, -1));
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyboardInput);

        // Disable right-click context menu
        const disableContext = (e) => e.preventDefault();
        document.addEventListener("contextmenu", disableContext);

        // Cleanup
        return () => {
            document.removeEventListener("keydown", handleKeyboardInput);
            document.removeEventListener("contextmenu", disableContext);
        };
    }, []);

    return (
        <>
            <div className={`wrapper ${theme}`}>
                <div className="container">
                    <div className="header-container">
                        <h1 id="toast">Calculator</h1>
                        <button className="theme-toggle" onClick={toggleTheme}>
                            <i className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"}`}></i>
                        </button>
                    </div>
                    <div className="first-row">
                        <input type="text" name="result" id="result" placeholder="Result" readOnly value={input} onKeyDown={handleKeyboardInput} />
                        <input type="button" value="C" onClick={clear} id="clear-button" />
                    </div>
                    <div className="second-row">
                        <input type="button" value="1" onClick={() => liveScreen("1")} />
                        <input type="button" value="2" onClick={() => liveScreen("2")} />
                        <input type="button" value="3" onClick={() => liveScreen("3")} />
                        <input type="button" value="+" onClick={() => liveScreen("+")} />
                    </div>
                    <div className="third-row">
                        <input type="button" value="4" onClick={() => liveScreen("4")} />
                        <input type="button" value="5" onClick={() => liveScreen("5")} />
                        <input type="button" value="6" onClick={() => liveScreen("6")} />
                        <input type="button" value="-" onClick={() => liveScreen("-")} />
                    </div>
                    <div className="fourth-row">
                        <input type="button" value="7" onClick={() => liveScreen("7")} />
                        <input type="button" value="8" onClick={() => liveScreen("8")} />
                        <input type="button" value="9" onClick={() => liveScreen("9")} />
                        <input type="button" value="x" onClick={() => liveScreen("*")} />
                    </div>
                    <div className="fifth-row">
                        <input type="button" value="/" onClick={() => liveScreen("/")} />
                        <input type="button" value="0" onClick={() => liveScreen("0")} />
                        <input type="button" value="." onClick={() => liveScreen(".")} />
                        <input type="button" value="=" onClick={calculate} />
                    </div>
                    <div className="media-icons">
                        <a href="mailto:vickeevicky199@gmail.com" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-envelope"
                            style={{ color: theme === 'light' ? '#1c1c1c' : '#ffffff' }}></i>
                        </a>
                        <a href="" target="_blank">
                            <i class="fab fa-linkedin"
                            style={{ color: theme === 'light' ? '#1c1c1c' : '#ffffff' }}></i></a>
                        <a href="" target="_blank"><i class="fab fa-github"
                        style={{ color: theme === 'light' ? '#1c1c1c' : '#ffffff' }}></i></a>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Calculator;
