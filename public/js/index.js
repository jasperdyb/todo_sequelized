
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
        let todoEdit = todoLi.find('input.todo-edit')

        todoName.text(newTodo.name)
        todoEdit.val(newTodo.name)

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


$('.done-button').click(function () {
  console.log($($(this).parents('li')[0]))
})


$('#todoList').on('click', '.detail-button', function () {
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



$('#todoList').on('click', '.edit-button', function () {
  console.log('edit clicked')

  let todoLi = $($(this).parents('li')[0])

  todoLi.toggleClass("editMode")

})

$('#todoList').on('change', '.todo-edit', function () {

  let todoLi = $($(this).parents('li')[0])
  let todoId = todoLi.data('id')
  let todoName = todoLi.find('h4.todo-name')
  let newName = $(this).val()

  $.ajax({
    data: { name: newName },
    url: `/todos/${todoId}`,
    type: 'put',
    dataType: 'json',
    cache: false,
    success: function (check) {
      if (check.success) {
        todoName.text(newName)
        todoLi.toggleClass("editMode")
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert('error' + textStatus + 'errorThrown');
    }
  })
})

$('#todoList').on('click', '.delete-button', function () {

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





