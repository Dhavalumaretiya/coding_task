const isValid = function(value){
    if(typeof value === 'undefined' || value === null) return false;
    if(typeof value === 'string' && value.trim().length === 0) return false;
    if(typeof value === 'number' && value.toString().trim().length === 0) return false;
    return true;
};
//--------------------------------------------------------------------------------------
const vaildObjectId = function (objectId) {
    if (objectId.length == 24) return true
    return false
};

//=======================================================================================
module.exports = {isValid,vaildObjectId};