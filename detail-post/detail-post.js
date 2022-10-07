// Imports
import '../auth/user.js';
import { getPost } from '../fetch-utils.js';

// DOM
// const errorDisplay = document.getElementById('error-display');
const postTitle = document.getElementById('post-title');
const postImage = document.getElementById('post-image');
const postText = document.getElementById('post-text');

// State
let error = null;
let post = null;

// Events
window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    if (!id) {
        location.replace('/');
        return;
    }

    const response = await getPost(id);
    error = response.error;
    post = response.data;

    if (error) {
        alert(error.message + '. ' + 'Please contact the administrator for more information.');
        location.replace('/');
    } else {
        displayPost();
    }
});

// Display functions

// function displayError() {
//     if (error) {
//         console.log(error);
//         errorDisplay.textContent = error.message;
//     }
// }

function displayPost() {
    postTitle.textContent = post.title;
    postImage.src = post.image_url;
    postImage.alt = `${post.title} image`;
    postText.textContent = post.text;
}
