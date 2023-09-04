const { genericFilter } = require("../controllers/global");
const router = require("express").Router();

router.post("/filter", genericFilter);

module.exports = router;
