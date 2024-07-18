const AbstractRepository = require("./AbstractRepository");

class CohabitationRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "cohabitation" as configuration
    super({ table: "cohabitation" });
  }

  // The C of CRUD - Create operation

  async create(cohabitation) {
    // Execute the SQL INSERT query to add a new cohabitation to the "cohabitation" table
    const [result] = await this.database.query(
      `insert into ${this.table} (human, cat, dog) values (?, ?, ?)`,
      [cohabitation.human, cohabitation.cat, cohabitation.dog]
    );

    // Return the ID of the newly inserted cohabitation
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific cohabitation by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the cohabitation
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all cohabitations from the "cohabitation" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of cohabitations
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing cohabitation

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an cohabitation by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = CohabitationRepository;
