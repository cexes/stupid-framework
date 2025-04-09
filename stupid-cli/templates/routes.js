const express = require('express');
const routes = express.Router();


router.get('/', {{ModelName}}Controller.index);
router.get('/:id', {{ModelName}}Controller.show);
router.post('/', {{ModelName}}Controller.store);
router.put('/:id', {{ModelName}}Controller.update);
router.delete('/:id', {{ModelName}}Controller.destroy);

module.exports = router;