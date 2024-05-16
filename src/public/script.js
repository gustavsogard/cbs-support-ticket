const userLoggedIn = {
  employeeNumber: "E1001",
};

async function fetchUsers() {
  const fetchJson = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const users = {
    itEmployees: await fetchJson("/api/users/it-employees").then((users) =>
      users.map(
        (user) =>
          new ITEmployee(
            user.userId,
            user.name,
            user.email,
            user.password,
            user.status,
            user.createdAt,
            user.passwordChangedAt,
            user.employeeNumber
          )
      )
    ),
    academics: await fetchJson("/api/users/academics").then((users) =>
      users.map(
        (user) =>
          new Academic(
            user.userId,
            user.name,
            user.email,
            user.password,
            user.status,
            user.createdAt,
            user.passwordChangedAt,
            user.academicId,
            user.title,
            user.department,
            user.phone
          )
      )
    ),
    students: await fetchJson("/api/users/students").then((users) =>
      users.map(
        (user) =>
          new Student(
            user.userId,
            user.name,
            user.email,
            user.password,
            user.status,
            user.createdAt,
            user.passwordChangedAt,
            user.studentNumber
          )
      )
    ),
  };

  return users;
}

const renderTickets = (tickets, users) => {
  const content = document.getElementsByClassName("content")[0];
  content.innerHTML = "";
  const ticketDiv = document.createElement("div");
  ticketDiv.className = "ticket-div";
  ticketDiv.innerHTML = `
    <h2>Åbne sager</h2>
  `;
  const ticketTable = document.createElement("table");
  const ticketHeader = document.createElement("tr");
  ticketHeader.innerHTML = `
    <th>Sagsnummer</th>
    <th>Sagsnavn</th>
    <th>Beskrivelse</th>
    <th>Oprettet af</th>
    <th>Tildelt til</th>
    <th>Påvirket bruger</th>
    <th>Kategori</th>
    <th>Status</th>
    <th>Oprettet</th>
  `;
  ticketTable.appendChild(ticketHeader);
  ticketDiv.appendChild(ticketTable);

  tickets.forEach((ticket) => {
    const ticketElement = document.createElement("tr");
    const date = new Date(ticket.createdAt);

    ticketElement.innerHTML = `
      <td>IR${ticket.ticketId}</td>
      <td>${ticket.title}</td>
      <td>${ticket.description}</td>
      <td>${
        [...users.students, ...users.academics, ...users.itEmployees]
          .find(
            (user) =>
              user.employeeNumber === ticket.createdBy ||
              user.studentNumber === ticket.createdBy ||
              user.academicId === ticket.createdBy
          )
          ?.email?.split("@")[0]
      }</td>
      <td> ${
        users.itEmployees
          .find((user) => user.employeeNumber === ticket.assignedTo)
          ?.email?.split("@")[0]
      }</td>
      <td> ${
        [...users.students, ...users.academics]
          .find(
            (user) =>
              user.studentNumber === ticket.affectedUser ||
              user.academicId === ticket.affectedUser
          )
          ?.email?.split("@")[0]
      }</td>
      <td>${ticket.category}</td>
      <td>${ticket.status}</td>
      <td>${date.toLocaleDateString()} ${date.toLocaleTimeString()}</td>
    `;
    ticketElement.onclick = async function () {
      alert(`Du har klikket på sagsnummer: IR${ticket.ticketId}`);
    };
    ticketTable.appendChild(ticketElement);
  });
  content.appendChild(ticketDiv);
};

document.addEventListener("DOMContentLoaded", async function () {
  const users = await fetchUsers();

  const createButton = document.getElementById("create-ticket");
  createButton.addEventListener("click", async function () {
    await fetch("/public/sections/create-section.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementsByClassName("content")[0].innerHTML = data;
      });

    const assignedToSelect = document.getElementById("assignedTo");
    const affectedUserSelect = document.getElementById("affectedUser");

    const createOption = (user) => {
      const option = document.createElement("option");
      option.value =
        user.employeeNumber || user.studentNumber || user.academicId;
      option.textContent = `${user.email?.split("@")[0]} (${user.name})`;
      return option;
    };

    users.itEmployees.forEach((user) => {
      assignedToSelect.appendChild(createOption(user));
    });

    users.students.forEach((user) => {
      affectedUserSelect.appendChild(createOption(user));
    });

    users.academics.forEach((user) => {
      affectedUserSelect.appendChild(createOption(user));
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

      const createdBy = userLoggedIn.employeeNumber;

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
        .then(() => {
          fetch("/api/support-tickets")
            .then((response) => response.json())
            .then((data) => renderTickets(data, users));

          alert("Sagen er oprettet");
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });

  if (new URLSearchParams(window.location.search).has("create")) {
    createButton.click();
    return;
  }

  fetch("/api/support-tickets")
    .then((response) => response.json())
    .then((data) => renderTickets(data, users));
});
