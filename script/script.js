var cvs = document.getElementById("canvas")
var ctx = cvs.getContext("2d")

var bird = new Image()
var bg = new Image()
var fg = new Image()
var pipeUP = new Image()
var pipeBottom = new Image()

bird.src = "img/kordan.png"
bg.src = "img/bg.png"
fg.src = "img/fg.png"
pipeUP.src = "img/pipeUp.png"
pipeBottom.src = "img/pipeBottom.png"

var gap = 150

//tap button
document.addEventListener('keydown', moveUp)
document.addEventListener('click', moveUp)

function moveUp() {
    yPos -= 30
}

// create Block
var pipe = []
pipe[0] = {
    x : cvs.width,
    y : 0
}

var score = 0
// position bird
var xPos = 10
var yPos = 150
var grav = 1


function draw() {
    ctx.drawImage(bg, 0, 0)

    for (var i = 0; i < pipe.length ; i++) {
        ctx.drawImage(pipeUP, pipe[i].x, pipe[i].y)
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUP.height + gap)

        pipe[i].x--

        if(pipe[i].x == 100  ) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeBottom.height) - pipeUP.height
            })
        }
        // follow touch
        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUP.width
            && (yPos <= pipe[i].y + pipeUP.height
                || yPos + bird.height >= pipe[i].y + pipeUP.height + gap)
                || yPos + bird.height >= cvs.height - fg.height) {
             location.reload() // reload page
        }

        if (pipe[i].x == 5){
            score++
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height)
    ctx.drawImage(bird, xPos, yPos)

    yPos += grav

    ctx.fillStyle = '#000'
    ctx.font = '20px Verdana'
    ctx.fillText('Кардан не пив рево ' +score+ ' днів', 10, cvs.height - 20)

    requestAnimationFrame(draw)
}

pipeBottom.onload = draw
