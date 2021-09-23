const router = require('express').Router();

// GET /api/robots
router.get('/', async (req, res, next) => {
  try {
    const robots = await Robot.findAll({
      attributes: ['id', 'name', 'fuelType', 'fuelLevel', 'imageUrl'],
    });
    res.json(robots);
  } catch (error) {
    next(error);
  }
});



module.exports = router;
