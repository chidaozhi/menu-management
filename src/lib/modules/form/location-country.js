     var Location = function () {
        this.items = {
            "0":{"1":"中国","15":"韩国","24":"日本"},
            "0,1":{"2":"北京市","11":"重庆市"},
            "0,1,2":{"3":"东城区","4":"西城区","5":"崇文区","6":"宣武区","7":"朝阳区","8":"丰台区","9":"石景山区","10":"海淀区"},
            "0,1,11":{"12":"渝中区","13":"大渡口区","14":"江北区"},
            "0,15":{"16":"首尔特别市","20":"釜山广域市"},
            "0,15,16":{"17":"南开区","18":"河北区","19":"红桥区"},
            "0,15,20":{"21":"长安区","22":"桥东区","23":"桥西区"},
            "0,24":{"25":"东京市"},
            "0,24,25":{"26":"安次区","27":"广阳区","28":"霸州市"}
        };
    };


    Location.prototype.find	= function(id) {
        if(typeof(this.items[id]) == "undefined")
            return false;
        return this.items[id];
    };

    Location.prototype.fillOption	= function(el_id , loc_id , selected_id) {
        var el	= $('#'+el_id);
        var json	= this.find(loc_id);
        if (json) {
            var index	= 1;
            var selected_index	= 0;
            $.each(json , function(k , v) {
                var option	= '<option value="'+k+'">'+v+'</option>';
                el.append(option);

                if (k == selected_id) {
                    selected_index	= index;
                }

                index++;
            })
            //el.attr('selectedIndex' , selected_index);
        }
        el.select2("val", "");
    };


