import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { File } from '@ionic-native/file';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('abc') imgTarget: HTMLImageElement;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public file: File) {
    this.loadModel().then(() => {
      alert("Model Load success");
      //this.tensor.predict()
      //console.log(this.imgTarget);
      //this.predict(this.imgTarget);
    }).catch(err => {
      alert(err);
    });
  }

  model: tf.Model;
  predictions: any;

  async loadModel(){
    alert(this.file.applicationStorageDirectory);
    this.model = await tf.loadModel("https://storage.googleapis.com/project007-166315.appspot.com/model.json");
  }

  async predict() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    var t: HTMLImageElement = <HTMLImageElement>document.getElementById("apple");
    await tf.tidy(() => {
      let img = tf.fromPixels(t);
      console.log(img);
      img = tf.image.resizeBilinear(img, [64, 64]);
      console.log(img);
      img = img.reshape([1, 64, 64, 3]);
      img = tf.cast(img, 'float32');


      const output = this.model.predict(img) as any;

      this.predictions = Array.from(output.dataSync()); 
    /*  if(result[0][0] == 1)
    "    print(p[0])\n",
    "elif(result[0][1] == 1):\n",
    "    print(p[1])\n",
    "elif(result[0][2] == 1):\n",
    "    print(p[2])\n",
    "elif(result[0][3] == 1):\n",
    "    print(p[3])\n",
    "elif(result[0][4] == 1):\n",
    "    print(p[4])\n",
    "else:\n",
    "    print(\"Not found\")"*/

      if(this.predictions[0] == 1){
        alert("Frigate bird");
      }
      else if(this.predictions[1] == 1){
        alert("Gadwall");
      }
      else if(this.predictions[2] == 1){
        alert("Northern_Fulmar");
      }
      else if(this.predictions[3] == 1){
        alert("Vermilion Flycatcher");
      }
      else if(this.predictions[4] == 1){
        alert("Yellow bellied Flycatcher");
      }
      console.log("RUn");
      loading.dismiss();
    })
  }

}
