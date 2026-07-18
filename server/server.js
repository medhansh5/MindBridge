const app = require('./app');
const { admin } = require('./firebase');

const PORT = process.env.PORT || 3001;

const mode = admin.isMock ? 'IN-MEMORY mock mode' : 'Firebase mode';

app.listen(PORT, () => {
  console.log(`[MindBridge Backend] Server listening on port ${PORT}`);
  console.log(`[MindBridge Backend] Running in ${mode}`);
});
