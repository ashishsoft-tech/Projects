db.topics.find({ month: "October" })
db.tasks.find({
  date: {
    $gte: ISODate("2020-10-01"),
    $lte: ISODate("2020-10-31")
  }
})