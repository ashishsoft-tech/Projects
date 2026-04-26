db.company_drives.find({
  date: {
    $gte: ISODate("2025-10-15"),
    $lte: ISODate("2025-10-31")
  }
})