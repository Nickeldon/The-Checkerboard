const canvas = document.querySelector('canvas')
var looptime = 10
const ctx = canvas.getContext('2d')

ctx.fillStyle = 'rgb(42, 42, 42)'
ctx.fillRect(0, 0, canvas.width, canvas.height)

/*var map = [
    ['C1', 'C1', 'C3', 'C1', 'C1', 'C1', 'C3', 'C2', 'C2', 'C2', 'C1', 'C1', 'C1'],
    ['C1', 'C2', 'C2', 'C2', 'C2', 'C2', 'C1', 'C2', 'C2', 'C2', 'C2', 'C2', 'C1'],
    ['C1', 'C2', 'C2', 'C2', 'C2', 'C2', 'C3', 'C2', 'C2', 'C2', 'C2', 'C2', 'C3'],
    ['C1', 'C2', 'C2', 'C2', 'C2', 'C2', 'C1', 'C3', 'C1', 'C1', 'C1', 'C2', 'C1'],
    ['C1', 'C2', 'C1', 'C1', 'C3', 'C1', 'C1', 'C1', 'C2', 'C2', 'C2', 'C2', 'C1'],
    ['C3', 'C2', 'C3', 'C2', 'C2', 'C2', 'C2', 'C1', 'C2', 'C2', 'C2', 'C2', 'C1'],
    ['C1', 'C2', 'C3', 'C2', 'C2', 'C2', 'C3', 'C1', 'C2', 'C2', 'C2', 'C2', 'C1'],
    ['C1', 'C2', 'C1', 'C2', 'C2', 'C2', 'C2', 'C1', 'C2', 'C2', 'C2', 'C2', 'C1'],
    ['C1', 'C2', 'C1', 'C2', 'C2', 'C2', 'C2', 'C1', 'C2', 'C2', 'C2', 'C2', 'C1'],
    ['C1', 'C1', 'C3', 'C1', 'C1', 'C1', 'C1', 'C3', 'C1', 'C1', 'C1', 'C1', 'C3']
 ]*/

 var map = [
    [ 'C1', 'C1', 'C1', 'C1', 'C1', 'C1', 'C1', 'C1', 'C2', 'C1', 'C1', 'C3' ],
	[ 'C1', 'C1', 'C2', 'C2', 'C1', 'C1', 'C1', 'C1', 'C1', 'C2', 'C1', 'C2' ],
	[ 'C1', 'C1', 'C2', 'C3', 'C2', 'C1', 'C1', 'C1', 'C1', 'C1', 'C2', 'C3' ],
	[ 'C1', 'C1', 'C2', 'C3', 'C2', 'C1', 'C1', 'C2', 'C2', 'C1', 'C2', 'C3' ],
	[ 'C3', 'C1', 'C2', 'C2', 'C2', 'C3', 'C2', 'C1', 'C2', 'C1', 'C2', 'C1' ],
	[ 'C3', 'C1', 'C3', 'C3', 'C1', 'C3', 'C2', 'C3', 'C2', 'C1', 'C2', 'C1' ],
	[ 'C3', 'C1', 'C3', 'C1', 'C1', 'C1', 'C2', 'C2', 'C2', 'C1', 'C2', 'C1' ],
	[ 'C3', 'C3', 'C1', 'C1', 'C1', 'C1', 'C1', 'C1', 'C1', 'C1', 'C1', 'C1' ]
 ]
class block{
    constructor({position, type}){
        this.position = position,
        this.type = type
    }

    draw(){
        if(this.type === 'blued'){
            ctx.fillStyle = 'blue'
        }else{
        if(this.type === 'blue' || this.type === 'purple' || this.type === 'black' || this.type === 'blued') {ctx.fillStyle = this.type}
        else if(this.type === 'd') {ctx.fillStyle = 'green';}
        }
        ctx.fillRect(this.position.x + 5, this.position.y, 40, 40)
    }
    update(){
        this.draw()
    }
}

class cursors{
    constructor({position}){
        this.position = position
    }
    update(){
    }
}

const cursor = new cursors({
    position: {
        x: 5,
        y: 0
    }
})

const blockmap = []

map.forEach((row, i) => {
    row.forEach((elem, k) => {
        switch(elem){
            case 'C1': {
                blockmap.push(
                    new block({
                        position:{
                            x: k * 45,
                            y: i * 45
                        },
                        type: 'blue'
                    }))
            }break;

            case 'C2': {
                blockmap.push(
                    new block({
                        position:{
                            x: k * 45,
                            y: i * 45
                        },
                        type: 'black'
                    }))
            }break;

            case 'C3': {
                blockmap.push(
                    new block({
                        position:{
                            x: k * 45,
                            y: i * 45
                        },
                        type: 'blued'
                    }))
            }break;
        }
    })
})


