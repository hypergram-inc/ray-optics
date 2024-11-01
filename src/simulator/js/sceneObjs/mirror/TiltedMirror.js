import BaseFilter from '../BaseFilter.js';
import LineObjMixin from '../LineObjMixin.js';
import { getMsg } from '../../translations.js';
import Simulator from '../../Simulator.js';
import geometry from '../../geometry.js';

/**
 * TiltedMirror with shape of a line segment.
 * 
 * Tools -> TiltedMirror -> Segment
 * @class
 * @extends BaseFilter
 * @memberof sceneObjs
 * @property {Point} p1 - The first endpoint.
 * @property {Point} p2 - The second endpoint.
 * @property {number} tiltAngle - tilt angle.
 * @property {boolean} filter - Whether it is a dichroic mirror.
 * @property {boolean} invert - If true, the ray with wavelength outside the bandwidth is reflected. If false, the ray with wavelength inside the bandwidth is reflected.
 * @property {number} wavelength - The target wavelength if dichroic is enabled. The unit is nm.
 * @property {number} bandwidth - The bandwidth if dichroic is enabled. The unit is nm.
 */
class TiltedMirror extends LineObjMixin(BaseFilter) {
  static type = 'TiltedMirror';
  static isOptical = true;
  static serializableDefaults = {
    p1: null,
    p2: null,
    tiltAngle: 0.0,
    filter: false,
    invert: false,
    wavelength: Simulator.GREEN_WAVELENGTH,
    bandwidth: 10
  };

  populateObjBar(objBar) {
    objBar.createNumber(getMsg('tiltAngle'), -90, 90, 1, this.tiltAngle, function (obj, value) {
      obj.tiltAngle = value;
    });

    super.populateObjBar(objBar);
  }

  draw(canvasRenderer, isAboveLight, isHovered) {
    const ctx = canvasRenderer.ctx;
    const ls = canvasRenderer.lengthScale;

    if (this.p1.x == this.p2.x && this.p1.y == this.p2.y) {
      ctx.fillStyle = 'rgb(128,128,128)';
      ctx.fillRect(this.p1.x - 1.5 * ls, this.p1.y - 1.5 * ls, 3 * ls, 3 * ls);
      return;
    }

    ctx.strokeStyle = isHovered ? 'cyan' : ((this.scene.simulateColors && this.wavelength && this.filter) ? Simulator.wavelengthToColor(this.wavelength || Simulator.GREEN_WAVELENGTH, 1) : 'rgb(168,168,168)');
    ctx.lineWidth = 1 * ls;
    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
  }

  checkRayIntersects(ray) {
    if (this.checkRayIntersectFilter(ray)) {
      return this.checkRayIntersectsShape(ray);
    } else {
      return null;
    }
  }

  onRayIncident(ray, rayIndex, incidentPoint) {
    var rx = ray.p1.x - incidentPoint.x;
    var ry = ray.p1.y - incidentPoint.y;
    var mx = this.p2.x - this.p1.x;
    var my = this.p2.y - this.p1.y;

    // 거울 방향 벡터를 정규화
    var length = Math.sqrt(mx * mx + my * my);
    mx = mx / length;
    my = my / length;
    
    // tilt 각도만큼 회전된 거울 방향 벡터 계산
    var tiltAngle = this.tiltAngle / 180.0 * Math.PI;
    var rotatedMx = mx * Math.cos(tiltAngle) - my * Math.sin(tiltAngle);
    var rotatedMy = mx * Math.sin(tiltAngle) + my * Math.cos(tiltAngle);
    
    // 반사 계산
    ray.p1 = incidentPoint;
    ray.p2 = geometry.point(
        incidentPoint.x + rx * (rotatedMy * rotatedMy - rotatedMx * rotatedMx) 
                       - 2 * ry * rotatedMx * rotatedMy,
        incidentPoint.y + ry * (rotatedMx * rotatedMx - rotatedMy * rotatedMy) 
                       - 2 * rx * rotatedMx * rotatedMy
    );
  }
};

export default TiltedMirror;