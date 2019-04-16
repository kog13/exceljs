'use strict';

const CommentsXForm = require('../../xlsx/xform/comment/comments-xform');

const CommentsWriter = module.exports = function(options) {
  // The owning worksheet id.
  this.id = options.id;

  this._workbook = options.workbook;
	this._comments = [];
	this._authors = [];
	this._xform = new CommentsXForm();

  // Commited flag.
  this.committed = false;
};

/**
 * Convert a worksheet id into its corresponding comments path.
 *
 * @param number A worksheet id.
 * @return Comments path.
 */
function worksheetIdToCommentsPath(id) {
	return `/x1/comments/${id}.xml`
}

/**
 * Writes excel comments that belong to a worksheet.
 */
CommentsWriter.prototype = {
	/**
	 * Returns comments.
	 *
	 * @return Array of comments.
	 */
  get comments() {
    return this._comments;
  },

	/**
	 * The workbook the comments belong to.
	 *
	 * @return The owning workbook.
	 */
  get workbook() {
    return this._workbook;
  },

	/**
	 * Add a comment.
	 *
	 * @param string ref Cell ref the comment belongs to.
	 * @param string text The comment.
	 * @param string author The comment's author.
	 */
	addComment: function (ref, text, author) {
		this._comments.push({
			ref,
			text,
		})
	},

	/**
	 * Stream for writing to worksheet's comment file.
	 *
	 * @return Comment stream buffer.
	 */
  get stream() {
    if (!this._stream) {
      // eslint-disable-next-line no-underscore-dangle
      this._stream = this._workbook._openStream(worksheetIdToCommentsPath(this.id));

      // pause stream to prevent 'data' events
      this._stream.pause();
    }

    return this._stream;
  },

	/**
	 * Write comments to the underlying stream.
	 */
  commit: function () {
		// Do nothing is already commited.
    if (this.committed) {
      return;
    }

    // Commit the comments.
		this._writeComments(this._comments)

    // We cannot accept anymore comments from now on.
    this._comments = null;

    // Signal the end of the stream and mark the comments as commited.
    this.stream.end();
    this.committed = true;
  },

	/**
	 * Not a valid operation for a streaming writer. It's a bad idea.
	 */
  destroy: function () {
    throw new Error('Invalid Operation: destroy');
  },

	/**
	 * Write worksheet comments.
	 *
	 * @param comments The comments to write.
	 */
  _writeComments: function (comments) {
		this.stream.write(this._xform.toXml(comments))
  },
};
