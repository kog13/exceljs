'use strict';

const PromishLib = require('../../../utils/promish');

const utils = require('../../../utils/utils');
const XmlStream = require('../../../utils/xml-stream');

const BaseXform = require('../base-xform');
const CommentListXForm = require('./comment-list-xform');

const CommentsXForm = module.exports = function(initialise) {
	this.commentListXForm = new CommentListXForm()
};

utils.inherits(CommentsXForm, BaseXform, {
  COMMENTS_ATTRIBUTES: {
    xmlns: 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
  }
}, {
	/**
	 * Enclosing tag.
	 */
  get tag() { return 'comments'; },

	/**
	 * Write comments to XML stream.
	 */
  render: function(xmlStream, model) {
    xmlStream.openXml(XmlStream.StdDocAttributes);
    xmlStream.openNode(this.tag, CommentsXForm.COMMENTS_ATTRIBUTES);

		this.commentListXForm.render(xmlStream, model)

    xmlStream.closeNode();
  }
});
