document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/api/support-tickets")
    .then((response) => response.json())
    .then((data) => {
      const ticketList = document.getElementsByClassName("content")[0];
      data.forEach((ticket) => {
        const ticketElement = document.createElement("li");
        ticketElement.textContent = ticket.title;
        ticketList.appendChild(ticketElement);
      });
    });

  const createButton = document.getElementById("create-ticket");
  createButton.addEventListener("click", function () {
    fetch("/public/sections/create-section.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementsByClassName("content")[0].innerHTML = data;
      });
  });
});
