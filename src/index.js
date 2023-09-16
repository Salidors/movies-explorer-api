const app = require('./app');
const { PORT } = require('./configs/env');
require('./db');

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
