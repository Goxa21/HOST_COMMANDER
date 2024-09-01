class ModuleLibrary {
    constructor() {
        this.modules = {
            bi_intro:{
                icon:'./HC_CORE/images/graph7.png',
                href:'../FUnits/bi_intro/bi_intro.html',
            },
            bi_explorer:{
                icon:'./HC_CORE/images/graph1.png',
                href:'../FUnits/bi_explorer/bi_explorer.html',
            },
            bi_dataset_selector:{
                icon:'./HC_CORE/images/graph7.png',
                href:'../FUnits/bi_dataset_selector/bi_dataset_selector.html',
            },
            bi_dataset_editor:{
                icon:'./HC_CORE/images/graph7.png',
                href:'../FUnits/bi_dataset_editor/bi_dataset_editor.html',
            },
            bi_constructor:{
                icon:'./HC_CORE/images/graph7.png',
                href:'../FUnits/bi_constructor/bi_constructor.html',
            },
            ouk_check:{
                icon:'./HC_CORE/images/graph2.png',
                href:'../FUnits/ouk_check/ouk_check.html',
            },

            tetra:{
                icon:'./HC_CORE/images/graph2.png',
                href:'../egg_tetra/tetra.html',
            },
            defuser:{
                icon:'./HC_CORE/images/graph2.png',
                href:'../egg_defuser/defuser.html',
            },
            space_warrior:{
                icon:'./HC_CORE/images/graph2.png',
                href:'../egg_spacewarrior/spacewarrior.html',
            },
        };
    }

    ResolveDetails(codename) {
        return this.modules[codename];
    }
}

let MODULE_LIBRARY = new ModuleLibrary();