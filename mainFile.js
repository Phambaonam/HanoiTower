/* class Disk*/
class Disk {
    constructor(nameDisks) {
        this.nameDisks = nameDisks
    }

    disk() {
        return this.nameDisks
    }
}

/* class Tower*/
class Tower {
    constructor(nameTowers, arrDisk) {
        this.name = nameTowers
        this.arrDisk = arrDisk
    }

    tower() {
        return {
            name: this.name,
            arrDisk: this.arrDisk
        }
    }
}

/* class GameEngine*/
class GameEngine {
    constructor() {
        this.data = []
        this.count = 0
    }

    move(totalDisks, towerA, towerB, towerC) {
        if (totalDisks > 0) {
            this.move(totalDisks - 1, towerA, towerC, towerB)
            // console.log("Move " + nameDisks[totalDisks - 1] + " from " + towerA + " to " + towerC)
            console.log(`Move disk ${totalDisks} from ${towerA.name} to ${towerC.name}`)
            this.data.push([nameDisks[totalDisks - 1], towerA, towerC])
            this.move(totalDisks - 1, towerB, towerA, towerC)
            this.count++
        }
        return this.data
    }
}
let arrDisks = []

let nameDisks = arrDisks

let arrTowers = [
    new Tower('towerA', nameDisks).tower(),
    new Tower('towerB', []).tower(),
    new Tower('towerC', []).tower()
]

let result = new GameEngine()

/* declare input parameter stored value fixed*/
let Piles = 3
let margin = 120
let cySvg = 100
let size = 20
let widthPiles = 10
let heightPiles = 40
let heightDisks = 40
let widthThicks = ($('.disks').width() - 4 * margin) / 3 //250
let heightThicks = 20
let distancePiles = widthThicks + margin
const svg = d3.select('.disks')
    .append('svg')
    .attr('width', $('.disks').width() - margin)
    .attr('height', $('.disks').height())


/*Tao cot */
createPiles = (Piles, myDisks) => {
    for (let i = 1; i <= Piles; i++) {
        let cx = (margin + widthThicks) * (i - 1) + margin + widthThicks / 2 - widthPiles / 2
        svg.append('rect') // create thick
            .attr('x', i * margin + (i - 1) * widthThicks)
            .attr('y', heightPiles * (myDisks + 1) + cySvg)
            .attr('width', widthThicks)
            .attr('height', heightThicks)
            .style('fill', '#333030')
        svg.append('rect') // create pile
            .attr("x", cx)
            .attr("y", cySvg)
            .attr('width', widthPiles)
            .attr('height', heightPiles * (myDisks + 1))
            .style("fill", '#333030')
    }
}

/* Tao dia */
buildFloors = (Disks) => {
    let count = Disks
    for (let i = 1; i <= Disks; i++) {
        svg.append("rect")
            .attr("x", margin + i * size) // Toa do x cua floor
            .attr("y", (Disks - i) * heightDisks + heightDisks + cySvg) // Toa do y cua floor
            .attr("width", widthThicks - 2 * i * size) // Chieu rong cua floor
            .attr("height", heightDisks)
            .classed("disk" + i + " color", true); // Chieu cao cua floor

        arrDisks.push(new Disk('disk' + count))
        arrDisks[i - 1].x_ = 0
        arrDisks[i - 1].y_ = i * heightDisks
        arrDisks[i - 1].height = i * heightDisks + heightDisks * 2
        count--
    }
    d3.selectAll(".color").style("fill", function () {
        return "hsl(" + Math.random() * 360 + ",100%,60%)";
    });
}

/*change distance when disks moved */
let get_distance = (disk1, disk2) => {
    if ((disk1 === "towerA" && disk2 === "towerB") || (disk1 === "towerB" && disk2 === "towerC")) {
        return distancePiles;
    } else if ((disk1 === "towerB" && disk2 === "towerA") || (disk1 === "towerC" && disk2 === "towerB"))
        return -distancePiles;
    else if ((disk1 === "towerA" && disk2 === "towerC")) {
        return distancePiles * 2;
    } else return -distancePiles * 2;
}

/* move disk to other tower*/
let updateDisk = (nameDisk, fromTower, toTower) => {
    fromTower.arrDisk.shift();
    toTower.arrDisk.unshift(nameDisk);
}

/* draw new disk*/
draw = (data, totalDisks) => {
    for (let i = 0; i < data.length; i++) {
        let x = get_distance(data[i][1].name, data[i][2].name)
        let begin_y = data[i][0].y_
        let begin_x = data[i][0].x_
        let count_disk = data[i][2].arrDisk.length
        let new_y = totalDisks * heightDisks - (count_disk * heightDisks) - begin_y
        let new_x = begin_x + x
        let height = -data[i][0].height
        updateDisk(data[i][0], data[i][1], data[i][2])
        d3.selectAll('.' + data[i][0].nameDisks)
            .transition()
            .delay(i * 3000)
            .duration(1000)
            .attr("transform", 'translate(' + begin_x + ',' + height + ')')
            .transition()
            .attr("transform", 'translate(' + new_x + ',' + height + ')')
            .transition()
            .attr('transform', 'translate(' + new_x + ',' + new_y + ')')

        data[i][0].x_ += x
    }
}


/* Run application*/
create = () => {
    let myDisks = Number($("#myDisks").val())
    if (Number(myDisks)) {
        createPiles(Piles, myDisks)
        buildFloors(myDisks)
    } else {
        alert('Input invalid !')
    }
};

run = () => {
    let data = result.move(nameDisks.length, arrTowers[0], arrTowers[1], arrTowers[2])
    const totalDisks = arrDisks.length
    draw(data, totalDisks)
    console.log('nameDisks', nameDisks);
    console.log('Total step: ', result.count);
}
