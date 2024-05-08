const userLoggedIn = {
  employeeNumber: "E1001",
};

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
  createButton.addEventListener("click", async function () {
    await fetch("/public/sections/create-section.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementsByClassName("content")[0].innerHTML = data;
      });

    const submitButton = document.getElementById("support-ticket-submit");
    submitButton.addEventListener("click", async function (event) {
      event.preventDefault();
      const getValue = (id) => document.getElementById(id).value;
      const title = getValue("title");
      const description = getValue("description");
      const assignedTo = getValue("assignedTo");
      const affectedUser = getValue("affectedUser");
      const category = getValue("category");

      const createdBy = "admin";

      const ticket = {
        title,
        description,
        createdBy,
        assignedTo,
        affectedUser,
        category,
      };

      fetch("/api/support-tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticket),
      })
        .then((response) => {
          if (response.status === 201) {
            return response.json();
          } else {
            alert("Udfyld alle påkrævede felter");
            throw new Error("Ticket was not created");
          }
        })
        .then((data) => {
          console.log(data);
          fetch("/api/support-tickets")
            .then((response) => response.json())
            .then((data) => {
              const ticketList = document.getElementsByClassName("content")[0];
              ticketList.innerHTML = "";
              data.forEach((ticket) => {
                const ticketElement = document.createElement("li");
                ticketElement.textContent = ticket.title;
                ticketList.appendChild(ticketElement);
              });
            });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });
});
