const AbstractRepository = require("./AbstractRepository");

class ContactRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "contact" as configuration
    super({ table: "contact" });
  }

  // The C of CRUD - Create operation

  async create(contact) {
    // Execute the SQL INSERT query to add a new contact to the "contact" table
    const [result] = await this.database.query(
      `insert into ${this.table} (animal_id, user_id) values (?, ?)`,
      [contact.animal_id, contact.user_id]
    );

    // Return the ID of the newly inserted contact
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific contact by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the contact
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all contacts from the "contact" table
    const [rows] = await this.database.query(`select contact.id,
      contact.request_date,
      user.firstname,
      user.lastname,
      user.email,
      user.telephone,
      animal.name AS animal_name 
      from ${this.table}
      JOIN 
      user ON contact.user_id = user.id
    JOIN 
      animal ON contact.animal_id = animal.id`);

    // Return the array of contacts
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing contact

  // async update(contact) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an contact by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = ContactRepository;
