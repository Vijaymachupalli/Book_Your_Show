const express = require("express");
const {
  fetchScreens,
  fetchLocations,
  fetchScreenings,
  fetchDates,
  addTheatre,
  addScreen,
  updateTheatre,
  deleteTheatre,
  updateScreen,
  deleteScreen,
  addTimeSlots,
  updateTimeSlots,
  deleteTimeSlots,
  addScreeningSchedule,
  updateScreeningSchedule,
  deleteScreeningSchedule,
  fetchTimeSlots,
  fetchScreeningSchedules,
} = require("../controllers/screeningControllers");
const router = express.Router();

router
  .route("/")
  .get(fetchScreens)
  .post(addTheatre)
  .put(updateTheatre)
  .delete(deleteTheatre);
router.route("/locations").get(fetchLocations);
router.route("/screenings").get(fetchScreenings);
router.route("/dates").get(fetchDates);
router.route("/screens").post(addScreen).put(updateScreen).delete(deleteScreen);
router
  .route("/TimeSlots")
  .get(fetchTimeSlots)
  .post(addTimeSlots)
  .put(updateTimeSlots)
  .delete(deleteTimeSlots);
router
  .route("/ScreeningSchedules")
  .get(fetchScreeningSchedules)
  .post(addScreeningSchedule)
  .put(updateScreeningSchedule)
  .delete(deleteScreeningSchedule);

module.exports = router;
