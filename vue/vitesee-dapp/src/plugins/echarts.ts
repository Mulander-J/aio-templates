import * as echarts from 'echarts/core'

import {
    // BarChart,
    LineChart,
    // PieChart
} from 'echarts/charts'

import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    // DataZoomComponent,
    // DatasetComponent
} from 'echarts/components'

import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
    /* Component */

    LegendComponent,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    // DataZoomComponent,
    // DatasetComponent,

    /* Charts */

    // BarChart,
    LineChart,
    // PieChart,

    /* Renderer */

    CanvasRenderer
])

export default echarts
