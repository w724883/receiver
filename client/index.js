var request = require('request');
var fs = require('fs');
var path = require('path');

function list(ways, excludes, handleFiles, floor) {  
    floor = floor || 0;
    handleFiles(ways, ++floor);  
    fs.readdir(ways, function(err, files) {  
        if (err) {  
            console.log('readdir error');  
        } else {  
            files.forEach(function(item) {
                if(item.indexOf(excludes) >= 0){
                    return false;
                }
                var tmpPath = ways + '/' + item;  
                fs.stat(tmpPath, function(err1, stats) {  
                    if (err1) {  
                        console.log('stat error');  
                    } else {  
                        if (stats.isDirectory()) {  
                            list(tmpPath, handleFiles, floor);  
                        } else {  
                            handleFiles(tmpPath, floor);  
                        }  
                    }  
                })  
            });  
  
        }  
    });  
}  


module.exports = function(from,to,excludes){
    list(from,excludes,function(ways,floor){    
        fs.stat(ways, function(err, stats) {
            if(stats.isFile()){
                var form = request.post('http://st01-rdqa04-dev121-weiruizhe.epc.baidu.com:8999/receiver').form();
                form.append('to',to+'/'+ways);
                form.append('file', fs.createReadStream(path.join(__dirname, ways)));
            }
        });
    });
}
