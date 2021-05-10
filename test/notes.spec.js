import MockFirebase from 'mock-cloud-firestore';

const fixtureData = {
  __collection__: {
    notes: {
      __doc__: {
        abc1d: {
          title: 'terminar la pildora',
          complete: false
        },
      }
    }
  }
}

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

import { addNote, getNotes, deleteNote } from "../src/controller/controller-firebase.js";

describe('lista de notas', () => {
  it('Debería porder agregar una nota', () => {
    return addNote('preparar la pildora')
        .then ((data) => {
          /*console.log(data._data)*/
          expect(data._data.title).toBe('preparar la pildora')
        })
     /* .then(() => getNotes(
        (data) => {
          const result = data.find((note) => note.title === 'preparar la pildora');
          expect(result.title).toBe('preparar la pildora');
          done()
        }
      ))*/
  });
  it('Deberia haber una nueva nota en la base de datos', (done) => {
    return addNote('Lavar la loza')
    .then (() => {
      getNotes((data) =>{
        /*console.log(data)*/
        const resultado = data.find( note => note.title === 'Lavar la loza' );
        /*console.log(resultado)*/
        expect(resultado.title).toBe ('Lavar la loza')
        done()
      })
    })
  })
  it('Debería eliminar una nota',(done)=>{
    return deleteNote('k58fk')
    .then(() => {
      getNotes((data) =>{
        console.log(data)
        const resultado = data.find( note => note.id === 'k58fk' );
        expect(resultado).toBe (undefined)
        done()
      })
    })
  })
})
  /*it('Debería poder eliminar una nota', (done) => {
    return deleteNote('abc1d')
      .then(() => getNotes(
        (data) => {
          const result = data.find((note) => note.id === 'abc1d');
          expect(result).toBe(undefined);
          done()
        }
      ))
  })

*/