blockmap.forEach((elem) => {
    elem.draw()
})

window.addEventListener('keydown', (event) => {
    var key

    if(event.key.length === 1){
    key = event.key.toLowerCase()}
    else{
        key = event.key
    }

    switch(key){
        case 'ArrowUp': {
            keypressed.w.press = true
        }break;

        case 'ArrowDown': {
            keypressed.s.press = true
        }break;

        case 'ArrowLeft':{
            keypressed.a.press = true
        }break;

        case 'ArrowRight': {
            keypressed.d.press = true
        }break;

        default: {
            console.log('invalid keypress')
        }
    }
})

var keypressed = {
    a:{
        press:false
    },
    d:{
        press:false
    },
    w:{
        press:false
    },
    s:{
        press:false
    },
}

function getProximityblocks(){

    const cursorpos = cursor.position
    var cx = cursorpos.x - 5
    var cy = cursorpos.y
    var array = []
    array.length = 0
    array = [{
        'top': null
    },
    {
        'left': null
    },
    {
        'right': null
    },
    {
        'down': null
    },
    {
        'inside': null
    }]
    blockmap.forEach((elem) => {
        var bx = elem.position.x
        var by = elem.position.y

        if(cx === bx && by - cy === -45){
            //console.log('top')
            array[0].top = elem
        }
        else if(cx === bx && by - cy === 45){
            //console.log('down')
            array[3].down = elem
        }
        else if(cy === by && bx - cx === 45){
            //console.log('right')
            array[2].right = elem
        }
        else if(cy === by && bx - cx === -45){
            //console.log('left')
            array[1].left = elem
        }
        else if(cx === bx && by === cy){
            array[4].inside = elem
        }
    })
 
    return [array[0].top, array[1].left, array[2].right, array[3].down, array[4].inside]

}

function handleFinish(blocks){

    var cnt = 0;

    blocks.forEach((elem) => {
        if(!elem || elem.type === 'black'){
            cnt++
        }else{
            cnt = 0
        }
    })

    if(cnt === 5){
        document.getElementById('cursor').style.animation = 'tilt-shaking .1s infinite'
        document.getElementById('cursor').style.backgroundColor = 'rgb(133, 11, 11)'
        looptime = 9999
        document.getElementById('game-over').style.display = 'block'
        setTimeout(() => {
            document.getElementById('game-over').style.opacity = '80%'
            setTimeout(() => {
                document.getElementById('cursor').style.animation = 'blink .5s alternate infinite'
            }, 200)
        }, 400)
    }



}

var tempset
var casecount = 0
var moneycount = 0
var iteration = 0

