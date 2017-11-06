// function verify obj
module.exports.isEmptyObj = (obj) => {
    for(let key in obj) {
        return false;
    }
    return true;
}