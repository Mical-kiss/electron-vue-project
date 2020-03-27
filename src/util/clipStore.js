import ElectronStore from 'electron-store'
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
    const trackWithProps = {
      content: track,
      time: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
      type: 'text'
    }
    let tracks = [trackWithProps, ...this.getTracks().filter(item => {
      return item.content !== track
    })]
    return this.saveTracks(tracks)
  },
  delTracks (index) {
    let tracks = this.getTracks()
    tracks.splice(index, 1)
    return this.saveTracks(tracks)
  }
}
export { dataStore }
