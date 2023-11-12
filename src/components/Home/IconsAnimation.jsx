/**
 * @author Ebrain Cedeño.
 */

import * as d3 from 'd3';

export default class IconsAnimation {
  constructor() {
    this.animateSVGCanvasMobil = null;
    this.animateSVGCanvas = null;
    this.homeIconsAnimations = [];
    this.animationTime = 300000;
    this.firstTime = true;
    this.timeForNextAnimation = 90000;
    this.currentTime = 0;
    this.homeIconsAnimations = [
      {
        iconId: 'svg-key-1',
        pathId: 'key-path',
        pathMobilId: 'key-path-mobil'
      },
      {
        iconId: 'svg-envelope-1',
        pathId: 'envelope-path',
        pathMobilId: 'envelope-path-mobil'
      },
      {
        iconId: 'svg-program-1',
        pathId: 'program-path',
        pathMobilId: 'program-path-mobil'
      },
      {
        iconId: 'svg-information-1',
        pathId: 'information-path',
        pathMobilId: 'information-path-mobil'
      },
      {
        iconId: 'svg-companies-1',
        pathId: 'companies-path',
        pathMobilId: 'companies-path-mobil'
      },
      {
        iconId: 'svg-share-1',
        pathId: 'share-path',
        pathMobilId: 'share-path-mobil'
      }
    ];
  }

  /**
   *
   * @param {*} ic
   * @param {*} pathId
   * @param {*} iconId
   */
  transition(ic, pathId, iconId) {
    var that = this;

    ic.transition()
      .delay(this.firstTime ? 0 : this.timeForNextAnimation)
      .duration(this.animationTime)
      .ease(d3.easeLinear)
      .styleTween(
        'transform',
        this.translateAlong(document.getElementById(pathId), iconId)
      )
      .on('start', function () {
        this.currentTime = 0;
        d3.select(this).classed('dynamic-icon', true);
      })
      .on('end', function () {
        //reset default values
        that.firstTime = false;
        d3.select(this)
          .classed('dynamic-icon', false)
          .style('transform', 'translate(0px,0px)');
        that.transition(ic, pathId, iconId);
      });
  }

  /**
   *
   * @param {*} path
   * @param {*} iconId
   * @returns
   */
  translateAlong(path, iconId) {
    if (path) {
      var l = path.getTotalLength();
      var that = this;
      return function () {
        return function (t) {
          var p = path.getPointAtLength(t * l);
          //transform from svg coordinate system to screen coordinate system
          var svg =
            window.innerWidth > 576
              ? document.getElementById('animateSVGCanvas')
              : document.getElementById('animateSVGCanvasMobil');

          if (svg) {
            var screenP = p.matrixTransform(svg.getScreenCTM());
            this.currentTime += 1;
            if (iconId == 'svg-key-1') {
              if (window.innerWidth > 576) {
                screenP.x -= that.getIconCoordinates(iconId).width / 2 - 22;
              } else {
                screenP.x -= that.getIconCoordinates(iconId).width / 2;
              }
            } else {
              screenP.x -= that.getIconCoordinates(iconId).width / 2;
            }

            screenP.y -= that.getIconCoordinates(iconId).height / 2;
            var trans = 'translate(' + screenP.x + 'px,' + screenP.y + 'px)';
            return trans; //Move the icon
          }
        };
      };
    } else {
      this.stopAnimation();
    }
  }

  /**
   *
   * @param {*} elementId
   * @returns
   */
  getIconCoordinates(elementId) {
    return document.getElementById(elementId).getBoundingClientRect();
  }

  /**
   *
   */
  Animate() {
    this.homeIconsAnimations.forEach(iconAnimation => {
      var container = d3.select('#' + iconAnimation.iconId);
      var path =
        window.innerWidth > 576 ? iconAnimation.pathId : iconAnimation.pathMobilId;
      this.transition(container, path, iconAnimation.iconId);
    });
  }

  /**
   *
   */
  stopAnimation() {
    this.homeIconsAnimations.forEach(iconAnimation => {
      d3.select('#' + iconAnimation.iconId).interrupt();
    });
  }
}
