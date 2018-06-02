var shell =require('shelljs')
exports.kill =  () =>{
    if (shell.exec("ps -ef | grep Chromium | grep -v grep | awk '{print $2}' | xargs kill -9").code !== 0) {
      echo('Error: Git commit failed');
      exit(1);
    }
    if (shell.exec("ps -ef | grep chrome | grep -v grep | awk '{print $2}' | xargs kill -9").code !== 0) {
      echo('Error: Git commit failed');
      exit(1);
    }
}