let defalutColorPalette = [
    '#b148ea',
    '#4662ec',
    '#43c5e5',
    '#3dd6c4',
    '#25b170',
    '#2dd128',
    '#c7bf0b',
    '#c7680b',
    '#cd1a0a',
];


class ElementComponents {
    constructor(input = {}) {
        this.Init(input.type);
    }

    Init(type) {
        this.transform = new Transform({ width: 500, height: 500, x: 0, y: 0 }),
            this.data = {
                dataset: null,
                data_axis_x: 'date1',
                data_axis_y: ['int1', 'int2', 'int3'],
                start: '2024-01-01',
                end: '2024-12-31',
                timestep: 'month',
            };

        this.visual = {
            /*
            colorPalette: [
                '#111111',
                '#333333',
                '#444444',
                '#555555',
                '#666666',
                '#777777',
                '#888888',
                '#999999',
                '#aaaaaa',
            ],
            */
            //lineWidth: 3,
            //pointWidth: 10,
            legend: 'false',
        }
        switch (type) {
            case 'line_graph':
                this.visual.showArea = 'false';
                this.visual.lineWidth = 3;
                this.visual.pointWidth = 10;
                this.visual.colorPalette = defalutColorPalette;
                break;
            case 'area_line_graph':
                this.visual.showArea = 'true';
                this.visual.lineWidth = 3;
                this.visual.pointWidth = 10;
                this.visual.colorPalette = defalutColorPalette;
                break;
            case 'bar_graph':
                this.visual.horizontalBars = 'false';
                this.visual.barWidth = 12;
                this.visual.barSpread = 15;
                this.visual.colorPalette = defalutColorPalette;
                break;
            case 'pie_graph':
                this.visual.pieWidth = 70;
                this.visual.colorPalette = defalutColorPalette;
                break;
            default:
                break;
        }
    }
    static ResolveCategoryName(codename) {
        switch (codename) {
            case 'transform':
                return 'Позиция';
            case 'data':
                return 'Данные';
            case 'visual':
                return 'Визуал';
        }
    }
    static ResolveParam(codename) {
        switch (codename) {
            case 'width':
                return {
                    name: 'Ширина',
                    type: 'transform_number',
                };
            case 'height':
                return {
                    name: 'Высота',
                    type: 'transform_number',
                };
            case 'x':
                return {
                    name: 'X',
                    type: 'transform_number',
                };
            case 'y':
                return {
                    name: 'Y',
                    type: 'transform_number',
                };
            case 'zIndex':
                return {
                    name: 'Z',
                    type: 'transform_number',
                    min: 0,
                    max: 99,
                };
            case 'scale':
                return {
                    name: 'Масштаб',
                    type: 'transform_number',
                };
            case 'dataset':
                return {
                    name: 'Данные',
                    type: 'dataset',
                };
            case 'data_axis_x':
                return {
                    name: 'Ось Х',
                    type: 'data_axis_x',
                };
            case 'data_axis_y':
                return {
                    name: 'Ось У',
                    type: 'data_axis_y',
                };
            case 'start':
                return {
                    name: 'Начало периода отображения',
                    type: 'date',
                };
            case 'end':
                return {
                    name: 'Конец периода отображения',
                    type: 'date',
                };
            case 'timestep':
                return {
                    name: 'Агригирование по времени',
                    type: 'selector',
                    opts: [
                        { name: 'МЕСЯЦ', value: 'month' },
                    ]
                };
            case 'colorPalette':
                return {
                    name: 'Цветовая палитра',
                    type: 'colorPalette',
                };
            case 'lineWidth':
                return {
                    name: 'Ширина линии',
                    type: 'number',
                };
            case 'barWidth':
                return {
                    name: 'Ширина столбца',
                    type: 'number',
                };
            case 'barSpread':
                return {
                    name: 'Отступ между столбцами',
                    type: 'number',
                };
            case 'horizontalBars':
                return {
                    name: 'Горизонтальная ориентация',
                    type: 'selector',
                    opts: [
                        { name: 'ВКЛ', value: 'true' },
                        { name: 'ВЫКЛ', value: 'false' },
                    ]
                };
            case 'showArea':
                return {
                    name: 'Область',
                    type: 'selector',
                    opts: [
                        { name: 'ВКЛ', value: 'true' },
                        { name: 'ВЫКЛ', value: 'false' },
                    ]
                };
            case 'pieWidth':
                return {
                    name: 'Ширина бублика',
                    type: 'number',
                };
            case 'pointWidth':
                return {
                    name: 'Размер точек',
                    type: 'number',
                };
            case 'legend':
                return {
                    name: 'Легенда',
                    type: 'selector',
                    opts: [
                        { name: 'ВЫКЛ', value: 'false' },
                        { name: 'ВНИЗУ', value: 'down' },
                        { name: 'СЛЕВА', value: 'left' },
                        { name: 'СПРАВА', value: 'right' },
                    ]
                };
            default:
                return {
                    name: codename,
                    type: 'number',
                }
        }
    }
}
