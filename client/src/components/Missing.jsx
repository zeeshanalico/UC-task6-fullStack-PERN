import { Link } from "react-router-dom";
const Missing = () => {
    return (
        <article className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <div className="mt-3">
                <Link to="/" className="btn btn-primary">Visit Our Homepage</Link>
            </div>
        </article>
    );
};
export default Missing
