/**
 * @license MIT
 * 
 * Written by Luuk Walstra
 * Discord: Luuk#8524
 * Github: https://github.com/Luuk-Dev
 * Replit: https://replit.com/@LuukDev
 * Repository: https://github.com/Luuk-Dev/TypeWriter
 * 
 * You're free to use this library as long as you keep this statement in this file
 */
var __typewriter_cuid = 0;
class TypeWriter{
    constructor(object, options){
        if(typeof object !== 'string' && typeof object !== 'object') return console.error(`Invalid element! Element must be a string or an object.`);
        __typewriter_cuid = __typewriter_cuid + 1;
        this.id = __typewriter_cuid;
        this.element = typeof object === 'object' ? object : document.querySelector(object);
        if(!this.element) return console.error(`The element does not exists!`);
        this.save = [];
        this.options = options || {};
        this.timeout = this.options.timeout || 100;
        this.running = true;
        const defaultcursor = {
          speed: 1000,
          size: 'larger',
          id: 'TypeWriter_Effect_CSS',
          enabled: true
        };
        const cursor = this.options.cursor || defaultcursor;
        const stylesheet = document.createElement(`style`);
        stylesheet.type = "text/css";
        stylesheet.innerHTML = `#typewriter-effect-${this.id}{font-size:${cursor.size || defaultcursor.size};animation:TypeWriter ${(cursor.speed || defaultcursor.speed)/1000}s infinite;}@keyframes TypeWriter{0%{opacity: 0;}50%{opacity: 1;}100%{opacity: 0;}}`;
        stylesheet.id = cursor.id || defaultcursor.id;
        if((cursor['enabled'] || defaultcursor.enabled) === true) document.head.appendChild(stylesheet);
    }
    wait(ms){
        if(typeof ms !== 'number') return console.error(`Invalid number! MS must be a number.`);
        this.save.push({wait: ms, value: null, remove: null, writing: false});
        return this;
    }
    write(value){
        if(typeof value !== 'string') return console.error(`Invalid value! Value must be a string.`)
        this.save.push({wait: null, value: value, remove: null, writing: true});
        return this;
    }
    removeAll(){
        this.save.push({wait: null, value: null, remove: true, writing: false});
        return this;
    }
    remove(charAt){
        if(typeof charAt !== 'number') return console.error(`Invalid position of string! The position must be a number.`);
        this.save.push({wait: null, value: null, remove: charAt, writing: false});
        return this;
    }
    addText(value){
      if(typeof value !== 'string') return console.error(`Invalid value! Value must be a string.`);
      this.save.push({wait: null, value: value, remove: null, writing: false})
      return this;
    }
    start(){
        if(!document.querySelector(`#typewriter-effect-${this.id}`)){
          this.element.innerHTML = `<span id="typewriter-typer-${this.id}"></span>`;
          if(typeof this.options.cursor === 'object'){
            if(this.options.cursor['enabled'] !== false){
              this.element.innerHTML += `<span id="typewriter-effect-${this.id}">|</span>`;
            }
          } else this.element.innerHTML += `<span id="typewriter-effect-${this.id}">|</span>`;
        }
        (async () => {
            var i;
            for(i = 0; i < this.save.length;){
                if(this.running === false){
                    break;
                }
                const obj = this.save[i];
                if(obj.wait){
                    await this.__wait(obj.wait);
                    ++i;
                } else if(obj.value){
                    const text = document.querySelector(`#typewriter-typer-${this.id}`);
                    if(!text) return ++i;
                    if(obj.writing === true){
                      var val = text.innerHTML;
                      var objlength = '';
                      while(objlength !== obj.value && this.running === true){
                          await this.__wait(this.timeout);
                          val = val + obj.value.charAt(objlength.length);
                          objlength += obj.value.charAt(objlength.length);
                          text.innerHTML = val;
                      }
                    } else {
                      text.innerHTML += obj.value;
                    }
                    ++i;
                } else if(obj.remove){
                    if(obj.remove === true){
                        const text = document.querySelector(`#typewriter-typer-${this.id}`);
                        if(!text) return ++i;
                        var val = text.innerHTML;
                        while(val !== '' && this.running === true){
                            await this.__wait(this.timeout);
                            val = val.substring(0, val.length - 1);
                            text.innerHTML = val;
                        }
                        ++i;
                    } else {
                        const text = document.querySelector(`#typewriter-typer-${this.id}`);
                        if(!text) return ++i;
                        var val = text.innerHTML;
                        while(val !== val.substring(0, obj.remove) && this.running === true){
                            await this.__wait(this.timeout);
                            val = val.substring(0, val.length - 1);
                            text.innerHTML = val;
                        }
                        ++i;
                    }
                }
            }
            while(i !== this.save.length){
                await this.__wait(this.timeout);
            }
            if(typeof this.options.callback === 'object'){
              if(typeof this.options.callback.onend === 'function'){
                this.options.callback.onend();
              }
            }
            if(this.options.loop) this.start();
        })();
    }
    stop(){
        this.running = false;
    }
    __wait(ms){
        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms);
        });
    }
}