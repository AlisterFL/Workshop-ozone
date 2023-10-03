import { useState, useEffect } from 'react';

function useFetchTypes() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://192.168.210.137:8842/api/v1/tags')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const types = data.map(item => ({ id: item.id, type: item.type }));
                setData(types);
                setIsLoading(false);
            })
            .catch(error => {
                console.log("Il y a eu un problème avec l'opération fetch: ", error.message);
                setIsLoading(false);
            });
    }, []);

    return { data, isLoading };
}

export default useFetchTypes;
