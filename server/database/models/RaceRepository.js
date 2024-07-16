const AbstractRepository = require("./AbstractRepository");

class RaceRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "race" as configuration
    super({ table: "race" });
  }

  // The C of CRUD - Create operation

  async create(race) {
    // Execute the SQL INSERT query to add a new race to the "race" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, user_id) values (?, ?)`,
      [race.title, race.user_id]
    );

    // Return the ID of the newly inserted race
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific race by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the race
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all races from the "race" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of races
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing race

  // async update(race) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an race by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = RaceRepository;
