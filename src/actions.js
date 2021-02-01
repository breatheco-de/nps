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
        if(res.status === 401){
            setTimeout(() => {
                window.location.href = `${process.env.REACT_APP_API_HOST}/auth/view/login?url=${window.location.href.split('?')[0]}`
            }, 2000)
        } 
        const data = await res.json();
        if(res.status === 404) throw Error(data.details || data.detail || data.error || data.non_field_errors || "Question or Survey not found")
        throw Error(data.details || data.detail || data.error || data.non_field_errors || "There was an error completing this request")
    }
    else return await res.json();

}

export const getQuestion = async (id) => {
    return request(`/feedback/answer/${id}`);
}

export const getSurvey = async (id) => {
    return request(`/feedback/student/me/survey/${id}/questions`);
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