const express = require("express")
const app = express()
const port = 3001
const dbConnection = require("./db-connection.js")
const bodyParser = require("body-parser")

app.use(bodyParser.json())

// app.get("/", (req, res) => {
//   res.send("Hello, world! :D")
// })

//show users
app.get("/api/users", (req, res) => {
  dbConnection.query("SELECT * FROM user", (error, results) => {
    if (error) {
      console.error("Error retrieving users:", error)
      res.status(500).json({ error: "An error occurred" })
    } else {
      res.json(results)
    }
  })
})

//add user
app.put("/api/add-user", (req, res) => {
  const userData = req.body
  dbConnection.query(
    "INSERT INTO user (username, email, password) VALUES (?, ?, ?)",
    [userData.username, userData.email, userData.password],
    (error, results) => {
      if (error) {
        console.error("Error inserting user:", error)
        res.status(500).json({ error: "An error occurred" })
      } else {
        const insertedUserId = results.insertId
        res
          .status(201)
          .json({ id: insertedUserId, message: "User created successfully" })
      }
    }
  )
})

//delete user
app.delete("/api/delete-user/:id", (req, res) => {
  const userId = req.params.id
  dbConnection.query(
    "DELETE FROM user WHERE id = ?",
    [userId],
    (error, results) => {
      if (error) {
        console.error("Error deleting user:", error)
        res.status(500).json({ error: "An error occurred" })
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: "User not found" })
      } else {
        res.status(200).json({ message: "User deleted successfully" })
      }
    }
  )
})

//edit user
app.patch("/api/edit-user/:id", (req, res) => {
  const userId = req.params.id
  const updatedUserData = req.body
  dbConnection.query(
    "UPDATE user SET email = ?, password = ? WHERE id = ?",
    [updatedUserData.email, updatedUserData.password, userId],
    (error, results) => {
      if (error) {
        console.error("Error updating user:", error)
        res.status(500).json({ error: "An error occurred" })
      } else {
        res.json({ message: "User updated successfully" })
      }
    }
  )
})

//show recipes
app.get("/api/recipes", (req, res) => {
  dbConnection.query("SELECT * FROM recipe", (error, results) => {
    if (error) {
      console.error("Error retrieving recipes:", error)
      res.status(500).json({ error: "An error occurred" })
    } else {
      res.json(results)
    }
  })
})

//add recipe
app.put("/api/add-recipe", (req, res) => {
  const recipeData = req.body
  dbConnection.query(
    "INSERT INTO recipe (title, description, category, user_id) VALUES (?, ?, ?, ?)",
    [
      recipeData.title,
      recipeData.description,
      recipeData.category,
      recipeData.user_id,
    ],
    (error, results) => {
      if (error) {
        console.error("Error inserting recipe:", error)
        res.status(500).json({ error: "An error occurred" })
      } else {
        const insertedRecipeId = results.insertId
        res.status(201).json({
          id: insertedRecipeId,
          message: "Recipe created successfully",
        })
      }
    }
  )
})

//delete recipe
app.delete("/api/delete-recipe/:id", (req, res) => {
  const recipeId = req.params.id
  dbConnection.query(
    "DELETE FROM recipe WHERE id = ?",
    [recipeId],
    (error, results) => {
      if (error) {
        console.error("Error deleting recipe:", error)
        res.status(500).json({ error: "An error occurred" })
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: "Recipe not found" })
      } else {
        res.status(200).json({ message: "Recipe deleted successfully" })
      }
    }
  )
})

//edit recipe
app.patch("/api/edit-recipe/:id", (req, res) => {
  const recipeId = req.params.id
  const updatedRecipeData = req.body
  dbConnection.query(
    "UPDATE recipe SET title = ?, description = ?, category = ? WHERE id = ?",
    [
      updatedRecipeData.title,
      updatedRecipeData.description,
      updatedRecipeData.category,
      recipeId,
    ],
    (error, results) => {
      if (error) {
        console.error("Error updating recipe:", error)
        res.status(500).json({ error: "An error occurred" })
      } else {
        res.json({ message: "Recipe updated successfully" })
      }
    }
  )
})

