
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

        todoLi.attr("data-id", newTodo.id)
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

  let todoId = $($(this).parents('li')[0]).data('id')

  $.ajax({
    url: `/todos/${todoId}`,
    type: 'get',
    cache: false,
    success: function (todo) {
      let modalDetail = $('#modalDetail')
      let todoDetail = modalDetail.find('#todoDetail')
      let todoCreateDate = modalDetail.find('#todoCreateDate')
      todoDetail.text(todo.name)
      todoCreateDate.text(`Added at ${todo.createdAt}`)
      $('#modalDetail').modal('show')
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert('error' + textStatus + 'errorThrown');
    }
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

  let todoId = $($(this).parents('li')[0]).data('id')

  console.log('delete clicked')
  $.ajax({
    url: `/todos/${todoId}/delete`,
    type: 'delete',
    cache: false,
    success: function (check) {
      if (check.success) {
        $($(`li[data-id=${todoId}]`)[0]).remove()
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert('error' + textStatus + 'errorThrown');
    }
  })

})
