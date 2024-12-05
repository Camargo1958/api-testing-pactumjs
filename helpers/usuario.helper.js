const {user} = require('../data/user.data')


/**
 * Gets user data from a given source.
 *
 * @param {string} source - The source of user data. Can be 'local' or 'api'.
 * @returns {object} The user data object or an error object if the source is invalid.
 */
async function getUserData(source) {
    let userData;

    switch (origem) {
        case 'local':
            userData = user;
            break;
        case 'api':
            // Assuming you have a function to fetch user data from API
            // Replace this with your actual implementation
            //userData = await fetchUserDataFromAPI();
            userData = user;
            break;
        default:
            // Handle default case, e.g., return an error or a default user object
            userData = { error: 'Invalid origem' };
    }

    return userData;
}

module.exports = { obtemDadosUsuario }