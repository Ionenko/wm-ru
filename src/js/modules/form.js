import validate from 'validate.js';

// These are the constraints used to validate the form
const constraints = {
    fullName: {
        // You need to pick a username too
        presence: {
            message: "^Заполните поле"
        },
        // And it must be between 3 and 20 characters long
        length: {
            minimum: 3,
            maximum: 36,
            tooShort: "^Не менее %{count} символов",
            tooLong: "^Не более %{count} символов"
        }
    },
    birthYear: {
        presence: {
            message: "^Заполните поле"
        }
    },
    location: {
        presence: {
            message: "^Заполните поле"
        },
        // And it must be between 3 and 20 characters long
        length: {
            minimum: 3,
            maximum: 36,
            tooShort: "^Не менее %{count} символов",
            tooLong: "^Не более %{count} символов"
        }
    },
    skype: {
        presence: {
            message: "^Заполните поле"
        },
        length: {
            minimum: 4,
            maximum: 32,
            tooShort: "^Не менее %{count} символов",
            tooLong: "^Не более %{count} символов"
        }
    },
    email: {
        presence: {
            message: "^Заполните поле"
        },
        email: true
    },
    comment: {
        presence: {
            message: "^Заполните поле"
        },
        length: {
            minimum: 12,
            tooShort: "^Не менее %{count} символов",
        }
    },
};

function handleFormSubmit(form, input){

    let errors = validate(form, constraints);
    showErrors(form, errors || {});

    if (!errors) {
        showSuccess();
    }
}

var form = document.querySelector(".questionnaire form");

form.addEventListener("submit", function(e) {
    e.preventDefault();
    console.log('submit form');
    handleFormSubmit(this);
});

// Hook up the inputs to validate on the fly
var inputs = document.querySelectorAll("input, textarea, select");
for (var i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener("change", function(ev) {
        var errors = validate(form, constraints) || {};
        showErrorsForInput(this, errors[this.name])
    });
}

// Updates the inputs with the validation errors
function showErrors(form, errors) {
    // We loop through all the inputs and show the errors for that input
    Array.from(form.querySelectorAll("input[name], select[name]")).forEach(input => {

        showErrorsForInput(input, errors && errors[input.name]);
    });
}

// Shows the errors for a specific input
function showErrorsForInput(input, errors) {
    // This is the root of the input
    var filed = closestParent(input.parentNode, "field");
    // Find where the error messages will be insert into
    // First we remove any old messages and resets the classes
    restField(filed);
    // If we have errors
    if (errors) {
        // we first mark the group has having errors
        filed.classList.add("has-error");
        // then we append all the errors

        Array.from(errors).forEach(error => {
            addError(filed, error);
        });
    } else {
        // otherwise we simply mark it as success
        filed.classList.add("has-success");
    }
}

// Recusively finds the closest parent that has the specified class
function closestParent(child, className) {
    if (!child || child == document) {
        return null;
    }
    if (child.classList.contains(className)) {
        return child;
    } else {
        return closestParent(child.parentNode, className);
    }
}

function restField(filed) {
    // Remove the success and error classes
    filed.classList.remove("has-error");
    filed.classList.remove("has-success");
    // and remove any old messages
    Array.from(filed.querySelectorAll(".error")).forEach(el => {
        el.parentNode.removeChild(el);
    });
}

// Adds the specified error with the following markup
// <p class="help-block error">[message]</p>

function addError(field, error) {
    var block = document.createElement("span");
    block.classList.add("error");
    block.innerText = error;
    field.appendChild(block);
}

function showSuccess() {
    alert("Success! Form submit");
}