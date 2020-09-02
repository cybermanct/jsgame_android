class Renderer{
  constructor(){
    this.objects=[];
    //массив объектов мира
    this.cams=[];
    //массив с камерами
  }

  addObject(object){
    //добавить объект
    let id=this.objects.push(object);
    //возвращает id добавленного объекта
    return id-1;
  }

  deleteObject(id){
    //удаляет объект из списка отрисовываемых
    this.objects[id].drawble=false;
  }

  addCam(camera){
    //добавление камеры
    let cams = this.cams.push(camera);
    //возвращает колличество камер
    return cams;
  }

  countDrawbleObjects(camera){
    //получить список id отрисовываемых объектов
    
  }

  update(){
    //отрисовка
  }
}

class GameObject{
  constructor(x, y, width, height, texture, animated, physics, collision){
    this.x=x;
    this.y=y;
    //координаты объекта
    this.width=width;
    this.height=height;
    //ширина и высота
    this.physics=physics;
    //булево значение, определяет, действует-ли гравитация на объект
    this.collision=collision;
    //булево значение, включает и выключает коллизию
    this.anims=[];
    this.anims['default']=new Image();
    this.anims['default'].src=texture;
    //аргумент texture содержит в себе текстовое значение(путь к спрайту)
    this.animated=animated;
    //булево значение, определяющее, имеет объект анимации или нет
    //если false, то отрисовывается всегда картинка из anims['default']
    this.anim='default';
    this.frame=0;
    //кадр анимации
    this.drawble=true;
  }

  addAnimation(animation){
    //аргумент animation принимает объект анимации
    this.anims[animation.name]=animation;
  }

  draw(ctx){
    ctx.beginPath();
    ctx.drawImage(this.texture, this.x, this.y, this.width, this.height);
    ctx.closePath();
  }
}

class Animation{
  constructor(name, frames, path){
    this.name=name;
    //название анимации
    this.frames=frames;
    //колличество кадров
    this.images=[];

    //массив изображений
    //условно договариваемся, что в папке path спрайты называются 0, 1, 2...
    //и они имеют расширение .png

    for (let i=0; i<frames; i++){
      this.images[i]=new Image();
      this.images[i].src=path+i+".png";
    }
    //загружаем все файлы через цикл
  }
}

class Camera{
  constructor(x, y, width, height){
    this.x=x;
    this.y=y;
    //x и y верхнего правого угла камеры
    this.width=width;
    this.height=height;
    //ширина и высота изображения
    //объекты, не попадающие на камеру, не отрисовываются
  }
}
