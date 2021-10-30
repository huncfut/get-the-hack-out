/*
Level = {
  layout: [[]]<char>
  guards: [{
    x: Number,
    y: Number,
    speed: Number // blocks / s
  }]
}
*/

const makeLevel = grid => ([
  ["npppnpppn...."],
  ["s...p...p...."],
  ["....p...p...."],
  ["....p...p...."],
  ["npppnpppn...."],
  ["p.......p...."],
  ["p.......p...."],
  ["p.......p...."],
  ["npppnpnpnpn.."],
  ["......p...p.."],
  ["......p...p.."],
  ["......p...p.d"],
  ["......npppnpn"],
])

export {
  makeLevel
}
