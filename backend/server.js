document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission behavior
  const form = event.target;
  const formData = new FormData(form);

  // Send form data to Formspree
  fetch(form.action, {
      method: "POST",
      body: formData
  })
  .then(response => {
      if (response.ok) {
          // Check if the response contains JSON
          return response.json().then(data => {
              // You can process the response data if necessary
              console.log("Response from Formspree:", data);
              alert("Thank you for your message!");
              form.reset(); // Optionally reset the form
          }).catch(() => {
              // If no JSON data is returned, just handle it as success
              alert("Thank you for your message!");
              form.reset(); // Optionally reset the form
          });
      } else {
          // If the response is not OK, show an error
          alert("Oops! There was an error submitting the form. Please try again.");
      }
  })
  .catch(error => {
      // Handle network or other errors
      alert("There was an issue with the form submission. Please try again.");
      console.error("Form submission error: ", error);
  });
});
