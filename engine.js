class Renderer{
  constructor(){
    this.objects=[];
    //массив объектов мира
    this.cams=[];
    //массив с камерами
    this.selectedCam=0;
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
    //возвращает id камеры
    return cams-1;
  }

  countDrawbleObjects(cameraId){
    //получить список id отрисовываемых объектов
    let camera=this.cams[cameraId];
    //получаем камеру
    let drawbleObjects=[];
    //создаём массив объектов
    let cameraPoints=[];
    //создаём массив вершин камеры
    cameraPoints[0]=new Dot(camera.x, camera.y);
    cameraPoints[1]=new Dot(camera.x+camera.width, camera.y);
    cameraPoints[2]=new Dot(camera.x, camera.y+camera.height);
    cameraPoints[3]=new Dot(camera.x+camera.width, camera.y+camera.height);
    //считаем все вершины
    for (let i=0; i<this.objects.length, i++){
      //перебор всех элементов
      let objectPoints=[];
      //создаём массив вершин объекта
      objectPoints[0]=new Dot(this.objects[i].x, this.objects[i].y);
      objectPoints[1]=new Dot(this.objects[i].x+this.objects[i].width, this.objects[i].y);
      objectPoints[2]=new Dot(this.objects[i].x, this.objects[i].y+this.objects[i].height);
      objectPoints[3]=new Dot(this.objects[i].x+this.objects[i].width, this.objects[i].y+this.objects[i].height);
      //считаем все вершины
      for (let k=0; k<4; k++){
        //проверяем все вершины объекта на принадлежность к отрисовываемой области
        if(objectPoints[k].x>cameraPoints[0].x && objectPoints[k].x<cameraPoints[1].x && objectPoints[k].y>cameraPoints[0].y && objectPoints[k].y<cameraPoints[2].y){
          //если хоть одна вершина попадает на отрисовываемую область, то...
          drawbleObjects.push(i);
          //..добавляем её в список
          k=4;
          //и закрываем цикл
        }
      }
    }
    return drawbleObjects;
  }

  update(){
    //отрисовка
    drawbleObjects=this.countDrawbleObjects(this.selectedCam);
    //получаем список рисуемых объектов
    for(i=0; i<drawbleObjects.length; i++){
      //отрисовываем объекты
      this.objects[drawbleObjects[i]].draw();
    }
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

class Dot{
  constructor(x, y){
    this.x=x;
    this.y=y;
  }
}
