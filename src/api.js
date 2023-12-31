export const BACKEND = "https://zypher-backend-prod.azurewebsites.net";
// export const BACKEND = "http://localhost:8080";

async function talkToServer({ type, method = "GET", body }) {
    if (!type) throw new Error('Error: server communication attempted without type');
    const jwt = localStorage.getItem("jwt");
    const url = `${BACKEND}/${type}`;
    const raw = await fetch(url, {
        method,
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined
    })
    try {
        return { raw, ...(await raw.json()) }
    }
    catch (talkErr) {
        console.error(talkErr);
    }
}

export function getQuestion(question_level) {
    return talkToServer({
        type: 'question',
        method: "POST",
        body: {question_level}
    })
}

export function postAnswer(answer, question_level) {
    return talkToServer({
        type: 'answer',
        method: "POST",
        body: { answer, question_level }
    })
}

export function getUserData() {
    return talkToServer({
        type: 'me',
    });
}
