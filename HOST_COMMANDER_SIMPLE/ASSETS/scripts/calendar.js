class Calendar {
    constructor() {
        this.root = document.querySelector('.calendar');
        this.Init();
    }

    Init(THIS = this) {
        let m_title = document.createElement('div');
        m_title.classList.add('m_title');
        m_title.innerHTML = 'Июль';
        THIS.root.appendChild(m_title);
        let table = document.createElement('table');
        table.classList.add('table');
        THIS.root.appendChild(table);

        let week_tr = document.createElement('tr');
        week_tr.classList.add('week_tr');
        table.appendChild(week_tr);
        for (let i = 1; i < 8; i++) {
            let week_td = document.createElement('td');
            week_td.classList.add('week_td');
            week_tr.appendChild(week_td);
            week_td.innerHTML = this.ResolveDayOfTheWeek(i);
        }
        let startDate = new Date(0);
        startDate.setFullYear(2025);
        startDate.setMonth(6);
        startDate.setDate(1);
        console.log(startDate.getDay())
        let stopCounter = 100;
        while (startDate.getMonth() == 6 && stopCounter > 0) {
            console.log(startDate);
            let t_tr = document.createElement('tr');
            t_tr.classList.add('t_tr');
            table.appendChild(t_tr);
            for (let i = 1; i < 8; i++) {
                let t_td = document.createElement('td');
                t_td.classList.add('t_td');
                t_tr.appendChild(t_td);
                let estimated_dofW = startDate.getDay();
                if (estimated_dofW == 0){
                    estimated_dofW = 7;
                }
                if (estimated_dofW == i && startDate.getMonth() == 6) {
                    if (startDate.getDate() == 12) {
                        t_td.classList.add('target');
                    }
                    t_td.innerHTML = startDate.getDate();
                    startDate.setDate(startDate.getDate() + 1);
                }
            }
            stopCounter--;
        }
    }

    ResolveDayOfTheWeek(id) {
        switch (id) {
            case 1:
                return 'Пн';
            case 2:
                return 'Вт';
            case 3:
                return 'Ср';
            case 4:
                return 'Чт';
            case 5:
                return 'Пт';
            case 6:
                return 'Сб';
            case 7:
            case 0:
                return 'Вс';

        }
    }
}

let calendar = new Calendar();