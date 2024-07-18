const AbstractRepository = require("./AbstractRepository");

class HealthRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "health" as configuration
    super({ table: "health" });
  }

  // The C of CRUD - Create operation

  async create(health) {
    // Execute the SQL INSERT query to add a new health to the "health" table
    const [result] = await this.database.query(
      `insert into ${this.table} (sterilisation, vaccination, identification, decontamination, background, observations) values (?, ?, ?, ?, ?, ?)`,
      [
        health.sterilisation,
        health.vaccination,
        health.identification,
        health.decontamination,
        health.background,
        health.observations,
      ]
    );

    // Return the ID of the newly inserted health
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific health by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the health
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all healths from the "health" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of healths
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing health

  // async update(health) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an health by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = HealthRepository;
