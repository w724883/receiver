var client = require('./client');
/*
1.上传目录
2.目标目录
3.排除的目录，多个目录用空格分隔

目标目录+上传目录=服务器生成的目录
*/
client('test','../../odp/webroot/audiobook/telecontroll','.git');