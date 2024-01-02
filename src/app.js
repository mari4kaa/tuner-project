'use strict';

const Tuner = require('./tuner.js');
const Meter = require('./user-interface/UI-tuner/meter.js');
const Note = require('./user-interface/UI-tuner/note.js');

class Application {
  constructor() {
    this.defaultConfig = {
      mode: 'standardAuto',
      selectedString: 1,
    };
    this.tuner = new Tuner(this.defaultConfig);
    this.meter = new Meter();
    this.note = new Note();
  }

  start() {
    const onCaptured = (noteData) => {
      this.update(noteData);
    };

    swal.fire({
      title: 'Welcome to the guitar tuner!',
      showCancelButton: false,
      confirmButtonText: 'OK',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.tuner.init();
        this.tuner.tune(onCaptured);
      }
    });
  }

  update(noteData) {
    this.note.hideNote();
    this.note.displayNote(noteData.name, noteData.octave);
    this.meter.update(noteData.delta);
  }
}

const addClickListener = function(app, elementId, configProperties) {
  document.getElementById(elementId).addEventListener('click', () => {
    Object.assign(app.tuner.config, configProperties);
  });
};

const app = new Application();

document.addEventListener('DOMContentLoaded', () => {
  addClickListener(app, 'allNotes', { mode: 'allNotes' });
  addClickListener(app, 'standardAuto', { mode: 'standardAuto' });
  addClickListener(app, 'firstStr', { selectedString: 1, mode: 'standardStrict' });
  addClickListener(app, 'secondStr', { selectedString: 2, mode: 'standardStrict' });
  addClickListener(app, 'thirdStr', { selectedString: 3, mode: 'standardStrict' });
  addClickListener(app, 'fourthStr', { selectedString: 4, mode: 'standardStrict' });
  addClickListener(app, 'fifthStr', { selectedString: 5, mode: 'standardStrict' });
  addClickListener(app, 'sixthStr', { selectedString: 6, mode: 'standardStrict' });
});

app.start();
