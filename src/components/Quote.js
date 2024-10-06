import React, {useState, useEffect} from "react";
import jsonp from "jsonp";
import './Quote.css'

const colors = ["#14cc8d", "#1481cc", "#cc3114", "#bb14cc", "#14ccbb", "#5f14cc", "#cc8d14"];

const Quote = () => {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [backgroundColor, setBackgroundColor] = useState(colors[0]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchNewQuote();
    }, []);

    const fetchNewQuote = () => {
        setIsLoading(true);
        const url = `https://api.forismatic.com/api/1.0/?method=getQuote&key=random&format=jsonp&lang=ru`;
        jsonp(url, {param: 'jsonp'}, (err, data) => {
            setIsLoading(false);
            if (err) {
                console.error("Error fetching quote:", err);
            } else {
                console.log(data.quoteText);
                setQuote(data.quoteText);
                console.log(data.quoteAuthor);
                setAuthor(data.quoteAuthor);
                updateBackgroundColor();

            }
        });
    };
    const updateBackgroundColor = () => {
        let randomIndex = Math.floor(Math.random() * colors.length);
        setBackgroundColor(colors[randomIndex]);
    };

    const handleNewQuote = () => {
        fetchNewQuote();
    };

    return (
        <section className="quote-container" style={{backgroundColor, cursor: isLoading ? 'wait' : 'default'}}>
            <h1 className="text-primary">Random Quotes!</h1>
            <div className="quote-box">
                <q className="quote-text">{quote}</q>
                <cite className="author-text">{author}</cite>
            </div>
            <button type="button" className="change-quote-button" onClick={handleNewQuote}
                    style={{cursor: isLoading ? 'wait' : 'pointer'}} disabled={isLoading}>
                New Quote
            </button>
        </section>
    );
};

export default Quote;
