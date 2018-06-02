var shell = require('shelljs');
/**
- file_path is the OSS_Python_API folder in the server, which save the files such as oss_api.py, config, osscmd, etc.
- upload_path is the relative folder path that upload the files in.
- cdn_path is the cdn link path which you should apply for. 
*/
exports.shell_oss =  (file_path, upload_path, cdn_path) =>{
    shell.cd(file_path);
    //判定osscmd命令是否可用
    if (!shell.which('./osscmd')) {
        shell.echo('Sorry, this script requires osscmd'); //向命令行打印git命令不可用的提示信息
        shell.exit(1); //退出当前进程
    }
    return new Promise((resolve, reject) => {
        // 执行oss命令建立相应链接
        if (shell.exec(`./osscmd --config_file ./config uploadfromdir ${upload_path} ${cdn_path}` ).code !== 0) {
            shell.echo('Error Occured');
            shell.exit(1);
        }
        //切换当前工作目录到上一层
        shell.cd('..');
    })
}
