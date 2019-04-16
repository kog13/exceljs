'use strict';

const PromishLib = require('../../../utils/promish');
const utils = require('../../../utils/utils');
const BaseXForm = require('../base-xform');
const CommentXForm = require('./comment-xform');

const CommentListXForm = module.exports = function(initialise) {
  this.map = {};
	this.xform = new CommentXForm()
};

utils.inherits(CommentListXForm, BaseXForm, {
  render: function(xmlStream, model) {
    xmlStream.openNode('commentList');

		model.comments.forEach(comment => {
			this.xform.render(xmlStream, comment)
		})

    xmlStream.closeNode();
  }
});
