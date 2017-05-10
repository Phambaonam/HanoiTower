// // class Disk{
// //     constructor(index,diameter){
// //         this._index = index;
// //         this._diameter = diameter;
// //     }
// // }
// //
// // class Tower{
// //     constructor(name,disks){
// //         this._name = name;
// //         this._disks = disks;
// //     }
// // }
//
// class GameEngine{
//     constructor(){
//         this.count = 0;
//         this.str ='';
//         // this.move();
//     }
//     move(n) {
//         if (n === 1 || n === 0)
//             return 1
//         return n + this.move(n - 1)
//     }
//
//
// }
//
// let result = new GameEngine()
// console.log(result.move(3));
//
// // let datasetOfDisks = [
// //     new Disk('0',20),
// //     new Disk('1',15),
// //     new Disk('2',10)
// //     // new Disk('3',5)
// // ];
// //
// // let datasetOfTower = [
// //     new Tower('TowerA'),
// //     new Tower('TowerB'),
// //     new Tower('TowerC')
// // ];
//
//
// // let game = new GameEngine();
//
// /*
// function move(n, a, b, c) {
//     if (n > 0) {
//         move(n-1, a, c, b);
//         console.log("Move disk " + n +  " from " + a + " to " + c);
//         move(n-1, b, a, c);
//         // count++
//     }
// }
// // console.log(game.count)
// move(datasetOfDisks.length,datasetOfTower[0]._name, datasetOfTower[1]._name, datasetOfTower[2]._name);
// */
//
