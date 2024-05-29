//******************************************************************************************************************** */
// // Introduction to HTML5 Canvas
//******************************************************************************************************************** */

// What is HTML5 Canvas?
// The HTML5 <canvas> element is used to draw graphics, on the fly, via scripting (usually JavaScript).
//The <canvas> element is a part of HTML5 that allows you to draw graphics using JavaScript. 
//It can be used to create a wide range of visual applications, from simple shapes and graphics to complex interactive applications like games and data visualizations
// The <canvas> element has a method called getContext(), used to obtain the rendering context and its drawing functions.

// Setting up the Canvas
// To draw on the canvas, you need to set up the canvas element in the HTML file.
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d'); // or canvas.getContext('2d'); // 2d rendering context for the drawing surface of the canvas element. 

// // Basic Drawing Operations
// // Drawing a Line
// // Drawing a Rectangle

// ctx.fillStyle = 'green';
// ctx.fillRect(10, 10, 100, 100); // Draws a green filled rectangle
// ctx.strokeStyle = 'red';
// ctx.strokeRect(9,9,102,102); // Draws a red outlined rectangle
// ctx.strokeRect(150, 10, 100, 100); // Draws a red outlined rectangle
// ctx.clearRect(20, 20, 80, 80); // Clears a rectangle inside the green one

// //Drawing Paths
// ctx.beginPath();
// ctx.moveTo(10, 150);
// ctx.lineTo(100, 200);
// ctx.lineTo(200, 150);
// ctx.closePath();
// ctx.strokeStyle = 'red';
// ctx.stroke(); // Draws the outlined path
// ctx.fillStyle = 'blue';
// ctx.fill(); // Fills the path with blue color

// // Drawing Circles and Arcs

// ctx.beginPath();
// ctx.arc(300, 75, 50, 0, Math.PI *2, true); // Outer circle
// ctx.moveTo(335, 75);
// ctx.arc(300, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
// ctx.moveTo(290, 65);
// ctx.arc(285, 65, 5, 0, Math.PI * 2, true); // Left eye
// ctx.moveTo(320, 65);
// ctx.arc(315, 65, 5, 0, Math.PI * 2, true); // Right eye
// ctx.stroke();

// Drawing Text

// ctx.font = '30px Arial';
// ctx.fillStyle = 'black';
// ctx.fillText('Hello Canvas', 10, 50);
// ctx.strokeStyle = 'blue';
// ctx.strokeText('Hello Canvas', 10, 100);


// // Images and Patterns

// var img = new Image();
// img.src = 'he.png';
// img.onload = function() {
//     ctx.drawImage(img, 30, 50, 300, 400); // Draw the image
//     var pattern = ctx.createPattern(img, 'repeat');
//     ctx.fillStyle = pattern;
//     ctx.fillRect(320, 0, 600, 600); // Draw a rectangle filled with the pattern
// };

// Combining Shapes and Text

// // Draw a filled rectangle
// ctx.fillStyle = 'orange';
// ctx.fillRect(50, 200, 200, 100);

// // Draw text over the rectangle
// ctx.font = '20px Arial';
// ctx.fillStyle = 'black';
// ctx.fillText('Canvas Text', 70, 260);

// // Draw an outlined circle with text inside
// ctx.beginPath();
// ctx.arc(400, 150, 75, 0, Math.PI * 2, true);
// ctx.stroke();
// ctx.font = '20px Arial';
// ctx.fillStyle = 'blue';
// ctx.fillText('Circle Text', 355, 155);


// //Handling Events on HTML5 Canvas

// Setting Up Event Listeners
 // Event listeners
 canvas.addEventListener('mousedown', onMouseDown);
 canvas.addEventListener('mousemove', onMouseMove);
 canvas.addEventListener('mouseup', onMouseUp);
 document.addEventListener('keydown', onKeyDown);

 // Event handlers
 function onMouseDown(event) {
     console.log('Mouse down at', event.offsetX, event.offsetY);
 }

 function onMouseMove(event) {
     console.log('Mouse move at', event.offsetX, event.offsetY);
 }

 function onMouseUp(event) {
     console.log('Mouse up at', event.offsetX, event.offsetY);
 }

 function onKeyDown(event) {
     console.log('Key down:', event.key);
 }


 // Drawing on Canvas with Mouse Events

 var isDrawing = false;

    function onMouseDown(event) {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(event.offsetX, event.offsetY);
    }

    function onMouseMove(event) {
        if (isDrawing) {
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.stroke();
        }
    }

    function onMouseUp(event) {
        if (isDrawing) {
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.stroke();
            ctx.closePath();
            isDrawing = false;
        }
    }


    //Handling Keyboard Events

    function onKeyDown(event) {
      switch(event.key) {
          case 'r':
              ctx.strokeStyle = 'red';
              break;
          case 'g':
              ctx.strokeStyle = 'green';
              break;
          case 'b':
              ctx.strokeStyle = 'blue';
              break;
      }
  }


  // Combining Mouse and Keyboard Events

  var currentColor = 'black';

    function onKeyDown(event) {
        switch(event.key) {
            case 'r':
                currentColor = 'red';
                break;
            case 'g':
                currentColor = 'green';
                break;
            case 'b':
                currentColor = 'blue';
                break;
        }
    }

    function onMouseDown(event) {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(event.offsetX, event.offsetY);
    }

    function onMouseMove(event) {
        if (isDrawing) {
            ctx.strokeStyle = currentColor;
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.stroke();
        }
    }

    function onMouseUp(event) {
        if (isDrawing) {
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.stroke();
            ctx.closePath();
            isDrawing = false;
        }
    }


    // Interactive Applications
    // You can develop interactive applications like drawing boards, games, and data visualizations by effectively handling canvas events.
    var isDrawing = false;
    var currentColor = 'black';

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    document.addEventListener('keydown', onKeyDown);

    function onMouseDown(event) {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(event.offsetX, event.offsetY);
    }

    function onMouseMove(event) {
        if (isDrawing) {
            ctx.strokeStyle = currentColor;
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.stroke();
        }
    }

    function onMouseUp(event) {
        if (isDrawing) {
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.stroke();
            ctx.closePath();
            isDrawing = false;
        }
    }

    function onKeyDown(event) {
        switch(event.key) {
            case 'r':
                currentColor = 'red';
                break;
            case 'g':
                currentColor = 'green';
                break;
            case 'b':
                currentColor = 'blue';
                break;
        }
    }
