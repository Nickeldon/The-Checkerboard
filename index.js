document.getElementById('ch-id').innerHTML = 'Map 1'

function playSound(index){
    switch(index){
        case 1:{
            var hover = new Howl({
                src: ['./Addons/musics/hover.mp3'],
                volume: 0.2,
                autoplay: true,
                stereo: true,
              });
              hover.play()
        }break;

        case 2:{

        }break;
    }
}

var choice = 1
function chooser(action){
    
    document.querySelectorAll('.map-preview').forEach((map) => {
        map.style.display = 'none'
    })

    if(action === 'Arrow-Right'){
        switch(choice){
            case 1:{
                document.getElementById('map-prev2').style.display = 'block'
                choice = 2;
                document.getElementById('ch-id').innerHTML = 'Map 2'
                }
                break;
            case 2:{
               document.getElementById('map-prev3').style.display = 'block'
                document.getElementById('ch-id').innerHTML = 'Map 3'
                choice = 3;
                }
                break;
            case 3:{
               document.getElementById('map-prev4').style.display = 'block'
                document.getElementById('ch-id').innerHTML = 'Map 4'
                choice = 4}
                break;
            case 4:{
               document.getElementById('map-prev5').style.display = 'block'
                document.getElementById('ch-id').innerHTML = 'Map 5'
                choice = 5
            }
                break;
            case 5:{
               document.getElementById('map-prev6').style.display = 'block'
                document.getElementById('ch-id').innerHTML = 'Map 6'
                choice = 6
            }break;

            case 6:{
                document.getElementById('map-prev1').style.display = 'block'
                 document.getElementById('ch-id').innerHTML = 'Map 1'
                 choice = 1
             }break;

        }
    }
    else{
        console.log(choice)
        switch(choice){
            case 6:{
                document.getElementById('map-prev5').style.display = 'block'
                 document.getElementById('ch-id').innerHTML = 'Map 5'
                 choice = 5
             }break;

            case 5:{
               document.getElementById('map-prev4').style.display = 'block'
                document.getElementById('ch-id').innerHTML = 'Map 4'
                choice = 4}
                break;
            case 4:{
               document.getElementById('map-prev3').style.display = 'block'
                document.getElementById('ch-id').innerHTML = 'Map 3'
                choice = 3;
                }
                break;
            case 3:{
               document.getElementById('map-prev2').style.display = 'block'
                document.getElementById('ch-id').innerHTML = 'Map 2'
                choice = 2;
                    }
                break;
            case 2:{
               document.getElementById('map-prev1').style.display = 'block'
                document.getElementById('ch-id').innerHTML = 'Map 1'
                choice = 1}
                break;
            case 1:{
               document.getElementById('map-prev6').style.display = 'block'
                document.getElementById('ch-id').innerHTML = 'Map 6'
                choice = 6
            }break;

        }
    }
}  

function redirect(target){
    switch(target){
        case 1: {
            document.getElementById('chooser').style.display = 'block'
            setTimeout(() => {
                document.getElementById('chooser').style.left = '0'
            }, 100)
        }break;

        case 2: {

        }break;

        case 3: {
                document.getElementById('transition').style.display = 'block'
                setTimeout(() => {
                    document.getElementById('transition').style.opacity = '100%'
                    setTimeout(() => {
                        window.parent.stopProcess()
                    }, 900)
                }, 100)
            
        }break;

        case 4: {
            window.parent.triggerSelect()
            document.getElementById('main').style.transform = 'scale(10)'
            setTimeout(() => {
                document.getElementById('transition').style.display = 'block'
                setTimeout(() => {
                    document.getElementById('transition').style.opacity = '100%'
                    setTimeout(() => {
                        window.parent.redir(document.getElementById('ch-id').innerHTML, 1)
                    }, 1000)
                }, 100)
            }, 900)
        }break;
    }
}

window.addEventListener('keydown', (event) => {
    var key

    if(event.key.length === 1){
    key = event.key.toLowerCase()}
    else{
        key = event.key
    }
    if(key === 'Escape' && document.getElementById('chooser').style.left === '0px'){
        document.getElementById('chooser').style.left = '590px'
            setTimeout(() => {
                document.getElementById('chooser').style.display = 'none'        
            }, 750)
    }
})