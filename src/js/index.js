import debounce from 'lodash.debounce';
import style from '../css/index.styl';

class App {
  constructor() {
    this.videos = document.querySelectorAll('video');
    this.handleScroll = this.handleScroll.bind(this);
    window.onscroll = debounce(this.handleScroll, 300);
    this.handleScroll();
  }
  handleScroll() {
    const yScroll = window.scrollY;
    const wH = window.innerHeight;
    if (yScroll < (wH / 2)) {
      this.pauseAll();
      this.videos[0].play();
    } else {
      this.videos.forEach(video => {
        const { top } = video.getBoundingClientRect();
        if (yScroll >= (Math.abs(top) + (wH / 2))) {
          this.pauseAll();
          video.play();
        } else {
          video.pause();
        }
      });
    }
  }

  pauseAll() {
    this.videos.forEach(video => video.pause());
  }
}

new App();
