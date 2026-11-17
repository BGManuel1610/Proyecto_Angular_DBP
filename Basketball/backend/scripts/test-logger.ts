import app from '../src/app';

const server = app.listen(3999, async () => {
  const response = await fetch('http://localhost:3999/api/v1/health');
  console.log('status', response.status, await response.text());

  setTimeout(() => {
    server.close();
    process.exit(0);
  }, 300);
});
