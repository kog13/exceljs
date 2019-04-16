'use strict';

const PromishLib = require('../../../utils/promish');

const utils = require('../../../utils/utils');
const XmlStream = require('../../../utils/xml-stream');

const BaseXform = require('../base-xform');
const CommentXForm = require('./comment-xform');
const commentXForm = new CommentXForm()

const StylesXform = module.exports = function(initialise) {
  this.map = {};
};

utils.inherits(StylesXform, BaseXform, {
  COMMENTS_ATTRIBUTES: {
    xmlns: 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
  }
}, {
  render: function(xmlStream, model) {
    xmlStream.openXml(XmlStream.StdDocAttributes);
    xmlStream.openNode('comments', StylesXform.COMMENTS_ATTRIBUTES);
    xmlStream.openNode('commentList');

		model.forEach(comment => {
			commentXForm.render(xmlStream, comment)
		})

    xmlStream.closeNode();
    xmlStream.closeNode();
  }
});
