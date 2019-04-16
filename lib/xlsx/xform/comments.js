'use strict';

const utils = require('../../utils/utils');
const BaseXform = require('./base-xform');
const RichTextXForm = require('./strings/rich-text-xform')

const richTextXform = new RichTextXForm();

// <t xml:space="preserve"> is </t>

const CommentXForm = module.exports = function() {};

utils.inherits(CommentXForm, BaseXform, {
	/**
	 * Enclosing tag.
	 */
  get tag() { return 'comment'; },

	/**
	 * Write a comment to an xml stream.
	 */
  render: function(xmlStream, model) {
    xmlStream.openNode(this.tag, {
			ref: model.ref,
			shapeId: 0,
		});

    xmlStream.writeText(model.text);

    xmlStream.closeNode();
  },

	/*
  parseOpen: function(node) {
    switch (node.name) {
      case 't':
        this._text = [];
        return true;
      default:
        return false;
    }
  },
  parseText: function(text) {
    this._text.push(text);
  },
  parseClose: function() {
    return false;
  }
	*/
});
