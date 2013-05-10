/**
 * CellsByRow example
 */

( function( window ) {

'use strict';

var Outlayer = window.Outlayer;

var CellsByRow = window.CellsByRow = Outlayer.create('cellsByRow');

var defaultOptions = Outlayer.prototype.options;

defaultOptions.columnWidth = 100;
defaultOptions.rowHeight = 100;
defaultOptions.isOriginLeft = true;
defaultOptions.isOriginTop = true;

CellsByRow.prototype._resetLayout = function() {
  this.getSize();

  this._getMeasurement( 'columnWidth', 'outerWidth' );
  this._getMeasurement( 'rowHeight', 'outerHeight' );

  this.isOriginLeft = this.options.isOriginLeft;
  this.isOriginTop = this.options.isOriginTop;

  this.cols = Math.floor( this.size.innerWidth / this.columnWidth );
  this.cols = Math.max( this.cols, 1 );

  this.itemIndex = 0;
};

CellsByRow.prototype._getItemLayoutPosition = function( item ) {
  item.getSize();
  var column = this.itemIndex % this.cols;
  var row = Math.floor( this.itemIndex / this.cols );
  var x = column * this.columnWidth;
  var y = row * this.rowHeight;
  this.itemIndex++;
  return {
    x: x,
    y: y
  };
};

CellsByRow.prototype._postLayout = function() {
  // set container size
  var elemH = Math.ceil( this.itemIndex / this.cols ) * this.rowHeight;
  // add padding and border width if border box
  var elemSize = this.size;
  if ( elemSize.isBorderBox ) {
    elemH += elemSize.paddingBottom + elemSize.paddingTop +
      elemSize.borderTopWidth + elemSize.borderBottomWidth;
  }
  this.element.style.height = elemH + 'px';
};

})( window );
