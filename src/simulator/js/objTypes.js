/**
 * The types of objects (optical elements, decorations, etc) that can be added to the scene.
 * @namespace rayOptics.objTypes
 */
export const SingleRay = require('./objs/lightSource/SingleRay.js').SingleRay;
export const Beam = require('./objs/lightSource/Beam.js').Beam;
export const PointSource = require('./objs/lightSource/PointSource.js').PointSource;
export const AngleSource = require('./objs/lightSource/AngleSource.js').AngleSource;
export const Mirror = require('./objs/mirror/Mirror.js').Mirror;
export const ArcMirror = require('./objs/mirror/ArcMirror.js').ArcMirror;
export const ParabolicMirror = require('./objs/mirror/ParabolicMirror.js').ParabolicMirror;
export const CustomMirror = require('./objs/mirror/CustomMirror.js').CustomMirror;
export const IdealMirror = require('./objs/mirror/IdealMirror.js').IdealMirror;
export const BeamSplitter = require('./objs/mirror/BeamSplitter.js').BeamSplitter;
export const PlaneGlass = require('./objs/glass/PlaneGlass.js').PlaneGlass;
export const CircleGlass = require('./objs/glass/CircleGlass.js').CircleGlass;
export const Glass = require('./objs/glass/Glass.js').Glass;
export const CustomGlass = require('./objs/glass/CustomGlass.js').CustomGlass;
export const IdealLens = require('./objs/glass/IdealLens.js').IdealLens;
export const SphericalLens = require('./objs/glass/SphericalLens.js').SphericalLens;
export const CircleGrinGlass = require('./objs/glass/CircleGrinGlass.js').CircleGrinGlass;
export const GrinGlass = require('./objs/glass/GrinGlass.js').GrinGlass;
export const Blocker = require('./objs/blocker/Blocker.js').Blocker;
export const CircleBlocker = require('./objs/blocker/CircleBlocker.js').CircleBlocker;
export const Aperture = require('./objs/blocker/Aperture.js').Aperture;
export const DiffractionGrating = require('./objs/blocker/DiffractionGrating.js').DiffractionGrating;
export const Ruler = require('./objs/other/Ruler.js').Ruler;
export const Protractor = require('./objs/other/Protractor.js').Protractor;
export const Detector = require('./objs/other/Detector.js').Detector;
export const TextLabel = require('./objs/other/TextLabel.js').TextLabel;
export const LineArrow = require('./objs/other/LineArrow.js').LineArrow;
export const Drawing = require('./objs/other/Drawing.js').Drawing;
export const Handle = require('./objs/special/Handle.js').Handle;
export const CropBox = require('./objs/special/CropBox.js').CropBox;
export const ModuleObj = require('./objs/special/ModuleObj.js').ModuleObj;