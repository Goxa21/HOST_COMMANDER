function ResolveIconLinks(iconName) {
    let iconLinks = {
        "G1": '/HC_CORE/images/graph1.png',
        "G2": '/HC_CORE/images/graph2.png',
        "G3": '/HC_CORE/images/graph3.png',
        "G4": '/HC_CORE/images/graph4.png',
        "G5": '/HC_CORE/images/graph5.png',
        "G6": '/HC_CORE/images/graph6.png',
        "G7": '/HC_CORE/images/graph7.png',
        "G8": '/HC_CORE/images/graph8.png',
        "T_KEY": '/HC_CORE/images/TY_Key.png',
        "T_NUMERIC": '/HC_CORE/images/TY_Num.png',
        "T_TEXT": '/HC_CORE/images/TY_Txt.png',
        "T_TIMESTAMPTZ": "",
        "T_DATE": '/HC_CORE/images/TY_Time.png',
        "T_NEW": '/HC_CORE/images/TY_New.png',
        "Filter": '/HC_CORE/images/Filter.png',
        "Sorter": '/HC_CORE/images/Sorter.png',
        "SRT_UD": '/HC_CORE/images/Sorter_UD.png',
        "SRT_U": '/HC_CORE/images/Sorter_U.png',
        "SRT_D": '/HC_CORE/images/Sorter_D.png',
        "BOX": '/HC_CORE/images/BL1_100px.png',
        "NEW_ELEM": '/HC_CORE/images/New_element.png',
        "NEW_FOLDER": '/HC_CORE/images/New_folder.png',
        "FOLDER": '/HC_CORE/images/folder.png',
        "FOLDER_SVG": '/HC_CORE/svg/folder.svg',
        "Elem_settings": '/HC_CORE/images/Element_settings.png',
    }
    if (iconLinks[iconName] == null){
        return '../../HC_CORE/images/CLC_1.png';
    }
    return iconLinks[iconName];
    
}




let pkg = {
    username:'gegelgg',
    device:'127.0.0.1',
    id_view:1,
    data:{
        headers:['date1','int1','int2'],
        rows:[
            {date1:'10-10-2010',int1:1,int2:2},
            {date1:'12-10-2010',int1:2,int2:20},
            {date1:'14-10-2010',int1:4,int2:200},
        ],
        config:{
            header_info:{
                date1:{
                    name:'Дата выполнения',
                    posit:0,
                    pr_del:false,
                    width:'250px',
                    type:'date',
                },
                int1:{
                    name:'План',
                    posit:1,
                    pr_del:false,
                    width:'120px',
                    type:'int',
                },
                int2:{
                    name:'Факт',
                    posit:2,
                    pr_del:false,
                    width:'120px',
                    type:'int',
                },
                int3:{
                    name:'Факт',
                    posit:2,
                    pr_del:false,
                    width:'120px',
                    type:'int',
                }
            },
        },
    },
}