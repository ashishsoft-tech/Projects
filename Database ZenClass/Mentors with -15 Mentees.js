db.mentors.aggregate([
  {
    $project: {
      name: 1,
      mentee_count: { $size: "$mentees" }
    }
  },
  {
    $match: { mentee_count: { $gt: 15 } }
  }
])