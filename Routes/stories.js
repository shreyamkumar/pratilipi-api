const router = require("express").Router();
const stories = require("../Story");

// router.get("/", (req, res) => {
//   res.json(stories);
// });
router.get("/", (req, res) => res.json(stories));

router.get("/:id", (req, res) => {
  const found = stories.some((story) => story.id === parseInt(req.params.id));

  if (found) {
    res.json(stories.filter((story) => story.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({
      msg: `User not found with id ${req.params.id}`,
    });
  }
});

router.put("/:id", (req, res) => {
  const found = stories.some((story) => story.id === parseInt(req.params.id));

  if (found) {
    const updcount = req.body.user;
    stories.forEach((story) => {
      if (story.id === parseInt(req.params.id)) {
        story.read_counts += 1;
        res.json({
          msg: "Count Updated!",
          n: num,
        });
      }
    });
  } else {
    res.status(400).json({
      msg: `User not found with id ${req.params.id}`,
    });
  }
});

module.exports = router;
