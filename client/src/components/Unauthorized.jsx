import { useNavigate } from "react-router-dom";


const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <section className="container mt-5">
            <h1 className="text-center">Unauthorized</h1>
            <br />
            <p className="text-center">You do not have access to the requested page.</p>
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-primary" onClick={goBack}>Go Back</button>
            </div>
        </section>
    );
};

export default Unauthorized