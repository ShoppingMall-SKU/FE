import {Main} from "../components/main/main";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

const Home=({ convertPrice })=>{

    //console.log(document.cookie);
    const dispatch = useDispatch();

    useEffect(() => {

    }, []);

    return(<Main
        convertPrice={convertPrice}
    />);
};

export default Home;