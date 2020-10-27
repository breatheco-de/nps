const statusError = (res, data) => {
    if(res.status === 500) throw Error("There was an error retrieving the survey");
    if(res.status > 399 && res.status < 499){
        if(res.status === 401) throw Error("Invalid token");
        throw Error(data.details || data.error || "There was an error completing this request")
    } 
}

export default statusError;