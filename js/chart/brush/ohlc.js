jui.define("chart.brush.ohlc", [], function() {

    var OHLCBrush = function(chart, axis, brush) {
        var g;

        function getTargets(chart) {
            var target = {};

            for (var j = 0; j < brush.target.length; j++) {
                var t = chart.series(brush.target[j]);
                target[t.type] = t;
            }

            return target;
        }

        this.drawBefore = function() {
            g = chart.svg.group();
        }

        this.draw = function() {
            var targets = getTargets(chart);

            this.eachData(function(i, data) {
                var startX = axis.x(i);

                var open = targets.open.data[i],
                    close = targets.close.data[i],
                    low =  targets.low.data[i],
                    high = targets.high.data[i],
                    color = (open > close) ? chart.theme("ohlcInvertBorderColor") : chart.theme("ohlcBorderColor");

                var lowHigh = chart.svg.line({
                    x1: startX,
                    y1: axis.y(high),
                    x2: startX,
                    y2: axis.y(low),
                    stroke: color,
                    "stroke-width": 1
                });

                var close = chart.svg.line({
                    x1: startX,
                    y1: axis.y(close),
                    x2: startX + chart.theme("ohlcBorderRadius"),
                    y2: axis.y(close),
                    stroke: color,
                    "stroke-width": 1
                });

                var open = chart.svg.line({
                    x1: startX,
                    y1: axis.y(open),
                    x2: startX - chart.theme("ohlcBorderRadius"),
                    y2: axis.y(open),
                    stroke: color,
                    "stroke-width": 1
                });

                this.addEvent(lowHigh, i, null);

                g.append(lowHigh);
                g.append(close);
                g.append(open);
            });

            return g;
        }
    }

    return OHLCBrush;
}, "chart.brush.core");