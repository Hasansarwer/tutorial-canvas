// Description: Extending PIXI.Sprite class to add custom functionality with element details
class CustomSprite extends PIXI.Sprite {
    constructor(texture, element) {
      super(texture);
      this.anchor.set(0.5);  // Center the sprite
      this.scale.set(element?.scale || 1);  // Default scale set once
      this.initialize(element);  // Removed 'this' from arguments
    }
  
    initialize(element) {
      // Set defaults or use provided values
      this.x = (element?.x || 0) * element?.scale;
      this.y = (element?.y || 0) * element?.scale;
      this.interactive = true;
      // Add event handlers only if the sprite is interactive
      if (this.interactive) {
        this.addInteractivity(element);
      }
    }
  
    addInteractivity(element) {
      this.on('pointerover', () => this.scale.set(1.05*element.scale));  // Reduce opacity on hover
      this.on('pointerout', () => this.scale.set(1.0*element.scale) );    // Reset opacity on mouse out
    }
  }

  class GraphicsText extends PIXI.Graphics {
    constructor(text, options = {}) {
      super();
      this.options = {
        fontFamily: "Tiro Bangla, Arial, sans-serif",
        fontSize: 24,
        fill: 0x000000,
        ...options
      };
      this.text = new PIXI.Text(text, this.options);
      this.text.anchor.set(0.5);
      this.addChild(this.text);
      this.interactive = this.options.interactive || false;
      this.drawShape();
      this.text.x = this.text.width / 2;
      this.text.y = this.text.height / 2;
      this.anchor.set(0.5);
      this.x = this.options.x || 0;
      this.y = this.options.y || 0;
    }
    drawShape() {
      if(this.options.shape === 'rect') {
        this.beginFill(this.options.fill || 0x000000, this.options.alpha || 1);
        this.drawRect(0, 0, this.text.width + 20, this.text.height + 10);
        this.endFill();
      }else if(this.options.shape === 'circle') {
        this.beginFill(this.options.fill || 0x000000, this.options.alpha || 1);
        this.drawCircle(0, 0, this.text.width + 20);
        this.endFill();
      }else if(this.options.shape === 'ellipse') {
        this.beginFill(this.options.fill || 0x000000, this.options.alpha || 1);
        this.drawEllipse(0, 0, this.text.width + 20, this.text.height + 10);
        this.endFill();
      }
    }
  }


    // Description: Extending PIXI.Sprite class to add custom functionality for sound button

  class SoundButton extends PIXI.Sprite {
    constructor(unMuteTexture, muteTexture) {
        super(unMuteTexture);
        this.unMuteTexture = unMuteTexture;
        this.muteTexture = muteTexture;
        this.currentTexture = unMuteTexture; // Track current texture
        this.soundPlay = false;
        this.interactive = true;
        this.buttonMode = true;
        this.popSound = new Audio('../../../../code/ii template/sounds/pop.mp3');
        this.bgSound = new Audio('../../../../code/ii template/sounds/bg_music.mp3');
        this.bgSound.volume = 0.10;
        this.popSound.volume = 0.5;
        this.bgSound.loop = true;
        // Add interaction listeners directly in the constructor
        this.addInteractivity();
        this.popSoundPlay();
  
        // Setup click listener
        this.on('click', () => {
            // Toggle texture
            this.soundPlay = !this.soundPlay;
            this.currentTexture = this.soundPlay ? this.muteTexture : this.unMuteTexture;
            this.texture = this.currentTexture;
  
            // Play or pause background sound based on current texture
            if (this.soundPlay) {
                this.bgSound.play();
            } else {
                this.bgSound.pause();
            }
        });
    }
  
    addInteractivity() {
        this.on('pointerover', () => this.alpha = 0.7);  // Reduce opacity on hover
        this.on('pointerout', () => this.alpha = 1);    // Reset opacity on mouse out
    }
  
    popSoundPlay() {
      if (this.soundPlay) {
            this.popSound.play();
        }
    }
  }

    // Description: Extending PIXI.Sprite class to add custom functionality for pop-up window

  class PopUp extends PIXI.Graphics {
    constructor(options = {}) {
      super();
      this.options = {
        width: 600,
        height: 500,
        header: '',
        details: '',
        texture: null, // Default texture for the pop-up window
        popUpSpriteTexture: null, // Default texture for the pop-up sprite
        popUpSpriteScale: .2, // Default scale for the pop-up sprite
        popupBoxTexture: null, 
        ...options
      };


      this.popUpBox = new CustomSprite(this.options.popupBoxTexture);
      this.popUpBox.anchor.set(0.5);
      this.popUpBox.interactive = false;
      if(this.options.width < 768){
        this.popUpBox.width = 384;
        this.popUpBox.height = 320;
      }else{
        this.popUpBox.width = 430;
        this.popUpBox.height = 360;
      }
      this.popUpBox.x = this.options.width / 2;
      this.popUpBox.y = this.options.height / 2;
      this.addChild(this.popUpBox);

      this.popUpSprite = new CustomSprite(this.options.popUpSpriteTexture);
      this.popUpSprite.anchor.set(0.5);
      this.popUpSprite.interactive = false;
      this.popUpSprite.scale.set(this.options.popUpSpriteScale);
      

      this.popUpBox.addChild(this.popUpSprite);

      
      this._headerText = new PIXI.Text('', {fontFamily: "Tiro Bangla, Arial, sans-serif", fontSize: 48, fill: 0x000000});
      this._headerText.anchor.set(0.5);
      this.popUpBox.addChild(this._headerText);
      
      this._detailsText = new PIXI.Text('', {fontFamily: "Tiro Bangla, Arial, sans-serif", fontSize: 36, fill: 0x000000});
      this._detailsText.anchor.set(0.5);
      this.popUpBox.addChild(this._detailsText);
  
      this.initialize();
      this.drawBackround();

    }
  
    initialize() {
      this.visible = false;
      this.interactive = false;
      this.buttonMode = false;
    }

    drawBackround() {
      this.beginFill(0x111111, .7); 
      this.drawRect(0, 0, this.options.width, this.options.height);
      this.endFill();
    }

    setPopUpSpriteTexture(texture) {
      this.popUpSprite.texture = texture;
      this.popUpSprite.x = 0;
      this.popUpSprite.y = -this.popUpSprite.height /3;
      this._headerText.x = 0 ;
      this._headerText.y = this.popUpSprite.height / 5+40;// - this._headerText.height/2;
      this._detailsText.x = 0;
      this._detailsText.y = this._headerText.y +70;//this.popUpSprite.height / 2 + this._headerText.height + 10;
    }

    setPopUpSpriteScale(scale) {
      this.popUpSprite.scale.set(scale);
    }
  
    set header(text) {
      this._headerText.text = text;
    }
  
    set details(text) {
      this._detailsText.text = text;
    }
  
    get header() {
      return this._headerText.text;
    }
  
    get details() {
      return this._detailsText.text;
    }
  }
  
    // Description: Class to create a title bar with a rectangle and text

  class TitleBar {
    constructor(title, options = {}) {
        // Establish default settings and merge with options if provided
        const settings = Object.assign({
            width: 300, // Default width of the title bar
            height: 50, // Default height of the title bar
            backgroundColor: 0xFFFFFF, // White background color
            backgroundAlpha: 0.5, // Semi-transparent
            textColor: 0x000000, // Black text color
            fontSize: 24, // Default font size
            fontFamily: "Tiro Bangla, Arial, sans-serif", // Default font family
        }, options);
  
        // Create the rectangle for the title bar background
        this.rectangle = new PIXI.Graphics();
        this.rectangle.beginFill(settings.backgroundColor, settings.backgroundAlpha);
        this.rectangle.drawRect(0, 0, settings.width, settings.height);
        this.rectangle.endFill();
        this.rectangle.visible = true;
  
        // Create the title text
        this.title = new PIXI.Text('\n\t' + title + '\t\n', {
            fontFamily: settings.fontFamily,
            fontSize: settings.fontSize,
            fill: settings.textColor
        });
  
        this.title.x = 10;
        this.title.y = -5; //settings.height / 2;
  
        // Add the title text over the rectangle
        this.rectangle.addChild(this.title);
        this.rectangle
    }
  
    // Function to get the PIXI container for the title bar
    get view() {
        return this.rectangle;
    }
  }