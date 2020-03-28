
$('#new-button').click(function () {
  console.log('new clicked')
  $.ajax({

    url: '/todos/',

    type: 'post',

    cache: false,
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