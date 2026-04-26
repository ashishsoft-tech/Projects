db.company_drives.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "students_appeared",
      foreignField: "_id",
      as: "students"
    }
  }
])