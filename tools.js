var tool = {
    reg: function(val, reg, recObj){
        var cii2;
        if (val === "") {
            return null;
        }else{
            cii2 = [...val.match(reg)];
            return cii2;
        }
    },
    onlyUnique: function(value, index, self) { 
        return self.indexOf(value) === index;
    },
    googleSearchQuery: function(query, country="in", qty){
        var q;
        q = typeof qty === "undefined" ? "" : "&num="+qty;
        var re = "https://www.google.com/search?gl="+country+"&q="+query+q;
        return re;
    }
}
export default tool;
// module.exports = tool;