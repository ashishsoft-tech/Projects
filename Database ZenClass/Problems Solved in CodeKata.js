db.codekata.aggregate([
  {
    $group: {
      _id: "$user_id",
      totalSolved: { $sum: "$solved" }
    }
  }
])