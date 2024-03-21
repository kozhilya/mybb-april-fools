
const { exec } = require('node:child_process');

const libUpload = {
    apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
            exec('./upload.sh', (err, stdout, stderr) => {
                if (stdout) process.stdout.write(stdout);
                if (stderr) process.stderr.write(stderr);
                console.log('Uploaded.');
            });
        });
    },
}

module.exports = { libUpload };