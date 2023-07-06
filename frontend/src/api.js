export const login = async (password) => {
    const response = await fetch('https://babsovet.onrender.com/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ password }),
    });
    const data = await response.json();
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

export const createEvent = async (event) => {
    const response = await fetch('https://babsovet.onrender.com/events/create', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            authorization: `Bearer ${document.cookie}`,
        },
        body: JSON.stringify(event),
    });
    const data = await response.json();
    if (response.status === 200) {
        return {
            event: data.event,
        };
    } else {
        return {
            error: data.error,
        };
    }
};

export const getEvents = async (owner) => {
    const response = await fetch(`https://babsovet.onrender.com/events/get?owner=${owner}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            authorization: `Bearer ${document.cookie}`,
        },
    });
    const data = await response.json();

    if (response.status === 200) {
        return {
            events: data.events,
        };
    } else {
        return {
            error: data.error,
        };
    }
};
