function getParam(name, _default=null) {
        let params = new URLSearchParams(window.location.search);
        return params.has(name) ? params.get(name) : _default;
}

export default getParam;