'use strict';

var TextXform = require('./text-xform');
var FontXform = require('../style/font-xform');

var utils = require('../../../utils/utils');
var BaseXform = require('../base-xform');

// <comment ref="A1", authorId="0", shapeId="0">
//   <text>
//   <text>
// </comment>

var RichTextXform = module.exports = function(model) {
  this.model = model;
};

RichTextXform.FONT_OPTIONS = {
  tagName: 'rPr',
  fontNameTag: 'rFont'
};

utils.inherits(RichTextXform, BaseXform, {
  get tag() { return 'comment'; },

  render: function(xmlStream, model) {
    model = model || this.model;

    xmlStream.openNode(this.tag);
    xmlStream.openNode('text');
    xmlStream.closeNode();
    xmlStream.closeNode();
  },
});
