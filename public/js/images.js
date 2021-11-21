var imgs = {
  n: {
    player: new Image(),
    free: new Image(),
    enemy: new Image()
  },
  v: {
    player: new Image(),
    free: new Image(),
    enemy: new Image()
  },
  h: {
    player: new Image(),
    free: new Image(),
    enemy: new Image()
  },
  e: {
    player: new Image(),
    free: new Image()
  },
  d: {
    player: new Image(),
    free: new Image()
  },
  u: {
    player: new Image(),
    free: new Image()
  },
  c: {
    player: new Image(),
    player_hacked: new Image(),
    free: new Image(),
    free_hacked: new Image()
  }
}

const loadImages = () => {
  for(const key in imgs) {
    for(const i in imgs[key]) {
      imgs[key][i].src = `../img/${key}/${i}.png`
    }
  }
}
