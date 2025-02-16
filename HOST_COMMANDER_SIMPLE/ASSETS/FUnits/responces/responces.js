class ResponceCtrl {
    constructor() {
        this.responce_base = null;
        this.questions = [
            {
                name: 'Вы подтвержаете своё присутствие?',
                opts: [
                    { text: "Да" },
                    { text: "Нет" },
                ]
            },
            {
                name: 'Ваше предпочтение в алкоголе:',
                mode: 'multi',
                opts: [
                    { text: "Водка" },
                    { text: "Коньяк" },
                    { text: "Вино" },
                    { text: "Шампанское" },
                    { text: "Другое", custom_input: true },
                ]
            },
        ];
        this.answer = {};
        this.answer_button_base = null;
        this.INIT();
    }

    INIT(THIS = this) {
        THIS.responce_base = document.querySelector(".responce_panel");
        THIS.r_close = document.querySelector(".r_close");
        THIS.responce_base.addEventListener('click', function (e) {
            THIS.responce_base.classList.add('unraveled');
            THIS.r_close.classList.add('unraveled');
        });
        THIS.r_close.addEventListener('click', function (e) {
            THIS.responce_base.classList.remove('unraveled');
            THIS.r_close.classList.remove('unraveled');
        });
        let human_name_input = document.querySelector('.human_name_input');
        human_name_input.addEventListener('input', function (e) {
            console.log(this.value);
            console.log(human_name_input.value);
            THIS.answer.human_name = human_name_input.value;
            THIS.CHECK_SEND_ACCESS();
        })

        for (let q of THIS.questions) {
            let q_base = THIS.DRAW_OPT_SELECTOR(q);
        }
        THIS.answer_button_base = document.createElement('div');
        THIS.answer_button_base.classList.add('ans_base');

        let ans_button = document.createElement('div');
        ans_button.classList.add('ans_button');
        THIS.answer_button_base.classList.add('inactive');
        ans_button.innerHTML = 'Отправить';
        THIS.answer_button_base.appendChild(ans_button);
        THIS.responce_base.appendChild(THIS.answer_button_base);
        ans_button.addEventListener('click',function(e){
            if (!THIS.answer_button_base.classList.contains('inactive')){
                
            }
        })

    }

    DRAW_OPT_SELECTOR(cfg = {
        name: 'name',
        opts: [
            { text: 'Да' },
            { text: 'Нет' },
        ],
    }, THIS = this) {
        let opt_name = document.createElement('div');
        opt_name.classList.add("name");
        opt_name.innerHTML = cfg.name;
        THIS.responce_base.appendChild(opt_name);

        let opt_base = document.createElement('div');
        opt_base.classList.add('r_opts_base');
        THIS.responce_base.appendChild(opt_base);

        let opt_buttons = [];
        for (let opt of cfg.opts) {
            let opt_button = document.createElement('div');
            opt_button.innerHTML = opt.text;
            opt_button.classList.add('r_opt');
            opt_button.setAttribute('data-name', opt.text);
            opt_base.appendChild(opt_button);
            opt_buttons.push(opt_button);

            if (opt.custom_input) {
                opt_button.classList.add('custom_input');
                let opt_input = document.createElement('input');
                opt_input.placeholder = cfg.name;
                opt_input.classList.add('r_opt_input');
                opt_button.appendChild(opt_input);
                opt_input.addEventListener('input', function (e) {
                    THIS.answer[cfg.name] = opt_input.value;
                });
                opt_input.addEventListener('click', function (e) {
                    e.stopPropagation();
                })
            }

            opt_button.addEventListener('click', function (e) {
                if (cfg.mode == 'multi') {
                    opt_button.classList.toggle('selected');

                    if (THIS.answer[cfg.name] == null) {
                        THIS.answer[cfg.name] = {};
                    }
                    opt_buttons.forEach((b) => {
                        if (b.classList.contains('selected')) {
                            THIS.answer[cfg.name][b.getAttribute('data-name')] = true;
                        }
                        else {
                            THIS.answer[cfg.name][b.getAttribute('data-name')] = false;
                        }
                    });
                }
                else {
                    opt_buttons.forEach((b) => {
                        b.classList.remove('selected');
                        THIS.answer[cfg.name] = opt.text;
                    });
                    opt_button.classList.add('selected');

                }
                THIS.CHECK_SEND_ACCESS();
                console.log(THIS.answer);
            });
        }
        return opt_base;
    }

    CHECK_SEND_ACCESS(THIS = this) {
        if (THIS.answer.human_name && THIS.answer["Вы подтвержаете своё присутствие?"]){
            THIS.answer_button_base.classList.remove('inactive');
        }
        else {
            THIS.answer_button_base.classList.add('inactive');
        }
    }
}

let responceCtrl = new ResponceCtrl();