import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import homegif from "../icons/home.gif";
import Footer from "../components/Footer";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-start h-screen w-screen bg-gray-100 gap-5">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 pt-16">Welcome to Our Bill Management System</h1>
            <div className="flex justify-between items-center gap-48 pt-20">
                <div className="flex flex-col justify-center items-center gap-10">
                    <p className="text-3xl text-gray-600 text-center max-w-md">
                        This is a platform that helps you generate and manage bills for your clients.
                    </p>
                    <div className="flex gap-10">
                        <Button text={"Sign In"} onClick={() => navigate("/signin")} />
                        <Button text={"Sign Up"} onClick={() => navigate("/signup")} />
                    </div>
                </div>
                <div>
                    <img width={300} src={homegif} alt="homegif" />
                </div>
            </div>
        </div>
    );
};

export default Home;
