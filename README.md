## Description
A Ticketing System where an Employee and a IT Personnel (Technician) can collaborate to fix a Hardware/Software issue in the office by issuing a Ticket for each issue.

## User Types
There are 2 user types:

1. Employee
2. Technician

## User Permissions & Restrictions
**Employee Permissions:**
* **Create** tickets.
* Assign or Unassign **Owned** tickets to a preferred technician.
* Delete or Edit on **Owned** tickets.
* Add Comment on **Owned** tickets.
* Delete, and Edit **Own** comments.

**Employee Restrictions:**
* Assign or Unassigned tickets that are **NOT** owned.
* Delete or Edit other employees tickets.
* Add Comment on other tickets that are **NOT** owned.

**Technician Permissions:**
* Assign **Unassigned** tickets to self.
* Unassign tickets that are **assigned** to self. 
* Edit ticket "Status" of tickets that are **assigned** to.
* Comment on tickets where he/she is **Assigned To**.
* Delete or Edit **own** comments. 

**Technician Restrictions:**
* **Create** or **Delete** Tickets.
* Edit other ticket information.
* Add Comment on other tickets that are **NOT** assigned to.
* Delete or Edit **not** own comments .
