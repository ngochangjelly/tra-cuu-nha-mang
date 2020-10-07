const MAX_CHARACTERS = 4
$(document).ready(function () {
  window.$.getJSON('list.json', function (response) {
    const finalResponse = response.map(r => {
      return {
        ...r, concatNumber: r.old + ' ' + r.current 
      }
    })
    $('#search').on('keyup', function () {
      let inputValue = $(this).val().trim()
      const fuse = new Fuse(finalResponse, {
        keys: ['concatNumber'],
        minMatchCharLength: inputValue.length,
        findAllMatches: true,
        threshold: 0.0,
        ignoreLocation: true
      });
      let resultdiv = $('ul.searchresults');
      resultdiv.empty();
      resultdiv.hide();
      if (inputValue === '') {
        return
      }
      console.log(inputValue.length)
      let searchPhrase = inputValue.length > 4 ? inputValue.slice(0, 4): inputValue
      console.log(searchPhrase)
      let result = fuse.search(searchPhrase);
      if (result.length === 0) {
        resultdiv.append('<li>Không tìm thấy nhà mạng nào tương ứng với số điện thoại này</li>')
        resultdiv.show();
      }
      if (result.length > 0) {
        resultdiv.empty();
        for (let item in result) {
          let searchitem = '<li><b>Nhà mạng</b> ' + result[item].item.name + '</li>' 
          searchitem +='<li><b>Số cũ:</b> ' + result[item].item.old + '</li>'
          searchitem += '<li><b>Số hiện tại:</b> '+ result[item].item.current + '</li>'
          resultdiv.append(searchitem);
          if (result.length > 1) {
            resultdiv.append('<hr>')
          }
        }
        resultdiv.show();
      }
    });
  });
});
