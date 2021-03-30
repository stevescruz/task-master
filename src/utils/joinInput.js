function joinInput(cliInput, separator) {
    const isArray = Array.isArray(cliInput);
    
    return isArray ? cliInput.join(separator) : cliInput;
}
module.exports = joinInput;
