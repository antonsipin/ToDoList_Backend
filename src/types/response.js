const response = (result, error, data) => {
    return {
        result: result || '',
        error: error || '',
        data: data || {}
    } 
}

module.exports = response