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
        ) VALUES (?, ?, ?, ?, ?,  ?, ?, ?, ?, 1, 1)
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
