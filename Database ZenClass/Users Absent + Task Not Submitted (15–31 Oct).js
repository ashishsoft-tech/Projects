db.users.aggregate([
  {
    $match: {
      attendance: { $lt: 70 }
    }
  },
  {
    $lookup: {
      from: "tasks",
      localField: "_id",
      foreignField: "submitted_users",
      as: "tasks"
    }
  },
  {
    $match: {
      tasks: { $size: 0 }
    }
  }
])