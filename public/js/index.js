
$('#new-button').click(function () {
  console.log('new clicked')

  let name = $('input[name=new]').val()

  if (!name) {
    console.log('no name')
    return
  }

  let todo = {
    name: name
  };

  console.log(todo)

  $.ajax({
    data: todo,

    url: '/todos/',

    type: 'post',

    cache: false,
    success: function (data) {
      console.log(data.message)
    },

    error: function (jqXHR, textStatus, errorThrown) {

      alert('error' + textStatus + 'errorThrown');

    }
  })

})

$('.detail-button').click(function () {
  console.log('detail clicked')
  $.ajax({

    url: '/todos/2',

    type: 'get',

    cache: false,
  })

})

$('.edit-button').click(function () {
  console.log('edit clicked')
  $.ajax({

    url: '/todos/2',

    type: 'put',

    cache: false,
  })

})

$('.delete-button').click(function () {
  console.log('delete clicked')
  $.ajax({

    url: '/todos/2/delete',

    type: 'delete',

    cache: false,
  })

})