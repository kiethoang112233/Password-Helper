/**
 * Collection of Error Message in Response
 */
const errorDescription = {};

errorDescription.notAuthenticated = "Not Authenticated!";
errorDescription.undefinedRoute = "This route is not valid! Please return to valid routes";

errorDescription.permissionDenied = "Permission Denied!";
errorDescription.missingCredentials = "Missing credentials!";
errorDescription.wrongCredentials = "Wrong Credentials";

errorDescription.notFound = "Object Not Found!";
errorDescription.internalServerError = "Internal Server Error";

errorDescription.unableCreate = "Unable to Create";
errorDescription.unableDelete = "Unable to Delete";
errorDescription.unableUpdate = "Unable to Update";

errorDescription.missingLength = "Missing password length";
errorDescription.checkPasswordFail = "Unable to check password";
errorDescription.passwordDecryptionError = "Unable to decrypt password";
errorDescription.passwordEncryptionError = "Unable to encrypt password";

/**
 * Description for Errors
 */
const errorMessage = {};

errorMessage.notAuthenticated = "Please authenticate yourself to continue!";
errorMessage.undefinedRoute = "Undefined Route!";

errorMessage.permissionDenied = "You don't have Permission to access!";
errorMessage.missingCredentials = "Please provide your username/password";
errorMessage.wrongCredentials = "Please re-enter your credentials";


errorMessage.notFound = "This Object doesn't exist or errors occur during search";
errorMessage.internalServerError = "Internal Server Error";

errorMessage.unableCreate = "Unable to create this time. Please try again!";
errorMessage.unableDelete = "Unable to delete this time. Please try again!";
errorMessage.unableUpdate = "Unable to update this time. Please try again!";

errorMessage.missingLength = "Please provide password length";
errorMessage.checkPasswordFail = "Unable to check password. Please try again later."
errorMessage.passwordDecryptionError = "Unable to decrypt password. Please check the key";
errorMessage.passwordEncryptionError = "Unable to encrypt password. Please check the key";

/**
 *  Collection of Success Messages
 */
const successMessage = {};

//User constants
successMessage.completeAuthentication = "Successfully Authenticated!";
successMessage.userSignedUpSuccess = "Successfully Signed Up!";
successMessage.userDeleted = "User has been deleted!";
successMessage.userUpdated = "User has been updated!";
successMessage.userFound = "Found User!";


//Credential constants
successMessage.credentialListFound = "Successfully found your Credential list";
successMessage.credentialFound = "Found your Credential!";
successMessage.credentialCreated = "New Credential has been created!";
successMessage.credentialUpdated = "Existing Credential has been updated!";
successMessage.credentialDeleted = "Your Credential has been deleted!";

//Task constants
successMessage.taskListFound = "Successfully found your Task list";
successMessage.taskFound = "Found your Task!";
successMessage.taskCreated = "New task has been created!";
successMessage.taskUpdated = "Existing Task has been updated!";
successMessage.taskDeleted = "Your Task has been deleted!";

successMessage.passwordDecryption = "Password has been successfully decrypted";
successMessage.passwordEncryption = "Password has been successfully encrypted";


module.exports = {
    errorMessage,
    errorDescription,
    successMessage,
}
