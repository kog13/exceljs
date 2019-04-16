'use strict';

var _ = require('../../utils/under-dash');

var RelType = require('../../xlsx/rel-type');

var StringBuf = require('../../utils/string-buf');

var Row = require('../../doc/row');
var Column = require('../../doc/column');

var xmlBuffer = new StringBuf();

// ============================================================================================
// Xforms
var CommentXForm = require('../../xlsx/xform/comment');

// since prepare and render is functional, we can use singletons
var xform = {
  comment: new CommentXForm(),
};

// ============================================================================================

var CommentsWriter = module.exports = function(options) {
  // in a workbook, each sheet will have a number
  this.id = options.id;

	this._comments = []

  // committed flag
  this.committed = false;

  this.startedData = false;
};

WorksheetWriter.prototype = {
  get workbook() {
    return this._workbook;
  },

  get stream() {
    if (!this._stream) {
      // eslint-disable-next-line no-underscore-dangle
      this._stream = this._workbook._openStream('/xl/comments' + this.id + '.xml');

      // pause stream to prevent 'data' events
      this._stream.pause();
    }
    return this._stream;
  },

  // destroy - not a valid operation for a streaming writer
  // even though some streamers might be able to, it's a bad idea.
  destroy: function() {
    throw new Error('Invalid Operation: destroy');
  },

  commit: function() {
    if (this.committed) {
      return;
    }

    // commit all comments
    this._comments.forEach(comment => {
      if (comment) {
        // write the comment to the stream
        this._writeComment(comment);
      }
    });

    // we _cannot_ accept new comments from now on
    this._comments = null;

    if (!this.startedData) {
        this._writeOpenSheetData();
    }

    // signal end of stream to comments
    this.stream.end();

    this.committed = true;
  },

  // =========================================================================
  // Columns

  // get the current comments array.
  get comments() {
    return this._comments;
  },

  // ================================================================================
  _write: function(text) {
    xmlBuffer.reset();
    xmlBuffer.addText(text);
    this.stream.write(xmlBuffer);
  },

  _writeComment: function(comment) {
    if (!this.startedData) {
      this.startedData = true;
    }

		this.stream.write(xform.comment.toXml(comment))
  },
};
