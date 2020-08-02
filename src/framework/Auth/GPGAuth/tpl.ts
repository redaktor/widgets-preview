const tplCommon = {
  form: `<form class="ui labeled action input gpgAuth" method="POST" action="_{url}">
    <label>_{messageForm}<br>
      <textarea name="code" rows="10" onfocus="this.select()" autofocus="autofocus">_{code}</textarea>
    </label>
    <input type="hidden" name="state" value="_{state}">
    <button type="submit" class="ui green button">OK</button>
  </form>`
}

export default tplCommon;
