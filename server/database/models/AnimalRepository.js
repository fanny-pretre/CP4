const AbstractRepository = require("./AbstractRepository");

class AnimalRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "animal" as configuration
    super({ table: "animal" });
  }

  // The C of CRUD - Create operation

  async create(animal) {
    try {
      // Execute the SQL INSERT query to add a new animal to the "animal" table
      const query = `
        INSERT INTO ${this.table} (
          image, name, age, gender, story, coming_date, status,
          personality, race_id, health_id, cohabitation_id   
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const [result] = await this.database.query(query, [
        animal.image,
        animal.name,
        animal.age,
        animal.gender,
        animal.story,
        animal.coming_date,
        animal.status,
        animal.personality,
        animal.race_id,
        animal.health_id,
        animal.cohabitation_id,
      ]);

      // Return the ID of the newly inserted animal
      return result.insertId;
    } catch (error) {
      // Handle any errors that occur during the database operation
      throw new Error(`Error inserting animal: ${error.message}`);
    }
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

  async readAllAdoptable() {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE status = ?`,
      ["à l'adoption"]
    );

    // Return the array of animals
    return rows;
  }

  async readAllAdopted() {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE status = ?`,
      ["adopté"]
    );

    // Return the array of animals
    return rows;
  }

  async update(animal) {
    // Execute the SQL UPDATE query to update a specific animal

    const [result] = await this.database.query(
      `update ${this.table} set image = ?, name = ?, age = ?, gender = ?, story = ?, status = ?, personality = ?, race_id = ? where id = ?`,

      [
        animal.image,
        animal.name,
        animal.age,
        animal.gender,
        animal.story,
        animal.status,
        animal.personality,
        animal.race_id,
        animal.id,
      ]
    );

    // Return how many rows were affected
    console.info(result.affectedRows);
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to delete a specific animal

    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,

      [id]
    );

    // Return how many rows were affected

    return result.affectedRows;
  }
}

module.exports = AnimalRepository;
