
$('#new-button').click(function () {

  let name = $('input[name=new]').val()

  if (!name) {
    console.log('no name')
    return
  }

  let todo = {
    name: name
  };

  $.ajax({
    data: todo,
    url: '/todos/',
    type: 'post',
    dataType: 'json',
    cache: false,
    success: function (newTodo) {

      $.get("templates/todo.html", function (template) {
        let todoLi = $(template);
        let todoName = todoLi.find('h4.todo-name')

        todoName.text(newTodo.name)

        todoLi.appendTo('ul#todoList');
        $('#new-input').val('')
      })
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