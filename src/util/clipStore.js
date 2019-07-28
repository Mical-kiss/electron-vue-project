import ElectronStore from 'electron-store'
// class DataStore extends ElectronStore {
//   constructor (settings) {
//     super(settings)
//     this.tracks = []
//   }
//   saveTracks () {
//     this.set('tracks', this.tracks)
//     return this
//   }
//   getTracks () {
//     return this.get('tracks') || []
//   }
//   addTrack (track) {
//     // const tracksWithProps = tracks.map(track => {
//     //   return {
//     //     content: track,
//     //     time: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
//     //     type: 'text'
//     //   }
//     // }).filter(track => {
//     //   const currentTrack = this.getTracks().map(track => track.content)
//     //   return currentTrack.indexOf(track.path) < 0
//     // })
//     const trackWithProps = {
//       content: track,
//       time: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
//       type: 'text'
//     }
//     this.tracks = [trackWithProps, ...this.getTracks().filter(item => {
//       return item.content !== track.content
//     })]
//     // this.tracks = [...this.tracks, ...tracksWithProps]
//     return this.saveTracks()
//   }
// }
const electronStore = new ElectronStore()
const dataStore = {
  saveTracks (tracks) {
    electronStore.set('tracks', tracks)
    return this
  },
  getTracks () {
    return electronStore.get('tracks') || []
  },
  addTrack (track) {
    // const tracksWithProps = tracks.map(track => {
    //   return {
    //     content: track,
    //     time: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
    //     type: 'text'
    //   }
    // }).filter(track => {
    //   const currentTrack = this.getTracks().map(track => track.content)
    //   return currentTrack.indexOf(track.path) < 0
    // })
    const trackWithProps = {
      content: track,
      time: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
      type: 'text'
    }
    let tracks = [trackWithProps, ...this.getTracks().filter(item => {
      return item.content !== track
    })]
    // this.tracks = [...this.tracks, ...tracksWithProps]
    return this.saveTracks(tracks)
  },
  delTracks (index) {
    let tracks = this.getTracks()
    tracks.splice(index, 1)
    return this.saveTracks(tracks)
  }
}
export { dataStore }
