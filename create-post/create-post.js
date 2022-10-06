// imports
import '../auth/user.js';
import { createPost } from '../fetch-utils.js';

// DOM Elements
const postForm = document.getElementById('post-form');
const errorDisplay = document.getElementById('error-display');

// state
let error = null;

// Events
postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(postForm);

    const post = {
        title: formData.get('title'),
        text: formData.get('text'),
        url: formData.get('url'),
    };

    const response = await createPost(post);
    error = response.error;

    if (error) {
        displayError();
    } else {
        location.assign('/');
    }
});

// Display functions

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
