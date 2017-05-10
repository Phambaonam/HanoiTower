/**
 * Created by doremonsun on 5/10/17.
 */
let Disk = require('./disk')
/***
 *  return name and list disks of this tower
 */
class Tower {
    constructor(nameTowers,nameDisks) {
        this.name = nameTowers
        this.disk =  new Disk(nameDisks).disk()
    }

    /***
     *
     * @returns {{name: *, disks: *}}
     */
    tower() {
        return {name: this.name, disks: this.disk}
    }
}
module.exports = Tower