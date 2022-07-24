import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
    const history = useHistory();

    const session = useSelector(state => state.session);
    if (session) history.push('/panel');
    else history.push('/auth');
}

export default HomePage;