const ThemeList = [
  'default',
  'blue',
  'red',
  'dark'
]

const Themes = {
  _el: undefined,

  init () {
    // init $dom element <body>
    this._el = document.querySelector('#app')

    // get
    const theme = this.get()

    // set
    this.set(theme)
  },

  set (theme) {
    if (this._el === undefined) this.init()

    let scheme = theme
    if (!ThemeList.includes(theme)) scheme = ThemeList[0]

    // save
    localStorage.setItem('theme', scheme)

    // apply
    this._el.setAttribute('scheme', scheme)
  },

  get() {
    return localStorage.getItem('theme') || ThemeList[0]
  }
}

export default Themes