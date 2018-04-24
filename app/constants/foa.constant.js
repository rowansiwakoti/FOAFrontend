(() => {
    'use strict';

    var VALUES = {
        APP_NAME: 'Food Ordering App',
        PAGE_NAME: 'User Login',
        INCORRECT_USER_PASSWORD: 'Incorrect Username Or Password.',
        ADD_MSG: 'has been added.',
        EDIT_MSG: 'has been edited.',
        DELETE_MSG: 'has been deleted.',
        LOGOUT_MSG: 'Are you sure you want to log out?',
        DELETE_FOOD_MSG: 'Are you sure you want to delete the food?',
        NO_FOOD_MSG: 'No Food Added.',
        MAX_ORDERS: 5,
        MIN_ORDERS: 1,
        FOA_APP: 'http://localhost:8080',
        ORDER_INFO_MSG: 'You have successfully placed an order!',

        // constants for user registration
        FIRST_NAME_REQ: 'First name is required.',
        FIRST_NAME_TOO_SHORT: 'First name is too short.',
        FIRST_NAME_TOO_LONG: 'First name is too long.',
        MIDDLE_NAME_TOO_SHORT: 'Middle name is too short.',
        MIDDLE_NAME_TOO_LONG: 'Middle name is too long.',
        LAST_NAME_REQ: 'Last name is required.',
        LAST_NAME_TOO_SHORT: 'Last name is too short.',
        LAST_NAME_TOO_LONG: 'Last name is too long.',
        INVALID_EMAIL: 'Invalid email address.',
        EMAIL_ADD_REQ: 'Email address is required.',
        EMAIL_ADD_TOO_LONG: 'Email address is too long.',
        EMAIL_ADD_TOO_SHORT: 'Email address is too short',
        CONTACT_NO_REQ: 'Contact number is required.',
        CONTACT_NO_SIZE: 'Size should be 7 to 10 numbers only.',
        ADDRESS_REQ: 'Address is required',
        ADDRESS_TOO_SHORT: 'Address is too short',
        ADDRESS_TOO_LONG: 'Address is too long',
        INVALID_ADDRESS: 'Invalid address.',
        PASSWORD_REQ: 'Password is required.',
        PASSWORD_TOO_SHORT: 'Password is too short',
        PASSWORD_TOO_LONG: 'Password is too long',
        PASSWORD_NOT_MATCH: 'Password and Confirm Password did not match! Try Again.',
        USERNAME_NOT_EXIST: 'Username or password does not exist.',
        USER_ALREADY_EXIST: 'User email Id already exists.',

        // constants for restaurant
        REST_NAME_REQ: 'Restaurant name is required',
        REST_NAME_TOO_SHORT: 'Restaurant name is too short',
        REST_NAME_TOO_LONG: 'Restaurant name is too long',
        REST_ADDRESS_REQ: 'Restaurant address is required',
        REST_ADDRESS_TOO_SHORT: 'Restaurant address is too short',
        REST_ADDRESS_TOO_LONG: 'Restaurant address is too long',

        // constants for foods
        FOOD_NAME_REQ: 'Food name is required.',
        FOOD_NAME_TOO_LONG: 'Food name is too long.',
        FOOD_NAME_TOO_SHORT: 'Food name is too short.',
        FOOD_PRICE_REQ: 'Food price is required.',
        FOOD_PRICE_LOW: 'Food price is very low.',
        FOOD_PRICE_HIGH: 'Food price is very high.',

        ALPHABETS_AND_NUMBERS_ONLY: 'Accepts alphabets and numbers only.',
        ALPHABETS_ONLY: 'Accepts alphabets only.',
        NUMBERS_ONLY: 'Accepts numbers only.',
    };
    angular.module('FoodOrderingApp')
        .constant('APP_CONSTANT', VALUES);
})();