function animate(){
    setTimeout(() => {
        window.requestAnimationFrame(animate)
    }, looptime)
        
    var press

    
    /*if(keypressed.d.press && keypressed.s.press){
        press = 'down-right'
    }
    else if(keypressed.w.press && keypressed.d.press){
        press = 'up-right'
    }
    else if(keypressed.w.press && keypressed.a.press){
        press = 'up-left'
    }
    else if(keypressed.s.press && keypressed.a.press){
        press = 'down-left'
    }
    else{
        if(keypressed.a.press) press = 'a'
        else if(keypressed.d.press) press = 'd'
        else if(keypressed.w.press) press = 'w'
        else if(keypressed.s.press) press = 's'
    }*/

    if(keypressed.a.press) press = 'a'
        else if(keypressed.d.press) press = 'd'
        else if(keypressed.w.press) press = 'w'
        else if(keypressed.s.press) press = 's'

    const proxblocks = getProximityblocks()
    //console.log(proxblocks)
    try {
        if(tempset[4] && tempset[4] !== proxblocks[4]){
            switch(proxblocks[4].type){
                case 'blue':{  
                    //console.log(blockmap[blockmap.indexOf(proxblocks[4])])
                    blockmap[blockmap.indexOf(proxblocks[4])].type = 'purple'
                }break;

                case 'blued':{  
                    blockmap[blockmap.indexOf(proxblocks[4])].type = 'd'
                }break;
        
                case 'd':{
                    moneycount++
                    blockmap[blockmap.indexOf(proxblocks[4])].type = 'black'
                }break;
        
                case 'purple':{
                    blockmap[blockmap.indexOf(proxblocks[4])].type = 'black'
                }break;
            }}else{
                if(iteration === 1){
                    console.log('passed')
                    switch(proxblocks[4].type){
                        case 'blue':{  
                            blockmap[blockmap.indexOf(proxblocks[4])].type = 'purple'
                        }break;
        
                        case 'blued':{  
                            blockmap[blockmap.indexOf(proxblocks[4])].type = 'd'
                        }break;
                
                        case 'd':{
                            moneycount++
                            blockmap[blockmap.indexOf(proxblocks[4])].type = 'black'
                        }break;
                
                        case 'purple':{
                            blockmap[blockmap.indexOf(proxblocks[4])].type = 'black'
                        }break;
                    }
                }
            }
    } catch (e) {
        console.log(e)
    }
    
    //console.log(proxblocks)

    switch(press){
        case 'w': {
            if(proxblocks[0]){
                if(proxblocks[0].type === 'blue' || proxblocks[0].type === 'purple' || proxblocks[0].type === 'd' || proxblocks[0].type === 'blued'){
                    iteration = 0
                cursor.position.y -= 45;
                casecount++}
            }
            keypressed.w.press = false
        }break;

        case 'd': {
            if(proxblocks[2]){
                if(proxblocks[2].type === 'blue' || proxblocks[2].type === 'purple' || proxblocks[2].type === 'd' || proxblocks[2].type === 'blued'){
                    iteration = 0
                    cursor.position.x += 45
                    casecount++}}
            keypressed.d.press = false
        }break;

        case 'a': {
            if(proxblocks[1]){
                if(proxblocks[1].type === 'blue' || proxblocks[1].type === 'purple' || proxblocks[1].type === 'd' || proxblocks[1].type === 'blued'){
                    iteration = 0
                    cursor.position.x -= 45
                    casecount++}}
            keypressed.a.press = false
        }break;

        case 's': {
            if(proxblocks[3]){
                if(proxblocks[3].type === 'blue' || proxblocks[3].type === 'purple' || proxblocks[3].type === 'd' || proxblocks[3].type === 'blued'){
                    iteration = 0
                    cursor.position.y += 45
                    casecount++}}
            keypressed.s.press = false
        }break;

        case 'up-left': {
            /*if(proxblocks[0] && proxblocks[1]){
                if(proxblocks[0].type === 'blue' || proxblocks[0].type === 'purple' || proxblocks[0].type === 'd' || proxblocks[0].type === 'blued'){
                    if(proxblocks[1].type === 'blue' || proxblocks[1].type === 'purple' || proxblocks[1].type === 'd' || proxblocks[1].type === 'blued'){
                    iteration = 0
                    cursor.position.y -= 45
                    cursor.position.x -= 45
                    casecount++}
                }}
            keypressed.w.press = false
            keypressed.a.press = false*/
        }break;

        case 'up-right': {
            /*if(proxblocks[0] && proxblocks[2]){
                if(proxblocks[0].type === 'blue' || proxblocks[0].type === 'purple' || proxblocks[0].type === 'd' || proxblocks[0].type === 'blued'){
                    if(proxblocks[2].type === 'blue' || proxblocks[2].type === 'purple' || proxblocks[2].type === 'd' || proxblocks[2].type === 'blued'){
                    iteration = 0
                    cursor.position.y -= 45
                    cursor.position.x += 45
                    casecount++}
                }}
            keypressed.w.press = false
            keypressed.d.press = false*/
        }break;

        case 'down-left': {
            /*if(proxblocks[3] && proxblocks[1]){
                if(proxblocks[3].type === 'blue' || proxblocks[3].type === 'purple' || proxblocks[3].type === 'd' || proxblocks[3].type === 'blued'){
                    if(proxblocks[1].type === 'blue' || proxblocks[1].type === 'purple' || proxblocks[1].type === 'd' || proxblocks[1].type === 'blued'){
                    iteration = 0
                    cursor.position.y += 45
                    cursor.position.x -= 45
                    casecount++}
                }}
            keypressed.s.press = false
            keypressed.a.press  = false*/
        }break;

        case 'down-right': {
            /*if(proxblocks[3] && proxblocks[2]){
                if(proxblocks[3].type === 'blue' || proxblocks[3].type === 'purple' || proxblocks[3].type === 'd' || proxblocks[3].type === 'blued'){
                    if(proxblocks[2].type === 'blue' || proxblocks[2].type === 'purple' || proxblocks[2].type === 'd' || proxblocks[2].type === 'blued'){
                    iteration = 0
                    cursor.position.y += 45
                    cursor.position.x += 45
                    casecount++}
                }}
            keypressed.s.press = false
            keypressed.d.press = false*/
        }break;

    }


    blockmap.forEach((elem) => {
        elem.update()
    })
    iteration++
    tempset = proxblocks

    document.getElementById('Num-case').innerText = casecount
    document.getElementById('Money-case').innerText = moneycount
    handleFinish(proxblocks)

    cursor.update()
    //console.log(cursor.position.x)
    document.getElementById('cursor').style.top = cursor.position.y + 'px'
    document.getElementById('cursor').style.left = cursor.position.x + 'px'
}

animate()