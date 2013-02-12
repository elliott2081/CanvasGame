var tileMap0 =[ 
[103,106,106,106,106,106,106,106,106,106,106,106,106,106,106,102],
[103,5,5,5,5,5,5,5,5,5,5,5,5,5,5,102],
[103,103,5,5,5,5,5,5,5,5,5,5,5,5,102,102],
[103,103,5,5,107,107,107,107,107,107,107,107,107,107,102,102],
[103,5,5,5,5,5,5,5,5,5,52,52,52,52,52,102],
[103,5,5,5,5,5,5,5,5,5,52,5,5,5,52,102],
[103,5,5,5,5,5,5,5,5,5,52,5,5,5,52,102],
[103,5,5,5,5,5,5,5,5,5,52,52,52,52,52,102],
[103,5,5,5,5,5,5,5,5,5,5,5,5,5,5,102]];
/*
[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
[7,1,1,7,1,1,1,7,1,1,1,7,1,1,1,7],
[7,1,1,7,1,1,1,7,1,1,1,7,1,1,1,7],
[7,1,1,7,7,7,1,7,7,7,1,7,7,7,1,7],
[7,1,1,1,1,1,1,1,1,1,4,4,4,4,4,7],
[7,1,1,1,1,1,1,1,1,1,4,1,1,1,4,7],
[7,1,1,1,1,1,1,1,1,1,4,1,1,1,4,7],
[7,1,1,1,1,1,1,1,1,1,4,4,4,4,4,7],
[7,7,7,7,1,1,1,1,1,1,7,7,7,7,7,7]];
*/

