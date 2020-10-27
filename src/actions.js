import getParam from "./helper/getUrlParameter"

const query = {
    token: getParam("token"),
    lang: getParam("lang", "en")
}
const request = async (url, options={}) => {

    const { headers={}, ...rest } = options;

    const _options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${query.token}`,
            ...headers
        },
        ...rest
    }
    const res = await fetch(`${process.env.REACT_APP_API_HOST}${url}`, _options);

    if(res.status === 500) throw Error("There was an error retrieving the survey");
    else if(res.status > 399 && res.status < 499){
        if(res.status === 401) throw Error("Invalid token");
        const data = await res.json();
        throw Error(data.details || data.error || data.non_field_errors || "There was an error completing this request")
    }
    else return await res.json();

}

export const getQuestion = async (id) => {
    return request(`/feedback/answer/${id}`);
}

export const sendVote = async ({ score , comment, id }) => {
    const options = {
        method: "PUT",
        body: JSON.stringify({
            score, comment, entity_id: id
        })
    }
    return await request(`/feedback/answer/${id}`, options);
}