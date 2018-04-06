    // const httpUrl1 = "http://127.0.0.1:3000/menus";
    // const httpUrl2 = "http://127.0.0.1:5000/";
    const relaUrl = "./src/service/";
    const firstShow = "m_1.json";
    let root = $('.nav.navbar-nav');
    let root1 = $('.metismenu#menu2');
    let lileft = '';
    // function m_1(resource){
    //     if(resource){
    //         if(resource.children){
    //             let lileftchild = new Array(100);
    //             for(let i = 0; i < lileftchild.length; i++){
    //                 lileftchild[i] = '';
    //             }
    //             let res0= resource.children;
    //             for(let i = 0; i < res0.length; i++){
    //                 let res00 = res0[i].children;
    //                 if(res00){
    //                     for(let j = 0; j < res00.length; j++){
    //                         lileftchild[i] += `<li><a href="#" onclick="menuClick('` + './src/' + res00[j].url + `')">` + '<span class=" ' + res00[j].class + '"></span>' + ' ' + res00[j].name + '</a>'+'</li>';
    //                     }
    //                     lileft += '<li><a class="has-arrow" href="#">'+'<span class=" '+ res0[i].class + '"></span>' + ' ' + res0[i].name + '</a>' + '<ul aria-expanded="true">' + lileftchild[i] + '</ul>' +'</li>';
    //                 }
    //             }
    //             // $('#menu2').metisMenu('dispose');
    //             root1.append(lileft);
    //             $('#menu2').metisMenu({
    //                 toggle:false
    //             });
    //             lileft = '';
    //         }


    //     }
    //     return resource;
    // }
    function childmenu(resource) {
        console.log(resource)
        if(resource){
            if(resource.children){
                let lileftchild = new Array(100);
                for(let index = 0; index < lileftchild.length; index++){
                    lileftchild[index] = '';
                }
                let res0= resource.children;
                for(let k = 0; k < res0.length; k++){
                    let res00 = res0[k].children;
                    if(res00){
                        for(let j = 0; j < res00.length; j++){
                            lileftchild[k] += `<li><a href="#" onclick="menuClick('` + res00[j].url + `')">` + '<span class=" ' + res00[j].class + '"></span>' + ' ' + res00[j].name + '</a>'+'</li>';
                        }
                        lileft += '<li><a class="has-arrow" href="#">'+'<span class=" '+ res0[k].class + '"></span>' + ' ' + res0[k].name + '</a>' + '<ul aria-expanded="true">' + lileftchild[k] + '</ul>' +'</li>';
                    }
                }
                // $('#menu2').metisMenu('dispose');
                root1.append(lileft);
                $('#menu2').metisMenu({
                    toggle:false
                });
                lileft = '';
            }
        }
    }
    function main(res) {
        if(res){
            res = res.menus;
            if(res.length){

                for(let i = 0; i < res.length; i++) {
                    let id = res[i].id;
                    let li = '';
                    li += '<li id="'+ id +'"><a href="#">' + res[i].name + '</a></li>';
                    root.append(li);
                }
                let script = '';
                let lia = $('.nav.navbar-nav li');
                let firstchoice ;
                $('.nav.navbar-nav li:nth-child(1)').toggleClass('active');

                lia.click(firstchoice,function () {
                    // console.log(root1);
                    root1.empty();
                    lia.removeClass('active');
                    $(this).addClass('active');
                    firstchoice = $(this).attr("id");
                    // for(let i = 0; i < res.length; i++){
                    //     if(firstchoice === res[i].id){
                    //
                    //
                    //     }
                    // }
                    let child = firstchoice;
                    childmenu();
                    $('#menu2').metisMenu('dispose');

                    script = document.createElement("script");
                    script.src = './src/service/' + child + '.json?callback=childmenu';
                    document.body.appendChild(script);
                    document.body.removeChild(script);
                });



            }
        }
    }




