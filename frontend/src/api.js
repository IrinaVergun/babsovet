export const login = async (password) => {
    const response = await fetch('https://babsovet.onrender.com/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ password }),
    });
    const data = await response.json();
    console.log(data);
    console.log(response);
    if (response.status === 200) {
        return {
            id: data.id,
            token: data.token,
        };
    } else {
        return {
            error: data.error,
        };
    }
};
