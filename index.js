/**
 * Created by doremonsun on 5/9/17.
 */
function move(n, a, b, c) {
    if (n > 0) {
        move(n-1, a, c, b);
        console.log("Move disk from " + a + " to " + c);
        move(n-1, b, a, c);
    }
}
move(3  , "A", "B", "C");