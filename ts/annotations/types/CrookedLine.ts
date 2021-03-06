/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

'use strict';
import H from '../../parts/Globals.js';

/**
 * Internal types.
 * @private
 */
declare global {
    namespace Highcharts {
        class AnnotationCrookedLine extends Annotation {
            public options: AnnotationCrookedLineOptionsObject;
            addControlPoints: () => void;
            getPointsOptions: () => Array<AnnotationMockPointOptionsObject>;
            public addBackground(): void;
            public addLine(): void;
            public addShapes(): void;
            public getControlPointsOptions(): Array<AnnotationMockPointOptionsObject>;
            public heightPointOptions(pointOptions: AnnotationMockPointOptionsObject): AnnotationMockPointOptionsObject;
            public setClipAxes(): void;
            public translateHeight(dh: number): void;
            public translateSide(dx: number, dy: number, end?: boolean): void;
        }
        interface AnnotationCrookedLineOptionsObject extends AnnotationsOptions {
            typeOptions: AnnotationCrookedLineTypeOptionsObject;
        }
        interface AnnotationCrookedLineTypeOptionsObject extends AnnotationsTypeOptions {
            points: Array<AnnotationsTypePointsOptions>;
        }
        interface AnnotationMockPointOptionsObject {
            controlPoint?: AnnotationControlPointOptionsObject;
        }
        interface AnnotationTypesDictionary {
            crookedLine: typeof AnnotationCrookedLine;
        }
    }
}

import '../../parts/Utilities.js';

var Annotation = H.Annotation,
    MockPoint = Annotation.MockPoint,
    ControlPoint = Annotation.ControlPoint;

/* eslint-disable no-invalid-this, valid-jsdoc */

const CrookedLine: typeof Highcharts.AnnotationCrookedLine = function (this: Highcharts.AnnotationCrookedLine): void {
    Annotation.apply(this, arguments as any);
} as any;

H.extendAnnotation(
    CrookedLine,
    null,
    {
        /**
         * Overrides default setter to get axes from typeOptions.
         * @private
         */
        setClipAxes: function (this: Highcharts.AnnotationCrookedLine): void {
            this.clipXAxis = this.chart.xAxis[this.options.typeOptions.xAxis as any];
            this.clipYAxis = this.chart.yAxis[this.options.typeOptions.yAxis as any];
        },
        getPointsOptions: function (
            this: Highcharts.AnnotationCrookedLine
        ): Array<Highcharts.AnnotationMockPointOptionsObject> {
            var typeOptions = this.options.typeOptions;

            return typeOptions.points.map(function (
                pointOptions: Highcharts.AnnotationsTypePointsOptions
            ): Highcharts.AnnotationMockPointOptionsObject {
                pointOptions.xAxis = typeOptions.xAxis;
                pointOptions.yAxis = typeOptions.yAxis;

                return pointOptions as any;
            });
        },

        getControlPointsOptions: function (
            this: Highcharts.AnnotationCrookedLine
        ): Array<Highcharts.AnnotationMockPointOptionsObject> {
            return this.getPointsOptions();
        },

        addControlPoints: function (this: Highcharts.AnnotationCrookedLine): void {
            this.getControlPointsOptions().forEach(
                function (
                    this: Highcharts.AnnotationCrookedLine,
                    pointOptions: Highcharts.AnnotationMockPointOptionsObject,
                    i: number
                ): void {
                    var controlPoint = new ControlPoint(
                        this.chart,
                        this,
                        H.merge(
                            this.options.controlPointOptions,
                            pointOptions.controlPoint
                        ),
                        i
                    );

                    this.controlPoints.push(controlPoint);

                    pointOptions.controlPoint = controlPoint.options;
                },
                this
            );
        },

        addShapes: function (this: Highcharts.AnnotationCrookedLine): void {
            var typeOptions = this.options.typeOptions,
                shape = this.initShape(
                    H.merge(typeOptions.line, {
                        type: 'path',
                        points: this.points.map(function (
                            _point: Highcharts.AnnotationPointType,
                            i: number
                        ): any {
                            return function (
                                target: Highcharts.AnnotationControllable
                            ): Highcharts.AnnotationPointType {
                                return target.annotation.points[i];
                            } as any;
                        })
                    }),
                    false as any
                );

            typeOptions.line = shape.options;
        }
    },

    /**
     * A crooked line annotation.
     *
     * @sample highcharts/annotations-advanced/crooked-line/
     *         Crooked line
     *
     * @product      highstock
     * @optionparent annotations.crookedLine
     */
    {

        /**
         * @extends   annotations.labelOptions
         * @apioption annotations.crookedLine.labelOptions
         */

        /**
         * @extends   annotations.shapeOptions
         * @apioption annotations.crookedLine.shapeOptions
         */

        /**
         * Additional options for an annotation with the type.
         */
        typeOptions: {
            /**
             * This number defines which xAxis the point is connected to.
             * It refers to either the axis id or the index of the axis
             * in the xAxis array.
             */
            xAxis: 0,
            /**
             * This number defines which yAxis the point is connected to.
             * It refers to either the axis id or the index of the axis
             * in the xAxis array.
             */
            yAxis: 0,

            /**
             * @type      {Array<*>}
             * @apioption annotations.crookedLine.typeOptions.points
             */

            /**
             * The x position of the point.
             *
             * @type      {number}
             * @apioption annotations.crookedLine.typeOptions.points.x
             */

            /**
             * The y position of the point.
             *
             * @type      {number}
             * @apioption annotations.crookedLine.typeOptions.points.y
             */

            /**
             * @type      {number}
             * @excluding positioner, events
             * @apioption annotations.crookedLine.typeOptions.points.controlPoint
             */

            /**
             * Line options.
             *
             * @excluding height, point, points, r, type, width
             */
            line: {
                fill: 'none'
            }
        },

        /**
         * @excluding positioner, events
         */
        controlPointOptions: {
            positioner: function (
                this: Highcharts.AnnotationControlPoint,
                target: Highcharts.AnnotationControllable
            ): Highcharts.PositionObject {
                var graphic = this.graphic,
                    xy = MockPoint.pointToPixels(target.points[this.index]);

                return {
                    x: xy.x - graphic.width / 2,
                    y: xy.y - graphic.height / 2
                };
            },

            events: {
                drag: function (
                    this: Highcharts.AnnotationCrookedLine,
                    e: Highcharts.AnnotationEventObject,
                    target: Highcharts.AnnotationControllable
                ): void {
                    if (
                        target.chart.isInsidePlot(
                            e.chartX - target.chart.plotLeft,
                            e.chartY - target.chart.plotTop
                        )
                    ) {
                        var translation = this.mouseMoveToTranslation(e);

                        target.translatePoint(
                            translation.x,
                            translation.y,
                            this.index
                        );

                        // Update options:
                        (target.options as any).typeOptions.points[this.index].x = target.points[this.index].x;
                        (target.options as any).typeOptions.points[this.index].y = target.points[this.index].y;

                        target.redraw(false);
                    }
                }
            }
        }
    }
);

Annotation.types.crookedLine = CrookedLine;

export default CrookedLine;