//******************************************************************************************************************** */
// // II templates
//******************************************************************************************************************** */

// class ApplicationManager {
//   constructor(container) {

//     this.app = new PIXI.Application({
//       width: container.offsetWidth,
//       height: container.offsetHeight,
//     });
//     container.appendChild(this.app.view);
//     this.app.sortableChildren = true;
//     this.sprites = [];
//     this.popUp = null;
//     console.log(window.location.pathname);
//     this.loadAssets();
//     this.lang = 'BN';
//   }

//   loadAssets(){
//     fetch('data.json')
//       .then(response => response.json())
//       .then(data => this.loadTextures(data))
//       .catch(console.error);
//   }

//   loadTextures(data){
//     PIXI.Loader.shared.add(data.bgImage.src);
//     PIXI.Loader.shared.add(data.popUp.src);
//     PIXI.Loader.shared.add('popUpMute', '../../../../code/ii template/images/mute.png');
//     PIXI.Loader.shared.add('popUpUnmute', '../../../../code/ii template/images/unmute.png');
//     data.assets.forEach(element => {
//       PIXI.Loader.shared.add(element.iconSrc);
//     });
//     data.assets.forEach(element => {
//       PIXI.Loader.shared.add(element.popupSrc);
//     });
//     PIXI.Loader.shared.load((loader, resources) => 
//     this.setupScene(resources, data));
//   }

//   setupScene(resources, data){
//     this.lang = data.lang;
//     document.title = data.title[this.lang];
//     this.setupBg(this.app, resources[data.bgImage.src].texture);
//     const titleBar = new TitleBar(data.title[this.lang], {width: this.app.view.width, height: 50, fontSize: 18});
//     this.app.stage.addChild(titleBar.view);
//     const muteButton = new SoundButton(resources['popUpUnmute'].texture, resources['popUpMute'].texture);
//     muteButton.x = this.app.renderer.width - 75;
//     muteButton.y = 0;
//     muteButton.scale.set(0.5);
//     this.app.stage.addChild(muteButton);
    
//     const scale = this.app.renderer.width / 1920;
//     data.assets.forEach(element => {
//       element.scale = scale;
//       const sprite = new CustomSprite(resources[element.iconSrc].texture, element);
//       sprite.interactive = true;
//       sprite.zIndex = 1;
//       sprite.cursor = 'zoom-in';
//       this.sprites.push(sprite);
//       this.app.stage.addChild(sprite);
//       sprite.on('click', () => {
//         this.popUp.setPopUpSpriteTexture(resources[element.popupSrc].texture);
//         this.popUp.setPopUpSpriteScale(0.5);
//         this.popUp.visible = !this.popUp.visible;
//         muteButton.popSoundPlay();
//         this.popUp.header = element.header[this.lang];
//         this.popUp.details = element.details[this.lang];
//       });
      
//     });
//     this.popUp = new PopUp({
//       popupBoxTexture: resources[data.popUp.src].texture,
//       width: this.app.view.width,
//       height: this.app.view.height,
//       popUpSpriteScale: .5
//     });
//     this.popUp.visible = false;
//     this.app.stage.addChild(this.popUp);
//   }

//   setupBg(app, texture){
//     const bg = new PIXI.Sprite(texture);
//     bg.width = app.view.width;
//     bg.height = app.view.height;
//     bg.anchor.set(0.5);
//     bg.x = app.view.width / 2;
//     bg.y = app.view.height / 2;
//     bg.interactive = false;
//     app.stage.addChild(bg);
//   }
// }

// document.addEventListener('DOMContentLoaded', () => {
//   const conatiner = document.getElementById('container');
//   new ApplicationManager(conatiner);
// });
