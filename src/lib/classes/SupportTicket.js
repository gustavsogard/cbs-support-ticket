class SupportTicket {
  constructor(
    ticketId,
    status,
    title,
    description,
    createdAt,
    createdBy,
    assignedTo,
    category,
    affectedUser
  ) {
    this.ticketId = ticketId;
    this.status = status;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.assignedTo = assignedTo;
    this.category = category;
    this.affectedUser = affectedUser;
  }

  createSupportTicket() {
    // Implement support ticket creation API call
  }
}
