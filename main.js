// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

document.addEventListener("DOMContentLoaded", () => {
  const errorModal = document.getElementById("modal");
  const likeButtons = document.querySelectorAll(".like-glyph");

  // Add the .hidden class to the error modal initially
  errorModal.classList.add("hidden");

  // Function to handle the like button click event
  function handleLikeButtonClick(event) {
    const likeButton = event.target;

    mimicServerCall()
      .then(() => {
        // When server returns success
        likeButton.classList.add("activated-heart");
        likeButton.classList.remove("like-glyph");
        likeButton.innerText = "♥";
      })
      .catch(() => {
        // When server returns failure
        errorModal.classList.remove("hidden");
        const errorMessage = document.getElementById("modal-message");
        errorMessage.innerText = "Error: Server request failed.";
        setTimeout(() => {
          errorModal.classList.add("hidden");
        }, 3000);
      });
  }

  // Attach event listeners to like buttons
  likeButtons.forEach((button) => {
    button.addEventListener("click", handleLikeButtonClick);
  });

  // Function to handle unlike button click event
  function handleUnlikeButtonClick(event) {
    const likeButton = event.target;

    likeButton.classList.remove("activated-heart");
    likeButton.classList.add("like-glyph");
    likeButton.innerText = "♡";
  }

  // Attach event listeners to liked buttons
  const likedButtons = document.querySelectorAll(".activated-heart");
  likedButtons.forEach((button) => {
    button.addEventListener("click", handleUnlikeButtonClick);
  });
});

// Mock server call function
function mimicServerCall() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNum = Math.random();
      if (randomNum < 0.5) {
        resolve("Success");
      } else {
        reject("Failure");
      }
    }, 1000); // Simulating server delay
  });
}





//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
