"use strict";
exports.__esModule = true;
exports.UserStatus = exports.UserRole = exports.USER_COLLECTION = void 0;
exports.USER_COLLECTION = "users";
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "USER";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "ACTIVE";
    UserStatus["DISABLED"] = "DISABLED";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
