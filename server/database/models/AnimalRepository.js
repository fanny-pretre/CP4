const AbstractRepository = require("./AbstractRepository");

class AnimalRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "animal" as configuration
    super({ table: "animal" });
  }

  // The C of CRUD - Create operation

  async create(animal) {
    // Execute the SQL INSERT query to add a new animal to the "animal" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, user_id) values (?, ?)`,
      [animal.title, animal.user_id]
    );

    // Return the ID of the newly inserted animal
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific animal by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the animal
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "animal" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of users
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing animal

  // async update(animal) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an animal by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = AnimalRepository;
