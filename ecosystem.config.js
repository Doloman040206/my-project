module.exports = {
  apps: [
    {
      name: 'my-app',
      script: 'npm',
      args: 'run start',
      cwd: __dirname,
      interpreter: 'cmd.exe',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
