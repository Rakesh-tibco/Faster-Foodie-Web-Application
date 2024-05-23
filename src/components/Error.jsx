import { useRouteError } from "react-router-dom";

const Error = () => {
    const err = useRouteError();
    return (
        <div>
            <h2>{err.data}</h2>
            <h3>{err.statusText}</h3>
        </div>
    );
}

export default Error;