var tileMap1=[
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1],
[1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,2,2,2,1,4,4,4,1,1],
[1,1,1,1,1,1,1,1,1,1,1,4,1,4,1,1],
[1,1,1,1,1,1,1,1,1,1,1,4,4,4,1,1]];
var tileMap2=[
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,7,2,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,7,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
var tileMap3=[
[1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];


var tileMap4=[
[105,106,4,4,4,4,4,4,4,4,4,4,4,4,4,112],
[105,4,4,4,4,4,4,4,4,4,4,4,4,4,4,112],
[105,4,4,4,4,4,4,4,4,4,4,4,4,4,4,112],
[108,109,4,4,4,4,4,4,4,4,4,4,4,4,4,112],
[110,111,4,4,4,4,4,108,109,4,4,54,54,54,54,112],
[105,4,4,4,4,4,4,110,111,4,4,54,4,4,54,112],
[105,4,4,4,4,4,4,4,4,4,4,54,4,4,54,112],
[105,4,4,4,4,4,4,4,4,4,4,54,54,54,54,112],
[105,4,4,4,4,4,4,4,4,4,4,4,4,4,4,112]];
var tileMap5=[
[4,105,106,106,106,106,108,109,108,109,4,4,108,109,108,109],
[106,54,54,54,4,4,110,111,110,111,108,109,110,111,110,111],
[108,109,4,54,4,4,4,4,4,4,110,111,108,109,54,4],
[110,111,54,54,4,4,4,4,4,4,105,4,110,111,54,4],
[4,108,109,4,106,4,4,4,4,4,108,109,54,54,54,4],
[4,110,111,4,4,4,4,105,4,4,110,111,4,4,4,4],
[108,109,4,4,4,4,4,105,4,4,4,4,4,4,4,4],
[110,111,4,4,4,4,4,108,109,4,4,4,4,4,4,4],
[106,4,4,4,4,4,4,110,111,4,4,4,4,4,4,106]];
var tileMap6=[
[108,109,108,109,4,108,109,4,4,108,109,105,105,105,105,4],
[110,111,110,111,105,110,111,108,109,110,111,54,54,54,54,105],
[4,105,4,4,4,4,4,110,111,105,4,54,4,4,54,105],
[4,4,4,4,4,4,4,4,105,4,4,54,54,54,54,105],
[4,4,4,4,108,109,4,4,4,4,4,4,4,4,105,105],
[4,4,4,4,110,111,4,4,4,4,4,4,4,4,105,4],
[4,4,4,4,4,4,4,4,4,4,4,4,4,4,105,105],
[4,108,109,4,4,4,108,109,106,108,109,4,4,4,4,105],
[106,110,111,108,109,106,110,111,4,110,111,4,4,4,4,105]];
var tileMap7=[
[1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1],
[1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

var tileMap8=[
[105,106,4,4,4,4,4,4,4,4,4,4,4,4,4,112],
[105,4,4,4,4,4,4,4,4,4,4,4,4,106,4,112],
[105,4,4,4,4,4,4,4,4,4,106,4,4,4,4,112],
[108,109,4,4,4,4,4,4,4,4,4,4,4,4,4,112],
[110,111,4,4,4,4,4,4,4,4,4,4,4,4,4,112],
[108,109,54,54,54,4,4,4,4,4,4,4,4,4,4,112],
[110,111,54,4,54,4,4,4,4,4,4,4,108,109,4,112],
[105,4,54,54,54,4,4,4,4,4,4,105,110,111,4,112],
[105,4,4,4,4,4,4,4,4,4,4,4,4,4,4,112]];
var tileMap9=[
[113,4,4,4,4,4,4,108,109,4,4,4,4,4,4,105],
[113,4,4,4,4,4,4,110,111,4,4,4,4,4,4,105],
[113,4,4,4,4,4,4,4,54,54,54,4,4,4,4,105],
[113,4,4,4,4,106,4,4,54,4,54,4,4,4,4,106],
[113,4,4,4,4,4,4,4,54,54,54,4,4,106,106,106],
[113,4,106,4,4,4,4,4,4,4,4,108,109,4,4,106],
[113,4,4,4,4,4,4,4,4,4,4,110,111,4,4,106],
[113,4,4,4,108,109,4,4,4,4,4,4,4,4,106,106],
[113,4,4,4,110,111,4,4,4,4,4,4,4,4,4,105]];
var tileMap10=[
[105,106,106,110,111,108,109,108,109,108,109,4,4,4,4,106],
[106,4,4,4,4,110,111,110,111,110,111,4,4,4,4,106],
[105,4,4,4,4,4,4,4,4,4,4,4,4,4,4,108],
[105,4,4,4,4,4,4,4,4,4,4,4,4,108,109,110],
[106,4,4,4,4,4,108,109,4,4,4,4,4,110,111,105],
[106,106,54,54,54,4,110,111,4,4,4,4,4,4,4,108],
[106,4,54,4,54,4,4,4,4,4,4,4,4,4,4,110],
[105,4,54,54,54,4,4,4,4,4,4,108,109,4,4,106],
[106,4,4,4,4,4,105,105,108,109,106,110,111,106,108,109]];
var tileMap11=[
[1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1],
[1,1,1,2,1,1,2,1,2,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1],
[1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1],
[1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1]];
var tileMap12=[
[105,4,4,4,4,4,4,4,4,4,4,4,4,4,4,112],
[108,109,4,4,4,4,4,4,4,4,4,4,4,4,4,112],
[110,111,4,4,4,4,4,4,4,4,4,4,4,4,4,112],
[108,109,4,4,4,4,4,4,4,4,4,4,4,4,4,112],
[110,111,4,4,4,4,4,106,4,4,4,4,4,4,4,4],
[108,109,4,4,4,4,4,4,4,4,4,106,54,54,54,4],
[110,111,4,4,4,106,4,4,4,4,4,4,54,4,54,105],
[108,109,4,4,4,4,4,4,4,4,4,4,54,54,108,109],
[110,111,105,105,105,105,105,105,105,105,105,105,105,105,110,111]];

var tileMap13=[
[113,4,4,4,108,109,4,4,4,4,4,4,4,4,4,105],
[113,105,105,105,110,111,108,109,4,4,4,4,4,4,54,105],
[113,4,4,4,4,4,110,111,4,4,4,4,4,4,54,105],
[113,4,54,54,54,54,54,4,106,4,4,4,4,54,54,105],
[4,4,54,4,105,4,54,4,4,4,4,4,4,4,105,105],
[4,4,54,54,54,54,4,4,4,4,4,4,4,105,105,106],
[106,4,4,4,4,4,4,4,4,4,4,4,105,54,105,106],
[108,109,4,108,109,4,108,109,4,108,109,108,109,4,105,106],
[110,111,105,110,111,105,110,111,105,110,111,110,111,106,106,105]];
var tileMap14=[
[106,4,4,4,4,4,4,4,4,4,4,4,4,4,4,106],
[108,109,4,4,4,4,4,4,4,4,4,4,4,4,106,106],
[110,111,4,4,4,4,4,4,4,4,4,4,4,106,105,105],
[106,4,4,4,4,4,4,4,4,4,4,4,4,106,106,105],
[105,4,4,4,4,4,4,4,4,4,4,4,4,4,106,106],
[106,4,4,4,4,4,106,4,4,4,26,26,26,26,106,106],
[106,4,4,105,4,4,4,4,4,4,26,26,26,106,106,106],
[108,109,4,4,4,4,4,4,4,4,26,26,106,106,106,106],
[110,111,108,109,106,106,106,106,108,109,26,106,106,106,106,106]];

var tileMap15=[
[1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,2,1,2,1,1],
[1,1,1,2,1,1,2,1,2,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,2,1,2,1],
[1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1],
[1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1],
[1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1],
[1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1]];
var tileMap16=[
[4,4,1,4,4,4,4,4,4,4,4,4,4,4,4,4],
[4,4,4,4,4,4,4,4,4,4,4,2,4,2,4,4],
[4,4,4,2,4,4,2,4,2,4,4,4,4,4,4,4],
[4,4,4,4,4,4,4,4,4,4,4,4,2,4,2,4],
[4,4,4,4,4,4,4,4,4,2,4,4,4,4,4,4],
[4,4,4,2,4,4,2,4,4,4,4,4,2,4,4,4],
[4,4,4,4,4,4,4,2,4,4,4,4,4,4,4,4],
[4,4,4,4,2,4,4,4,4,4,2,4,4,4,4,4],
[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]];

