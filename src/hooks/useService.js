import { useEffect } from "react";
import { useState } from "react";

const useService = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('https://secure-sands-66346.herokuapp.com/service')
            .then(res => res.json())
            .then(data => setServices(data));
    }, [])
    return [services, setServices]

}
export default useService;