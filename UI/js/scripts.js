// Function to toggle the navigation on responsive screens
const menuToggler = () => {
  let nav = document.getElementById("nav");
  let dropdown = document.getElementById("dropdown-nav");
  nav.classList.toggle("showing");
  dropdown.classList.toggle("showing");
  // alert("bars clicked");
};

// Deletion confirmation box

const deleteConfirmation = () => {
  confirm("Are you sure you want to delete this?");
};
