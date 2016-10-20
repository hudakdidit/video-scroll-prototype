import debounce from 'lodash.debounce';
import style from '../css/index.styl';

class App {
  constructor() {
    this.videos = document.querySelectorAll('video');
    this.handleScroll = this.handleScroll.bind(this);
    window.onscroll = debounce(this.handleScroll, 150);
    this.handleScroll();
  }
  handleScroll() {
    const yScroll = window.scrollY;
    const wH = window.innerHeight;
    if (yScroll < (wH / 2)) {
      this.playVideo(this.videos[0]);
    } else {
      this.videos.forEach(video => {
        const { top } = video.getBoundingClientRect();
        if (yScroll >= (Math.abs(top) + (wH / 2))) {
          this.playVideo(video);
        } else {
          video.pause();
        }
      });
    }
  }

  playVideo(video) {
    this.pauseAll().then(() => {
      video.play();
      video.parentElement.classList.add('active');
    });
  }

  pauseAll() {
    const promises = [];
    const pauses = this.videos.forEach(video => {
      video.parentElement.classList.remove('active');
      promises.push(video.pause());
    });
    return Promise.all(promises);
  }
}

new App();
