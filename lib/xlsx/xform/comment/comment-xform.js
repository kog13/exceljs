'use strict';

const utils = require('../../../utils/utils');
const BaseXform = require('../base-xform');
const RichTextXForm = require('../strings/rich-text-xform')

// <t xml:space="preserve"> is </t>

const CommentXForm = module.exports = function() {
	this.textXForm = new RichTextXForm()
}

utils.inherits(CommentXForm, BaseXform, {
	/**
	 * Enclosing tag.
	 */
  get tag() { return 'comment'; },

	/**
	 * Write comment to XML stream.
	 */
  render: function(xmlStream, model) {
    xmlStream.openNode(this.tag, {
			ref: model.ref,
			shapeId: 0,
		});

    this.textXForm.render(xmlStream, model);

    xmlStream.closeNode();
  }
});
