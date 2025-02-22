class DataToChartParser {
    constructor(opts = {}) {
        this.data = opts.data;
        this.cfg = opts.cfg;
        console.log(this);
        this.result = {};
        this.startDate = null;
        this.endDate = null;
        this.Parse();
    }

    Parse(THIS = this) {
        THIS.GenerateTimeline(THIS);
        THIS.GenerateSeries(THIS);
    }

    GenerateTimeline(THIS = this) {
        THIS.startDate = Number(new Date(THIS.cfg.start)) / 1000 / 60 / 60 / 24;
        THIS.endDate = Number(new Date(THIS.cfg.end)) / 1000 / 60 / 60 / 24;
        let labels = [];

        for (let i = Number(THIS.startDate); i <= Number(THIS.endDate); i++) {
            let curDate = new Date(i * 24 * 60 * 60 * 1000);
            switch (THIS.cfg.timestep) {
                case 'month':
                    if (curDate.getDate() == 1) {
                        labels.push(THIS.ResolveMonthName(curDate.getMonth()));
                    }
                    else {
                        //labels.push(null);
                    }
                    break;
            }
        }
        console.log(labels);
        THIS.result.labels = labels;
    }

    GenerateSeries(THIS = this) {
        let series = [];
        for (let serie of THIS.cfg.data_axis_y) {
            let cur_serie = [];
            series.push(cur_serie);
            for (let i = Number(THIS.startDate); i <= Number(THIS.endDate); i++) {
                let curDate = new Date(i * 24 * 60 * 60 * 1000);
                switch (THIS.cfg.timestep) {
                    case 'month':
                        if (curDate.getDate() == 1) {
                            cur_serie.push(null);
                        }
                        else {
                            //cur_serie.push(null);
                        }
                        break;
                }
            }
            for (let row of THIS.data) {
                let dateQuant = row[THIS.cfg.data_axis_x];
                if (THIS.cfg.data_axis_x.includes('date')) {
                    dateQuant = Number(new Date(row[THIS.cfg.data_axis_x])) / 1000 / 60 / 60 / 24;
                }
                switch (THIS.cfg.timestep){
                    case 'month':
                        let curIndex = new Date(row[THIS.cfg.data_axis_x]).getMonth() + (new Date(row[THIS.cfg.data_axis_x]).getFullYear() - new Date(THIS.cfg.start).getFullYear())*12 - new Date(THIS.cfg.start).getMonth();
                        if (curIndex < cur_serie.length){
                            cur_serie[curIndex] += row[serie];
                        }
                        break;
                }
            }
        }

        THIS.result.series = series;
    }

    ResolveMonthName(month_number) {
        switch (month_number) {
            case 0:
                return 'Янв.';
            case 1:
                return 'Фев.';
            case 2:
                return 'Мар.';
            case 3:
                return 'Апр.';
            case 4:
                return 'Май.';
            case 5:
                return 'Июн.';
            case 6:
                return 'Июл.';
            case 7:
                return 'Авг.';
            case 8:
                return 'Сен.';
            case 9:
                return 'Окт.';
            case 10:
                return 'Ноя.';
            case 11:
                return 'Дек.';
            default:
                return null;
        }
    }
}