//show tasks
app.get("/api/tasks", (req, res) => {
  dbConnection.query("SELECT * FROM task", (error, results) => {
    if (error) {
      console.error("Error retrieving tasks:", error)
      res.status(500).json({ error: "An error occurred" })
    } else {
      res.json(results)
    }
  })
})

//add task
app.put("/api/add-task", (req, res) => {
  const taskData = req.body
  dbConnection.query(
    "INSERT INTO task (title, description, category, priority, user_id) VALUES (?, ?, ?, ?, ?)",
    [
      taskData.title,
      taskData.description,
      taskData.category,
      taskData.priority,
      taskData.user_id,
    ],
    (error, results) => {
      if (error) {
        console.error("Error inserting task:", error)
        res.status(500).json({ error: "An error occurred" })
      } else {
        const insertedTaskId = results.insertId
        res
          .status(201)
          .json({ id: insertedTaskId, message: "Task created successfully" })
      }
    }
  )
})

//delete task
app.delete("/api/delete-task/:id", (req, res) => {
  const taskId = req.params.id
  dbConnection.query(
    "DELETE FROM task WHERE id = ?",
    [taskId],
    (error, results) => {
      if (error) {
        console.error("Error deleting task:", error)
        res.status(500).json({ error: "An error occurred" })
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: "Task not found" })
      } else {
        res.status(200).json({ message: "Task deleted successfully" })
      }
    }
  )
})

//edit task
app.patch("/api/edit-task/:id", (req, res) => {
  const taskId = req.params.id
  const updatedTaskData = req.body
  dbConnection.query(
    "UPDATE task SET title = ?, category = ?, description = ?, priority = ? WHERE id = ?",
    [
      updatedTaskData.title,
      updatedTaskData.category,
      updatedTaskData.description,
      updatedTaskData.priority,
      taskId,
    ],
    (error, results) => {
      if (error) {
        console.error("Error updating task:", error)
        res.status(500).json({ error: "An error occurred" })
      } else {
        res.json({ message: "Task updated successfully" })
      }
    }
  )
})

//show notes
app.get("/api/notes", (req, res) => {
  dbConnection.query("SELECT * FROM note", (error, results) => {
    if (error) {
      console.error("Error retrieving notes:", error)
      res.status(500).json({ error: "An error occurred" })
    } else {
      res.json(results)
    }
  })
})

//add note
app.put("/api/add-note", (req, res) => {
  const noteData = req.body
  dbConnection.query(
    "INSERT INTO note (title, content, user_id) VALUES (?, ?, ?)",
    [noteData.title, noteData.content, noteData.user_id],
    (error, results) => {
      if (error) {
        console.error("Error inserting note:", error)
        res.status(500).json({ error: "An error occurred" })
      } else {
        const insertedNoteId = results.insertId
        res
          .status(201)
          .json({ id: insertedNoteId, message: "Note created successfully" })
      }
    }
  )
})

//delete note
app.delete("/api/delete-note/:id", (req, res) => {
  const noteId = req.params.id
  dbConnection.query(
    "DELETE FROM note WHERE id = ?",
    [noteId],
    (error, results) => {
      if (error) {
        console.error("Error deleting note:", error)
        res.status(500).json({ error: "An error occurred" })
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: "Note not found" })
      } else {
        res.status(200).json({ message: "Note deleted successfully" })
      }
    }
  )
})

//edit note
app.patch("/api/edit-note/:id", (req, res) => {
  const noteId = req.params.id
  const updatedNoteData = req.body
  dbConnection.query(
    "UPDATE note SET title = ?, content = ? WHERE id = ?",
    [updatedNoteData.title, updatedNoteData.content, noteId],
    (error, results) => {
      if (error) {
        console.error("Error updating note:", error)
        res.status(500).json({ error: "An error occurred" })
      } else {
        res.json({ message: "Note updated successfully" })
      }
    }
  )
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
