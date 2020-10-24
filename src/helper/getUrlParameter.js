function getUrlParameter(name) {
        let params = new URLSearchParams(window.location.search);
        return params.has(name) ? params.get(name) : null;
}

export default getUrlParameter;